import localFont from "next/font/local";

// Concept 1 — Masthead
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

// Concept 2 — Split Frame
export const archivo = localFont({
  src: "../../public/fonts/archivo-variable.woff2",
  weight: "400 900",
  style: "normal",
  variable: "--font-archivo",
  display: "swap",
});

export const newsreaderItalic = localFont({
  src: "../../public/fonts/newsreader-italic-400.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-newsreader-italic",
  display: "swap",
});

// Concept 3 — Grid System
export const spectral500 = localFont({
  src: "../../public/fonts/spectral-500.woff2",
  weight: "500",
  style: "normal",
  variable: "--font-spectral-500",
  display: "swap",
});

export const spectral600 = localFont({
  src: "../../public/fonts/spectral-600.woff2",
  weight: "600",
  style: "normal",
  variable: "--font-spectral-600",
  display: "swap",
});

export const workSans = localFont({
  src: "../../public/fonts/worksans-variable.woff2",
  weight: "400 600",
  style: "normal",
  variable: "--font-work-sans",
  display: "swap",
});

export const jetbrainsMono = localFont({
  src: "../../public/fonts/jetbrains-mono-500.woff2",
  weight: "500",
  style: "normal",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Concept 4 — Community Layers
export const newsreader = localFont({
  src: "../../public/fonts/newsreader-upright-variable.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-newsreader",
  display: "swap",
});

export const newsreaderItalicAlt = localFont({
  src: "../../public/fonts/newsreader-italic-400.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-newsreader-italic-alt",
  display: "swap",
});
