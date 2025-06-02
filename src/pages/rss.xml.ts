import rss, { pagesGlobToRssItems } from '@astrojs/rss';

import { SITE_COLLECTIONS, SITE_CONFIG } from '@/config';
import { getCollection } from 'astro:content';
export async function GET(context: any) {
  const notes = await getCollection(SITE_COLLECTIONS.NOTES, (note) => !note.data.draft)
  return rss({
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site: context.site,
    items: notes.map(note => ({
      title: note.data.title,
      description: note.data.description,
      pubDate: note.data.pDate,
      lastBuildDate: note.data.uDate,
      link: `/notes/${note.id}/`
    }))
    // items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    // customData: `<language>en</language>`,
  });
}
