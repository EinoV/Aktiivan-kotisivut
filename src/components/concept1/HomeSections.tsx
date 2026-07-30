import type { ReactNode } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { audiences, jobs, partners } from "@/lib/content";
import styles from "./HomeSections.module.css";

const partnerTiers = [
  "Pääyhteistyökumppani",
  "Yhteistyökumppani",
  "Tapahtumakumppani",
] as const;

export function HomeSections({ footerNote }: { footerNote: ReactNode }) {
  return (
    <>
      <section id="aktiiva" className={styles.intro}>
        <p>
          Aktiiva ry on Turun kauppakorkeakoulun laskentatoimen, rahoituksen
          ja yritysjuridiikan opiskelijoiden ainejärjestö — excursioita,
          yritysvierailuja ja tapahtumia, joissa syntyy myös ystäviä, ei vain
          opintopisteitä.
        </p>
      </section>

      <section className={styles.audiences}>
        <ul className={styles.audienceList}>
          {audiences.map((a) => (
            <li key={a.id} className={styles.audienceRow}>
              <h3>{a.label}</h3>
              <p>{a.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="tyopaikat" className={styles.jobs}>
        <div className={styles.jobsHead}>
          <h2>Avoimet paikat</h2>
          <Link href="/tyopaikat" className={styles.moreLink}>
            Kaikki työpaikat →
          </Link>
        </div>
        <ul className={styles.jobList}>
          {jobs.map((job) => (
            <li key={job.role + job.employer} className={styles.jobRow}>
              <span className={styles.jobRole}>{job.role}</span>
              <span className={styles.jobEmployer}>{job.employer}</span>
              <span className={styles.jobField}>{job.field}</span>
              <span className={styles.jobDeadline}>
                Haku päättyy {job.deadline}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section id="kumppanit" className={styles.partners}>
        <div className={styles.jobsHead}>
          <h2>Kumppanit</h2>
          <Link href="/kumppanit" className={styles.moreLink}>
            Kumppanuudesta →
          </Link>
        </div>
        {partnerTiers.map((tier) => {
          const names = partners.filter((p) => p.tier === tier);
          if (names.length === 0) return null;
          return (
            <div key={tier} className={styles.partnerTier}>
              <span className={styles.partnerTierLabel}>{tier}</span>
              <div className={styles.partnerNames}>
                {names.map((p) => (
                  <span key={p.name}>{p.name}</span>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <SiteFooter note={footerNote} />
    </>
  );
}
