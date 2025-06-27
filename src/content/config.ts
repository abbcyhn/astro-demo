import { defineCollection, z } from "astro:content";
import { format } from "date-fns";

const postsCollection = defineCollection({
    schema: ({image}) => z.object({
        author: z.string(),
        date: z
            .string()
            .transform(str => format(new Date(str), "MMMM d, yyyy")),
        image: image(),
        title: z.string(),
        featured: z.boolean()
    })
});

export const collections = {
    posts: postsCollection
};