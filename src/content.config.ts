import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const artworks = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/artworks' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    artworkId: z.string(),
    image: image(),
    alt: z.string(),
    description: z.string(),
    year: z.number().optional(),
    medium: z.string().optional(),
    dimensions: z.string().optional(),
    edition: z.string().default('Unique'),
    certificate: z.string().default('Certificate of Authenticity included'),
    price: z.string().optional(),
    sold: z.boolean().default(false),
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/about' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    photo: image(),
    photoAlt: z.string(),
    introduction: z.string(),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/contact' }),
  schema: z.object({
    heading: z.string(), introduction: z.string(), phone: z.string(),
    email: z.string().email(), instagram: z.string().url(), facebook: z.string().url(),
  }),
});

export const collections = { artworks, about, contact };
