import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PhotoBand } from "@/components/PhotoBand";
import { board } from "@/lib/content";
import styles from "../sivut.module.css";

export const metadata = {
  title: "Hallitus — Aktiiva ry",
  description:
    "Aktiiva ry:n hallitus, vastuualueet ja yhteystiedot. Hallitus valitaan vuosittain syyskokouksessa.",
};

export default function HallitusPage() {
  return (
    <>
      <PageHeader
        eyebrow="Toimikausi 2026"
        title="Hallitus"
        lead="Hallitus valitaan vuosittain syyskokouksessa, ja se vastaa Aktiivan toiminnasta kokonaisuudessaan. Kaikkiin alla oleviin voi olla suoraan yhteydessä oman vastuualueensa asioissa."
        motif="a"
      />

      <PhotoBand
        src="/photos/tse-entrance-wide.jpg"
        alt="Turun kauppakorkeakoulun pääsisäänkäynti."
        caption="Hallitus tavoitetaan parhaiten sähköpostitse — tai kampukselta."
        priority
      />

      <section className={styles.section} aria-labelledby="jasenet">
        <div className={styles.sectionHead}>
          <h2 id="jasenet" className={styles.h2}>
            Jäsenet
          </h2>
          <span className={styles.headNote}>{board.length} jäsentä</span>
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

      <section className={styles.gridSection} aria-labelledby="ehdolle">
        <div className={styles.gridAside}>
          <h2 id="ehdolle" className={styles.h2}>
            Hallitukseen
          </h2>
          <span className={styles.asideNote}>
            Syyskokous pidetään marraskuussa.
          </span>
        </div>
        <div>
          <p className={styles.prose}>
            Hallitus valitaan syyskokouksessa, johon jokaisella jäsenellä on
            puhe- ja äänioikeus. Ehdolle voi asettua kokouksessa paikan
            päällä, eikä aiempaa järjestökokemusta edellytetä — suurin osa
            hallituslaisista aloittaa ilman sellaista.
          </p>
          <p className={styles.prose}>
            Toimikausi on kalenterivuosi. Työmäärä vaihtelee tehtävittäin:
            tapahtuma- ja yrityssuhdevastaavilla se painottuu lukukausien
            alkuun, puheenjohtajalla se jakautuu tasaisemmin koko vuodelle.
          </p>
          <div className={styles.actionRow}>
            <Link className={styles.action} href="/yhteystiedot">
              Kysy lisää
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
