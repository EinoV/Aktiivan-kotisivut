import Link from "next/link";
import { DisciplinesReveal } from "@/components/DisciplinesReveal";
import { HeroPinned } from "@/components/HeroPinned";
import { HomeSections } from "@/components/concept1/HomeSections";
import { fraunces, plexSans } from "@/lib/fonts";
import styles from "./page.module.css";

export const metadata = {
  title: "Aktiiva ry",
  description:
    "Aktiiva ry on Turun kauppakorkeakoulun laskentatoimen, rahoituksen ja yritysjuridiikan ainejärjestö.",
};

export default function Home() {
  return (
    <div className={`${styles.root} ${fraunces.variable} ${plexSans.variable}`}>
      <HeroPinned />

      <div className={styles.heroTransition} aria-hidden="true" />

      <DisciplinesReveal />

      <HomeSections
        footerNote={
          <>
            Saaristovalokuva: Saaristomeri, Turun edustalla — kuva: Hajotthu,
            Wikimedia Commons (CC BY-SA 3.0 / GFDL), käsitelty. Sisältö on
            paikkamerkkiä designluonnosta varten; ks. myös{" "}
            <Link href="/concepts">konseptien historia</Link>.
          </>
        }
      />
    </div>
  );
}
