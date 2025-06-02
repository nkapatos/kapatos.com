import { getCollection, type CollectionEntry } from 'astro:content'
import { readingTime, calculateWordCountFromHtml } from './utils'
import { SITE_COLLECTIONS } from '@/config'


export async function getAllEntries(): Promise<CollectionEntry<SITE_COLLECTIONS.NOTES>[]> {
  const entries = await getCollection(SITE_COLLECTIONS.NOTES)
  return entries
    .filter((entry) => !entry.data.draft && !isSubentry(entry.id))
    .sort((a, b) => b.data.uDate.valueOf() - a.data.uDate.valueOf())
}

export async function getAllEntriesAndSubentries(): Promise<
  CollectionEntry<SITE_COLLECTIONS.NOTES>[]
> {
  const entries = await getCollection(SITE_COLLECTIONS.NOTES)
  return entries
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => b.data.uDate.valueOf() - a.data.uDate.valueOf())
}

// export async function getAllProjects(): Promise<CollectionEntry<'projects'>[]> {
//   const projects = await getCollection('projects')
//   return projects.sort((a, b) => {
//     const dateA = a.data.startDate?.getTime() || 0
//     const dateB = b.data.startDate?.getTime() || 0
//     return dateB - dateA
//   })
// }

export async function getAllTags(): Promise<Map<string, number>> {
  const entries = await getAllEntries()
  return entries.reduce((acc, entry) => {
    entry.data.tags?.forEach((tag) => {
      acc.set(tag, (acc.get(tag) || 0) + 1)
    })
    return acc
  }, new Map<string, number>())
}

export async function getAdjacentEntries(currentId: string): Promise<{
  newer: CollectionEntry<SITE_COLLECTIONS.NOTES> | null
  older: CollectionEntry<SITE_COLLECTIONS.NOTES> | null
  parent: CollectionEntry<SITE_COLLECTIONS.NOTES> | null
}> {
  const allEntries = await getAllEntries()

  if (isSubentry(currentId)) {
    const parentId = getParentId(currentId)
    const allEntries = await getAllEntries()
    const parent = allEntries.find((entry) => entry.id === parentId) || null

    const entries = await getCollection(SITE_COLLECTIONS.NOTES)
    const subentries = entries
      .filter(
        (entry) =>
          isSubentry(entry.id) &&
          getParentId(entry.id) === parentId &&
          !entry.data.draft,
      )
      .sort((a, b) => a.data.uDate.valueOf() - b.data.uDate.valueOf())

    const currentIndex = subentries.findIndex((entry) => entry.id === currentId)
    if (currentIndex === -1) {
      return { newer: null, older: null, parent }
    }

    return {
      newer:
        currentIndex < subentries.length - 1 ? subentries[currentIndex + 1] : null,
      older: currentIndex > 0 ? subentries[currentIndex - 1] : null,
      parent,
    }
  }

  const parentEntries = allEntries.filter((entry) => !isSubentry(entry.id))
  const currentIndex = parentEntries.findIndex((entry) => entry.id === currentId)

  if (currentIndex === -1) {
    return { newer: null, older: null, parent: null }
  }

  return {
    newer: currentIndex > 0 ? parentEntries[currentIndex - 1] : null,
    older:
      currentIndex < parentEntries.length - 1
        ? parentEntries[currentIndex + 1]
        : null,
    parent: null,
  }
}

export async function getEntriesByTag(
  tag: string,
): Promise<CollectionEntry<SITE_COLLECTIONS.NOTES>[]> {
  const entries = await getAllEntries()
  return entries.filter((entry) => entry.data.tags?.includes(tag))
}

export async function getRecentEntries(
  count: number,
): Promise<CollectionEntry<SITE_COLLECTIONS.NOTES>[]> {
  const entries = await getAllEntries()
  return entries.slice(0, count)
}

export async function getSortedTags(): Promise<
  { tag: string; count: number }[]
> {
  const tagCounts = await getAllTags()
  return [...tagCounts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => {
      const countDiff = b.count - a.count
      return countDiff !== 0 ? countDiff : a.tag.localeCompare(b.tag)
    })
}

export function getParentId(subentryId: string): string {
  return subentryId.split('/')[0]
}

export async function getSubentriesForParent(
  parentId: string,
): Promise<CollectionEntry<SITE_COLLECTIONS.NOTES>[]> {
  const entries = await getCollection(SITE_COLLECTIONS.NOTES)
  return entries
    .filter(
      (entry) =>
        !entry.data.draft &&
        isSubentry(entry.id) &&
        getParentId(entry.id) === parentId,
    )
    .sort((a, b) => a.data.uDate.valueOf() - b.data.uDate.valueOf())
}

export function groupEntriesByYear(
  entries: CollectionEntry<SITE_COLLECTIONS.NOTES>[],
): Record<string, CollectionEntry<SITE_COLLECTIONS.NOTES>[]> {
  return entries.reduce(
    (acc: Record<string, CollectionEntry<SITE_COLLECTIONS.NOTES>[]>, entry) => {
      const year = entry.data.uDate.getFullYear().toString()
      ;(acc[year] ??= []).push(entry)
      return acc
    },
    {},
  )
}

export async function hasSubentries(entryId: string): Promise<boolean> {
  const subentries = await getSubentriesForParent(entryId)
  return subentries.length > 0
}

export function isSubentry(entryId: string): boolean {
  return entryId.includes('/')
}

export async function getParentEntry(
  subentryId: string,
): Promise<CollectionEntry<SITE_COLLECTIONS.NOTES> | null> {
  if (!isSubentry(subentryId)) {
    return null
  }

  const parentId = getParentId(subentryId)
  const allEntries = await getAllEntries()
  return allEntries.find((entry) => entry.id === parentId) || null
}

// export async function parseAuthors(authorIds: string[] = []) {
//   if (!authorIds.length) return []

//   const allAuthors = await getAllAuthors()
//   const authorMap = new Map(allAuthors.map((author) => [author.id, author]))

//   return authorIds.map((id) => {
//     const author = authorMap.get(id)
//     return {
//       id,
//       name: author?.data?.name || id,
//       avatar: author?.data?.avatar || '/static/logo.png',
//       isRegistered: !!author,
//     }
//   })
// }

export async function getEntryById(
  entryId: string,
): Promise<CollectionEntry<SITE_COLLECTIONS.NOTES> | null> {
  const allEntries = await getAllEntriesAndSubentries()
  return allEntries.find((entry) => entry.id === entryId) || null
}

export async function getSubentryCount(parentId: string): Promise<number> {
  const subentries = await getSubentriesForParent(parentId)
  return subentries.length
}

export async function getCombinedReadingTime(entryId: string): Promise<string> {
  const entry = await getEntryById(entryId)
  if (!entry) return readingTime(0)

  let totalWords = calculateWordCountFromHtml(entry.body)

    if (!isSubentry(entryId)) {
    const subentries = await getSubentriesForParent(entryId)
    for (const subentry of subentries) {
      totalWords += calculateWordCountFromHtml(subentry.body)
    }
  }

  return readingTime(totalWords)
}

export async function getEntryReadingTime(entryId: string): Promise<string> {
  const entry = await getEntryById(entryId)
  if (!entry) return readingTime(0)

  const wordCount = calculateWordCountFromHtml(entry.body)
  return readingTime(wordCount)
}