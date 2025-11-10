import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    lastmod: z.coerce.date().optional(),
    draft: z.boolean().optional().default(false),
    series: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
    slug: z.string().optional(),
    authors: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
  }),
});

export const collections = { posts };
