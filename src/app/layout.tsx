import type { Metadata } from "next";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  /* Without this, every relative URL below (the OG image especially) is
     a build error — the social crawlers need absolute ones. */
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s — ${siteName}` },
  description: siteDescription,
  alternates: { canonical: "/" },
  /* opengraph-image.jpg sitting beside this file supplies og:image and
     twitter:image on its own, at the right dimensions, with its alt text
     read from opengraph-image.alt.txt. Nothing to declare here. */
  openGraph: {
    type: "website",
    locale: "fi_FI",
    siteName,
    url: "/",
    title: siteName,
    description: siteDescription,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi">
      <head>
        {/* Without JS the scroll reveal never fires, so everything it
            wraps would stay at opacity 0. This shows it all instead. */}
        <noscript>
          <style>{`[data-reveal="false"] { opacity: 1; }`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
