/* The three faces the live site uses. Seven more were declared here for
   the concept routes; those routes and their fonts are gone. */

import localFont from "next/font/local";

export const fraunces = localFont({
  src: "../../public/fonts/fraunces-variable.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-fraunces",
  display: "swap",
});

export const plexSans = localFont({
  src: "../../public/fonts/plex-sans-variable.woff2",
  weight: "400 500",
  style: "normal",
  variable: "--font-plex-sans",
  display: "swap",
});

export const newsreader = localFont({
  src: "../../public/fonts/newsreader-upright-variable.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-newsreader",
  display: "swap",
});
