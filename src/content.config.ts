import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const loader = (name: string) => glob({ pattern: '**/*.md', base: `./src/content/${name}` });
const artworkText = { title: z.string(), alt: z.string(), description: z.string(), series: z.string().default(''), medium: z.string().optional(), edition: z.string(), certificate: z.string() };
const artworks = defineCollection({ loader: loader('artworks'), schema: ({ image }) => z.object({
  ...artworkText, en: z.object(artworkText), artworkId: z.string().regex(/^[A-Za-z0-9_-]+$/), image: image(), year: z.number().optional(), dimensions: z.string().optional(), price: z.string().optional(), sold: z.boolean().default(false), featured: z.boolean().default(false), selected: z.boolean().default(false), order: z.number().default(100),
}) });
const about = defineCollection({ loader: loader('about'), schema: ({ image }) => z.object({ name: z.string(), photo: image(), photoAlt: z.string(), introduction: z.string() }) });
const contact = defineCollection({ loader: loader('contact'), schema: z.object({ heading: z.string(), introduction: z.string(), phone: z.string(), email: z.string().email(), instagram: z.string().url(), facebook: z.string().url() }) });
const home = defineCollection({ loader: loader('home'), schema: ({ image }) => z.object({
  title: z.string(), subtitle: z.string(), description: z.string(), button: z.string(), heroImage: image(), heroAlt: z.string(), heroTitle: z.string(), heroSeries: z.string(), motto: z.string(), selectedTitle: z.string(), allButton: z.string(), aboutHeadline: z.string(), aboutDescription: z.string(), aboutButton: z.string(), aboutImage: image(), aboutAlt: z.string(), aboutCaption: z.string(),
}) });
const buy = defineCollection({ loader: loader('buy'), schema: z.object({ title: z.string(), introduction: z.string(), steps: z.array(z.object({ title: z.string(), description: z.string() })).min(1), closing: z.string(), button: z.string() }) });
export const collections = { artworks, about, contact, home, buy };
