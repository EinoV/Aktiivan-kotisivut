import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Tämä rivi korjaa Next.js:n staattisen vientivirheen (output: 'export'):
export const dynamic = "force-static";

/**
 * Four routes, listed by hand. The site has no dynamic segments, so
 * generating this from the filesystem would be more machinery than the
 * thing it replaces — but it does mean a new page needs a line here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/aktiiva", "/hallitus", "/yhteystiedot"];
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}