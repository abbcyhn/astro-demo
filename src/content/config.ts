import { defineCollection, z } from "astro:content";
import { format } from "date-fns";

const articlesCollection = defineCollection({
    schema: ({image}) => z.object({
        author: z.string(),
        date: z.date(),
            //.transform(str => format(new Date(str), "MMMM d, yyyy")),
        image: image(),
        title: z.string(),
        featured: z.boolean()
    })
});

export const collections = {
    articles: articlesCollection
};