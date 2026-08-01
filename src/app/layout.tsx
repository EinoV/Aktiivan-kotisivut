import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aktiiva ry",
  description:
    "Aktiiva ry on Turun kauppakorkeakoulun laskentatoimen, rahoituksen ja yritysjuridiikan opiskelijoiden ainejärjestö.",
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
