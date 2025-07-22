/**
 * Generate a canonical URL for a given path
 * @param path - The path to generate a canonical URL for
 * @returns The canonical URL
 */
export function generateCanonicalUrl(path: string) {
    const siteUrl = import.meta.env.SITE;
    if (path === "") {
        return siteUrl;
    }
    return new URL(path, siteUrl).href;
}