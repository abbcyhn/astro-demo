import { defineCollection, z } from "astro:content";

const articlesCollection = defineCollection({
    schema: ({image}) => z.object({
        topic: z.string(),
        title: z.string(),
        hook: z.string(),
        date: z.date(),
        published: z.boolean(),
        featured: z.boolean()
    })
});

export const collections = {
    articles: articlesCollection
};