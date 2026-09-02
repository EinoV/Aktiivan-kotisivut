import type { Metadata } from "next";
import { assetPath, ogImage } from "@/lib/site";
import Link from "next/link";
import { ContactBlock } from "@/components/ContactBlock";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import styles from "../sivut.module.css";

export const metadata: Metadata = {
  title: "Yhteystiedot",
  description:
    "Aktiiva ry:n yhteystiedot: sähköposti, sosiaalinen media ja postiosoite Turun kauppakorkeakoululla.",
  alternates: { canonical: "/yhteystiedot" },
  /* `images` restated even though opengraph-image.jpg sits at the app
     root: a page-level openGraph object replaces the inherited one
     rather than merging into it, so omitting this left every subpage
     sharing with no picture at all — the exact failure this work set out
     to fix, reintroduced one level down. */
  openGraph: {
    title: "Yhteystiedot — Aktiiva ry",
    description: "Aktiiva ry:n yhteystiedot: sähköposti, sosiaalinen media ja postiosoite Turun kauppakorkeakoululla.",
    url: "/yhteystiedot",
    images: [ogImage],
  },
};

export default function YhteystiedotPage() {
  return (
    <>
      <PageHeader
        title="Yhteystiedot"
        photo={{
          src: assetPath("/photos/tuomiokirkko-banner.jpg"),
          alt: "Turun tuomiokirkko ja Aurajoki yöllä.",
        }}
      />

      <Reveal>
        <section className={styles.gridSection} aria-labelledby="kenelle">
          <div className={styles.gridAside}>
            <h2 id="kenelle" className={styles.h2}>
              Kenelle kirjoittaa
            </h2>
          </div>
          <div>
            <ul className={styles.rows} role="list">
              <li className={styles.row}>
                <h3 className={styles.rowLabel}>Yhteistyö ja rekrytointi</h3>
                <p className={styles.rowBody}>
                  Kumppanuudet ja työpaikkailmoitukset hoituvat{" "}
                  <Link href="/hallitus">yrityssuhdevastaavan</Link> kautta.
                </p>
              </li>
              <li className={styles.row}>
                <h3 className={styles.rowLabel}>Opintoasiat</h3>
                <p className={styles.rowBody}>
                  Kurssipalaute ja edunvalvonta-asiat{" "}
                  <Link href="/hallitus">opintovastaavalle</Link> — hän vie
                  asian eteenpäin tiedekuntaan.
                </p>
              </li>
              <li className={styles.row}>
                <h3 className={styles.rowLabel}>Muut asiat</h3>
                <p className={styles.rowBody}>
                  Kaikki muu palaute ja kysymykset voi lähettää hallituksen
                  yleiseen sähköpostiin, niin ne ohjataan oikealle
                  vastuuhenkilölle.
                </p>
              </li>
            </ul>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <ContactBlock />
      </Reveal>
    </>
  );
}
