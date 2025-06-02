import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const notes = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}', base: "./src/data/notes"
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    pDate: z.coerce.date(),
    uDate: z.coerce.date(),
    publish: z.boolean().optional(),
    draft: z.boolean().default(true)
  })
})

export const collections = {
  notes,
};
