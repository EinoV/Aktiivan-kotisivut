import type { Metadata } from "next";
import { assetPath, ogImage } from "@/lib/site";
import Image from "next/image";
import { ContactBlock } from "@/components/ContactBlock";
import { LogoBand } from "@/components/LogoBand";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { activities, orgNumbers } from "@/lib/content";
import styles from "../sivut.module.css";

export const metadata: Metadata = {
  title: "Aktiiva",
  description:
    "Aktiiva ry on Turun kauppakorkeakoulun laskentatoimen, rahoituksen ja yritysjuridiikan opiskelijoiden ainejärjestö.",
  alternates: { canonical: "/aktiiva" },
  /* `images` restated even though opengraph-image.jpg sits at the app
     root: a page-level openGraph object replaces the inherited one
     rather than merging into it, so omitting this left every subpage
     sharing with no picture at all — the exact failure this work set out
     to fix, reintroduced one level down. */
  openGraph: {
    title: "Aktiiva — Aktiiva ry",
    description: "Aktiiva ry on Turun kauppakorkeakoulun laskentatoimen, rahoituksen ja yritysjuridiikan opiskelijoiden ainejärjestö.",
    url: "/aktiiva",
    images: [ogImage],
  },
};

export default function AktiivaPage() {
  return (
    <>
      <PageHeader
        title="Aktiiva ry"
        photo={{
          src: assetPath("/photos/dinner-banner.jpg"),
          alt: "Aktiivan jäseniä pöydän ääressä yhteisellä illallisella.",
        }}
      />

      <Reveal>
        <section className={styles.numbersSection} aria-label="Aktiiva lukuina">
          <ul className={styles.numbers} role="list">
            {orgNumbers.map((n) => (
              <li key={n.label}>
                <span className={styles.numberValue}>{n.value}</span>
                <span className={styles.numberLabel}>{n.label}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section
          className={`${styles.gridSection} ${styles.spacedBelow}`}
          aria-labelledby="keita"
        >
          <div className={styles.gridAside}>
            <h2 id="keita" className={styles.h2}>
              Keitä olemme
            </h2>
          </div>
          <div>
            <p className={styles.prose}>
              Aktiiva on ainejärjestö, jonka toiminta rakentuu neljän
              sidosryhmän ympärille: opiskelijat, laskentatoimen ja rahoituksen
              laitos, yritysyhteistyökumppanit ja alumnit. Rakennamme siltaa
              opintojen ja työelämän välille ja yhteisöä, joka kantaa
              valmistumisen jälkeenkin.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.activitySection} aria-labelledby="mita">
          <div className={styles.activityInner}>
            <h2 id="mita" className={styles.h2}>
              Mitä teemme
            </h2>
            <ul className={styles.activityList} role="list">
              {/* Per row, not per section, and staggered — the same
                  treatment the homepage gives its audience spread. One
                  fade for a 2100px block would be over before the last
                  row was anywhere near the screen. */}
              {activities.map((a, i) => (
                <Reveal
                  key={a.title}
                  as="li"
                  className={styles.activityRow}
                  delay={i * 80}
                >
                  <div className={styles.activityMedia}>
                    <Image
                      src={a.image}
                      alt={a.imageAlt}
                      fill
                      sizes="(max-width: 720px) 768px, 592px"
                      className={styles.activityImage}
                    />
                  </div>
                  <div>
                    <h3 className={styles.activityTitle}>{a.title}</h3>
                    <p className={styles.activityBody}>{a.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      </Reveal>

      <Reveal delay={100}>
        <LogoBand />
      </Reveal>

      <Reveal>
        <ContactBlock />
      </Reveal>
    </>
  );
}
