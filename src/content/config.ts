import { defineCollection, z } from "astro:content";

const articlesCollection = defineCollection({
    schema: ({image}) => z.object({
        author: z.string(),
        date: z.date(),
        image: image(),
        title: z.string(),
        hook: z.string(),
        featured: z.boolean()
    })
});

export const collections = {
    articles: articlesCollection
};