import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PhotoBand } from "@/components/PhotoBand";
import { jobs } from "@/lib/content";
import styles from "../sivut.module.css";

export const metadata = {
  title: "Työpaikat — Aktiiva ry",
  description:
    "Avoimet harjoittelu-, trainee- ja työpaikat Aktiivan jäsenille laskentatoimen, rahoituksen ja yritysjuridiikan aloilta.",
};

export default function TyopaikatPage() {
  return (
    <>
      <PageHeader
        eyebrow="Avoimet paikat"
        title="Työpaikat"
        lead="Kumppaneidemme avoimet harjoittelu-, trainee- ja vakituiset paikat. Lista päivittyy pitkin vuotta, ja painottuu kevääseen, jolloin kesäharjoittelujen haut ovat auki."
        motif="bars"
      />

      <PhotoBand
        src="/photos/turku-riverside-wide.jpg"
        alt="Ilmakuva Aurajoen rannasta Turun keskustassa."
        caption="Suuri osa paikoista on Turussa — loput pääkaupunkiseudulla."
        priority
      />

      <section className={styles.section} aria-labelledby="haussa">
        <div className={styles.sectionHead}>
          <h2 id="haussa" className={styles.h2}>
            Haussa nyt
          </h2>
          <span className={styles.headNote}>{jobs.length} paikkaa</span>
        </div>

        {/* Column headers. Without these the five values below were an
            unlabelled table whose meaning lived only in column position. */}
        <div className={styles.jobHead} aria-hidden="true">
          <span>Tehtävä</span>
          <span>Työnantaja</span>
          <span>Ala</span>
          <span>Paikkakunta</span>
          <span className={styles.jobDeadline}>Haku päättyy</span>
        </div>

        <ul className={styles.jobList} role="list">
          {jobs.map((job) => (
            <li key={job.role + job.employer} className={styles.jobRow}>
              <span className={styles.jobRole}>{job.role}</span>
              <span className={styles.jobMeta}>{job.employer}</span>
              <span className={styles.jobMeta}>{job.field}</span>
              <span className={styles.jobMeta}>
                {job.location} · {job.type}
              </span>
              <span className={styles.jobDeadline}>
                <span className={styles.jobInlineLabel}>Haku päättyy </span>
                {job.deadline}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.gridSection} aria-labelledby="miten">
        <div className={styles.gridAside}>
          <h2 id="miten" className={styles.h2}>
            Miten haet
          </h2>
        </div>
        <div>
          <p className={styles.prose}>
            Haku tapahtuu aina suoraan työnantajan omassa järjestelmässä —
            Aktiiva ei välitä hakemuksia. Ilmoitukset ovat kumppaneidemme
            omia, ja hakuohjeet löytyvät kunkin yrityksen sivuilta.
          </p>
          <p className={styles.prose}>
            Jäsenet saavat uusista paikoista tiedon ensimmäisenä
            jäsenkanavien kautta, usein ennen kuin ne päätyvät tälle
            sivulle.
          </p>
        </div>
      </section>

      <section className={styles.gridSection} aria-labelledby="tyonantajille">
        <div className={styles.gridAside}>
          <h2 id="tyonantajille" className={styles.h2}>
            Työnantajille
          </h2>
        </div>
        <div>
          <p className={styles.prose}>
            Kumppanuuteen kuuluu ilmoitusten julkaisu tällä sivulla ja
            jäsenkanavissa ilman erillistä veloitusta. Tavoitatte suoraan ne
            opiskelijat, jotka suuntaavat laskentatoimen, rahoituksen ja
            yritysjuridiikan tehtäviin.
          </p>
          <div className={styles.actionRow}>
            <Link className={styles.action} href="/kumppanit">
              Lue kumppanuudesta
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
