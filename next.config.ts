import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Jos sivustosi osoite on muotoa käyttäjä.github.io/aktiiva-website,
  // poista alla olevalta riviltä kommenttimerkit // ja tarkista repositoriosi nimi:
  // basePath: '/aktiiva-website',
};

export default nextConfig;