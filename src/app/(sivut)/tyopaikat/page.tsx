import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
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
      />

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>Haussa nyt</h2>
          <span className={styles.headNote}>{jobs.length} paikkaa</span>
        </div>
        <ul className={styles.jobList}>
          {jobs.map((job) => (
            <li key={job.role + job.employer} className={styles.jobRow}>
              <span className={styles.jobRole}>{job.role}</span>
              <span className={styles.jobMeta}>{job.employer}</span>
              <span className={styles.jobMeta}>{job.field}</span>
              <span className={styles.jobMeta}>
                {job.location} · {job.type}
              </span>
              <span className={styles.jobDeadline}>
                Haku päättyy {job.deadline}
              </span>
            </li>
          ))}
        </ul>
        <p className={styles.cta}>
          Työnantaja? Kumppanuuteen kuuluu ilmoitusten julkaisu tällä sivulla
          ja jäsenkanavissa. Lue lisää{" "}
          <Link href="/kumppanit">kumppanuudesta</Link> tai ota suoraan{" "}
          <Link href="/yhteystiedot">yhteyttä</Link>.
        </p>
      </section>
    </>
  );
}
