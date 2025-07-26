import { defineCollection, z } from "astro:content";

const articlesCollection = defineCollection({
    schema: ({image}) => z.object({
        topic: z.string(),
        title: z.string(),
        hook: z.string(),
        datePublished: z.date(),
        dateModified: z.date(),
        isDraft: z.boolean(),
        featured: z.boolean()
    })
});

export const collections = {
    articles: articlesCollection
};