import { defineCollection, z } from "astro:content";

const degrees = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    campus: z.array(z.string()),
    duration: z.string(),
    sortOrder: z.number(),
  }),
});

const programmes = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      type: z.string(),
      description: z.string(),
      campus: z.array(z.string()),
      image: image(),
    }),
});

export const collections = {
  degrees,
  programmes,
};
