import type { Metadata } from "next";
import { ogImage } from "@/lib/site";
import { ContactBlock } from "@/components/ContactBlock";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { board } from "@/lib/content";
import styles from "../sivut.module.css";

export const metadata: Metadata = {
  title: "Hallitus",
  description:
    "Aktiiva ry:n hallitus, vastuualueet ja yhteystiedot. Hallitus valitaan vuosittain syyskokouksessa.",
  alternates: { canonical: "/hallitus" },
  /* `images` restated even though opengraph-image.jpg sits at the app
     root: a page-level openGraph object replaces the inherited one
     rather than merging into it, so omitting this left every subpage
     sharing with no picture at all — the exact failure this work set out
     to fix, reintroduced one level down. */
  openGraph: {
    title: "Hallitus — Aktiiva ry",
    description: "Aktiiva ry:n hallitus, vastuualueet ja yhteystiedot. Hallitus valitaan vuosittain syyskokouksessa.",
    url: "/hallitus",
    images: [ogImage],
  },
};

export default function HallitusPage() {
  return (
    <>
      <PageHeader
        title="Hallitus"
        photo={{
          src: "/photos/kokoushuone-banner.jpg",
          alt: "Kokoushuoneen pitkä neuvottelupöytä ja tuolirivistö.",
        }}
      />

      <Reveal>
        <section className={styles.section} aria-labelledby="jasenet">
          <div className={styles.sectionHead}>
            <h2 id="jasenet" className={styles.h2}>
              Hallitus
            </h2>
          </div>
          <ul className={styles.rows} role="list">
            {board.map((m) => (
              <li key={m.role} className={styles.boardRow}>
                <h3 className={styles.boardRole}>{m.role}</h3>
                <div>
                  <span className={styles.boardName}>{m.name}</span>
                  <a href={`mailto:${m.email}`} className={styles.boardEmail}>
                    {m.email}
                  </a>
                </div>
                <p className={styles.boardRemit}>{m.remit}</p>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <ContactBlock />
      </Reveal>
    </>
  );
}
