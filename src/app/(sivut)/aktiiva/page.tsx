import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PhotoBand } from "@/components/PhotoBand";
import { activities, orgFacts, orgNumbers } from "@/lib/content";
import styles from "../sivut.module.css";

export const metadata = {
  title: "Aktiiva — Aktiiva ry",
  description:
    "Aktiiva ry on Turun kauppakorkeakoulun laskentatoimen, rahoituksen ja yritysjuridiikan opiskelijoiden ainejärjestö.",
};

export default function AktiivaPage() {
  return (
    <>
      <PageHeader
        title="Aktiiva ry"
        lead="Laskentatoimen, rahoituksen ja yritysjuridiikan opiskelijoiden ainejärjestö Turun kauppakorkeakoulussa. Excursioita, tapahtumia ja edunvalvontaa. Se osa opiskeluajasta, joka ei näy opintorekisterissä."
        motif="a"
      />

      <PhotoBand
        src="/photos/mckensey.jpg"
        alt="Aktiivan jäseniä pöydän ääressä yhteisellä illallisella."
        priority
        tall
        cropBottom
        narrow
      />

      <section className={styles.section} aria-label="Aktiiva lukuina">
        <ul className={styles.numbers} role="list">
          {orgNumbers.map((n) => (
            <li key={n.label}>
              <span className={styles.numberValue}>{n.value}</span>
              <span className={styles.numberLabel}>{n.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.gridSection} aria-labelledby="keita">
        <div className={styles.gridAside}>
          <h2 id="keita" className={styles.h2}>
            Keitä olemme
          </h2>
        </div>
        <div>
          <p className={styles.prose}>
            Aktiiva on Turun kauppakorkeakoulun laskentatoimen, rahoituksen ja
            yritysjuridiikan opiskelijoiden oma järjestö. Toimintamme
            rakentuu neljän keskeisen sidosryhmän ympärille: opiskelijoiden,
            laskentatoimen ja rahoituksen laitoksen, yritysyhteistyökumppaneiden
            ja alumnien. Tavoitteenamme on luoda toimiva silta opintojen ja
            työelämän välille sekä vahvistaa yhteisöä, joka kantaa pitkälle
            valmistumisen jälkeenkin.
          </p>
        </div>
      </section>

      <section className={styles.gridSection} aria-labelledby="mita">
        <div className={styles.gridAside}>
          <h2 id="mita" className={styles.h2}>
            Mitä teemme
          </h2>
        </div>
        <div>
          <ul className={styles.rows} role="list">
            {activities.map((a) => (
              <li key={a.title} className={styles.row}>
                <h3 className={styles.rowLabel}>{a.title}</h3>
                <p className={styles.rowBody}>{a.body}</p>
              </li>
            ))}
          </ul>
          <div className={styles.actionRow}>
            <Link className={styles.action} href="/hallitus">
              Tutustu hallitukseen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
