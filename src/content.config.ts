import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tag: z.string(),
    author: z.string(),
    cover: z.string().optional(),
    excerpt: z.string().optional(),
    sourceFile: z.string(),
    sourceUrl: z.string().url(),
  }),
});

// French translations. Unlike `blog` (gitignored, regenerated from
// PBI-Documentation on every sync), these are hand/Claude-authored files
// committed to this repo — there's no English source repo equivalent to
// resync them from, so they live here as real content.
const blogFr = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/translations/fr' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tag: z.string(),
    author: z.string(),
    cover: z.string().optional(),
    excerpt: z.string().optional(),
    sourceFile: z.string(),
    sourceUrl: z.string().url(),
    enSlug: z.string(),
  }),
});

export const collections = { blog, blogFr };
