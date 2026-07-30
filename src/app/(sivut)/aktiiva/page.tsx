import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
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
        eyebrow="Ainejärjestö"
        title="Aktiiva ry"
        lead="Laskentatoimen, rahoituksen ja yritysjuridiikan opiskelijoiden ainejärjestö Turun kauppakorkeakoulussa. Excursioita, tapahtumia ja edunvalvontaa — ja se osa opiskeluajasta, joka ei näy opintorekisterissä."
      />

      <section className={styles.section}>
        <ul className={styles.numbers}>
          {orgNumbers.map((n) => (
            <li key={n.label}>
              <span className={styles.numberValue}>{n.value}</span>
              <span className={styles.numberLabel}>{n.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>Keitä olemme</h2>
        </div>
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
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>Mitä teemme</h2>
        </div>
        <ul className={styles.rows}>
          {activities.map((a) => (
            <li key={a.title} className={styles.row}>
              <h3 className={styles.rowLabel}>{a.title}</h3>
              <p className={styles.rowBody}>{a.body}</p>
            </li>
          ))}
        </ul>
        <p className={styles.cta}>
          Kiinnostaako jäsenyys tai hallitustoiminta? Ota yhteyttä{" "}
          <Link href="/hallitus">hallitukseen</Link> — tai katso{" "}
          <Link href="/yhteystiedot">yhteystiedot</Link>.
        </p>
      </section>
    </>
  );
}
