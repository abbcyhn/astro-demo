import { getCollection } from 'astro:content';
import { siteConfig } from '../config';

type Articles = Awaited<ReturnType<typeof getCollection<"articles">>>;

/**
 * Fetches all articles from the content collection
 */
export async function getAllArticles(): Promise<Articles> {
  return await getCollection("articles");
}

/**
 * Sorts articles by date (newest first)
 */
export function sortArticlesByDate(articles: Articles): Articles {
  return articles.sort((a, b) => a.data.date.getUTCFullYear() - b.data.date.getUTCFullYear()).reverse();
}

/**
 * Filters articles to get only featured ones
 */
export function getFeaturedArticles(articles: Articles, limit?: number): Articles {
  const featuredArticles = articles.filter(article => article.data.featured);
  return limit ? featuredArticles.slice(0, limit) : featuredArticles;
}

/**
 * Complete utility function that fetches, sorts, and prepares articles
 */
export async function getProcessedArticles() {
  const allArticles = await getAllArticles();
  const sortedArticles = sortArticlesByDate(allArticles);
  const latestArticles = sortedArticles.slice(0, siteConfig.articlesPerPage);
  const featuredArticles = getFeaturedArticles(sortedArticles, siteConfig.articlesPerPage);
  
  return {
    allArticles,
    sortedArticles,
    latestArticles,
    featuredArticles
  };
}

/**
 * Export the Articles type for use in other components
 */
export type { Articles }; 