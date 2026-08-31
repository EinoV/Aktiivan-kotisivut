/**
 * The site's public origin, in one place because three separate things
 * need it: metadataBase (which turns relative OG image paths into the
 * absolute URLs the social crawlers require), the sitemap, and robots.
 *
 * Override with NEXT_PUBLIC_SITE_URL at build time. The fallback is a
 * guess — nobody has confirmed that aktiiva.fi is the organisation's
 * domain, and every absolute URL the crawlers see depends on it being
 * right.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aktiiva.fi"
).replace(/\/$/, "");

export const siteName = "Aktiiva ry";

export const siteDescription =
  "Aktiiva ry on Turun kauppakorkeakoulun laskentatoimen, rahoituksen ja yritysjuridiikan opiskelijoiden ainejärjestö.";

/** The shared social card. Kept here so the subpages, which have to
 *  restate it (a page-level openGraph replaces the inherited one rather
 *  than merging), all describe the same file the same way. */
export const ogImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Turun linna sinisellä hetkellä, yllä teksti Aktiiva.",
} as const;
