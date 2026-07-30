import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aktiiva ry — etusivukonseptit",
  description:
    "Viisi genuinely erilaista etusivukonseptia Aktiiva ry:lle, Turun kauppakorkeakoulun laskentatoimen, rahoituksen ja yritysjuridiikan ainejärjestölle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi">
      <body>{children}</body>
    </html>
  );
}
