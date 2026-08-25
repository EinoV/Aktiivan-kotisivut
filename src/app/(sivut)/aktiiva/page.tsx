import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PhotoBand } from "@/components/PhotoBand";
import { activities, orgFacts, orgNumbers, studyPaths } from "@/lib/content";
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
        eyebrow="Ainejärjestö"
        title="Aktiiva ry"
        lead="Laskentatoimen, rahoituksen ja yritysjuridiikan opiskelijoiden ainejärjestö Turun kauppakorkeakoulussa. Excursioita, tapahtumia ja edunvalvontaa — ja se osa opiskeluajasta, joka ei näy opintorekisterissä."
        motif="a"
      />

      <PhotoBand
        src="/photos/tse-building-wide.jpg"
        alt="Turun kauppakorkeakoulun rakennus, jonka julkisivussa lukee kauppakorkeakoulu."
        caption="Turun kauppakorkeakoulu, Rehtorinpellonkatu — Aktiivan kotikenttä."
        priority
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
            Aktiiva perustettiin vuonna {orgFacts.founded} yhdistämään ne
            kauppatieteiden opiskelijat, joiden opinnot painottuvat
            laskentatoimeen, rahoitukseen tai yritysjuridiikkaan. Kolme
            suuntausta, yksi yhteisö — ja käytännössä samat urapolut, joita
            jäsenet kulkevat rinnakkain.
          </p>
          <p className={styles.prose}>
            Toiminta on jäsenten itsensä pyörittämää. Hallitus valitaan
            vuosittain syyskokouksessa, ja kuka tahansa jäsen voi asettua
            ehdolle. Suurin osa siitä, mitä Aktiiva tekee, syntyy siitä että
            joku ehdotti sitä.
          </p>
        </div>
      </section>

      <section className={styles.gridSection} aria-labelledby="opinnot">
        <div className={styles.gridAside}>
          <h2 id="opinnot" className={styles.h2}>
            Mitä täällä opiskellaan
          </h2>
        </div>
        <ul className={styles.rows} role="list">
          {studyPaths.map((s) => (
            <li key={s.name} className={styles.row}>
              <h3 className={styles.rowLabel}>{s.name}</h3>
              <p className={styles.rowBody}>{s.body}</p>
            </li>
          ))}
        </ul>
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
