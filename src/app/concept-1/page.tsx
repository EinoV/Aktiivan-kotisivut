import { AktiivaLogo } from "@/components/AktiivaLogo";
import { PlaceholderPhoto } from "@/components/PlaceholderPhoto";
import { audiences, contact, jobs, nav, orgFacts, partners } from "@/lib/content";
import { fraunces, plexSans } from "@/lib/fonts";
import styles from "./concept-1.module.css";

export const metadata = {
  title: "Konsepti 1 — Masthead | Aktiiva ry",
};

const partnerTiers = [
  "Pääyhteistyökumppani",
  "Yhteistyökumppani",
  "Tapahtumakumppani",
] as const;

export default function Concept1() {
  return (
    <div className={`${styles.root} ${fraunces.variable} ${plexSans.variable}`}>
      <header className={styles.header}>
        <AktiivaLogo variant="mark-navy" height={38} priority />
        <ul className={styles.nav}>
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </header>

      <section className={styles.hero}>
        <p className={styles.eyebrow}>
          {orgFacts.name} — {orgFacts.institution}
        </p>
        <h1 className={styles.headline}>
          Laskentatoimen, rahoituksen ja yritysjuridiikan opiskelijat, yhdessä
          vuodesta {orgFacts.founded}.
        </h1>
        <p className={styles.subhead}>
          Aktiiva yhdistää opiskelijat, alan yritykset ja alumnit — tapahtumin,
          kumppanuuksin ja avoimin ovin Turussa.
        </p>
      </section>

      <div className={styles.heroPhotoWrap}>
        <PlaceholderPhoto
          seed="concept1-hero"
          variant="halftone"
          caption="Kevätpiknik, toukokuu"
          className={styles.heroPhoto}
        />
      </div>

      <section id="aktiiva" className={styles.intro}>
        <p className={styles.introLabel}>Mikä Aktiiva on</p>
        <div className={styles.introBody}>
          <p>
            Aktiiva ry on Turun kauppakorkeakoulun laskentatoimen, rahoituksen
            ja yritysjuridiikan opiskelijoiden ainejärjestö. Järjestämme
            excursioita, yritysvierailuja ja opintoihin liittyviä tapahtumia —
            ja pidämme huolen siitä, että opiskeluaikana syntyy myös
            ystäviä, ei vain opintopisteitä.
          </p>
          <p>
            Mukana on opiskelijoita kaikilta vuosikursseilta, yhteistyö­kumppaneita
            talouden eri aloilta ja alumneja, jotka pitävät yhteyttä järjestöön
            vielä valmistumisensa jälkeenkin.
          </p>
        </div>
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
          <span>Kaikki työpaikat →</span>
        </div>
        <ul className={styles.jobList}>
          {jobs.map((job) => (
            <li key={job.role + job.employer} className={styles.jobRow}>
              <span className={styles.jobRole}>{job.role}</span>
              <span className={styles.jobEmployer}>{job.employer}</span>
              <span className={styles.jobField}>{job.field}</span>
              <span className={styles.jobDeadline}>Haku päättyy {job.deadline}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="kumppanit" className={styles.partners}>
        <h2>Kumppanit</h2>
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

      <footer id="yhteystiedot" className={styles.footer}>
        <AktiivaLogo variant="mark-navy" height={44} />
        <div className={styles.footerCol}>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <span>{contact.instagram}</span>
          <span>{contact.linkedin}</span>
        </div>
        <div className={styles.footerCol}>
          <span>{orgFacts.name}</span>
          <span>{orgFacts.institution}, {orgFacts.city}</span>
        </div>
        <p className={styles.footerNote}>
          Konsepti 1 / 5 — &ldquo;Masthead&rdquo;. Sisältö on paikkamerkkiä
          designluonnosta varten.
        </p>
      </footer>
    </div>
  );
}
