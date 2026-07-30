import Image from "next/image";
import { AktiivaLogo } from "@/components/AktiivaLogo";
import { PlaceholderPhoto } from "@/components/PlaceholderPhoto";
import { audiences, contact, jobs, nav, orgFacts, partners } from "@/lib/content";
import { jetbrainsMono, spectral500, spectral600, workSans } from "@/lib/fonts";
import styles from "./concept-3.module.css";

export const metadata = {
  title: "Konsepti 3 — Grid System | Aktiiva ry",
};

export default function Concept3() {
  return (
    <div
      className={`${styles.root} ${spectral500.variable} ${spectral600.variable} ${workSans.variable} ${jetbrainsMono.variable}`}
    >
      <div className={styles.grid}>
        <header className={styles.header}>
          <AktiivaLogo variant="mark-navy" height={36} priority />
          <ul className={styles.nav}>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </header>
        <div className={styles.headerRule} />

        <section className={styles.hero}>
          <Image
            src="/logo/aktiiva-mark-navy.png"
            alt=""
            aria-hidden="true"
            width={480}
            height={533}
            className={styles.watermark}
          />
          <h1 className={styles.headline}>
            Talouden ja juridiikan opiskelijoiden yhteisö Turussa.
          </h1>
          <div className={styles.factsPanel}>
            <div className={styles.factRow}>
              <span className={styles.factLabel}>Perustettu</span>
              <span>{orgFacts.founded}</span>
            </div>
            <div className={styles.factRow}>
              <span className={styles.factLabel}>Oppilaitos</span>
              <span>{orgFacts.institution}</span>
            </div>
            <div className={styles.factRow}>
              <span className={styles.factLabel}>Alat</span>
              <span>{orgFacts.fields.join(" / ")}</span>
            </div>
            <div className={styles.factRow}>
              <span className={styles.factLabel}>Sijainti</span>
              <span>{orgFacts.city}</span>
            </div>
          </div>
        </section>

        <section id="aktiiva" className={styles.intro}>
          <p className={styles.introLabel}>Mikä Aktiiva on</p>
          <p className={styles.introBody}>
            Aktiiva ry on Turun kauppakorkeakoulun laskentatoimen, rahoituksen
            ja yritysjuridiikan opiskelijoiden ainejärjestö. Järjestämme
            excursioita, yritysvierailuja ja opintoihin liittyviä tapahtumia —
            ja pidämme huolen siitä, että opiskeluaikana syntyy myös ystäviä,
            ei vain opintopisteitä.
          </p>
        </section>

        <div className={styles.activityRow}>
          <PlaceholderPhoto
            seed="c3-act-1"
            variant="halftone"
            caption="Excursio, syksy"
          />
          <PlaceholderPhoto
            seed="c3-act-2"
            variant="linework"
            caption="Vuosijuhla"
          />
          <PlaceholderPhoto
            seed="c3-act-3"
            variant="silhouette"
            caption="Fuksiaiset"
          />
        </div>

        <section className={styles.audiences}>
          {audiences.map((a) => (
            <div key={a.id} className={styles.audienceCol}>
              <h3>{a.label}</h3>
              <p>{a.body}</p>
            </div>
          ))}
        </section>

        <section id="tyopaikat" className={styles.jobs}>
          <div className={styles.sectionHead}>
            <h2>Avoimet paikat</h2>
            <span>Kaikki työpaikat →</span>
          </div>
          <div className={styles.registerHead}>
            <span>Tehtävä</span>
            <span>Organisaatio</span>
            <span>Ala</span>
            <span>Sijainti</span>
            <span>Haku päättyy</span>
          </div>
          {jobs.map((job) => (
            <div key={job.role + job.employer} className={styles.registerRow}>
              <span>{job.role}</span>
              <span className={styles.mono}>{job.employer}</span>
              <span className={styles.mono}>{job.field}</span>
              <span className={styles.mono}>{job.location}</span>
              <span className={styles.mono}>{job.deadline}</span>
            </div>
          ))}
        </section>

        <section id="kumppanit" className={styles.partners}>
          <p className={styles.partnersLabel}>Kumppanit</p>
          <div className={styles.partnerList}>
            {partners.map((p) => (
              <div key={p.name} className={styles.partnerItem}>
                <span className={styles.name}>{p.name}</span>
                <span className={styles.tier}>{p.tier}</span>
              </div>
            ))}
          </div>
        </section>

        <footer id="yhteystiedot" className={styles.footer}>
          <div className={styles.footerLogo}>
            <AktiivaLogo variant="mark-navy" height={40} />
          </div>
          <div className={styles.footerCol}>
            <span>{contact.email}</span>
            <span>{contact.instagram}</span>
            <span>{contact.linkedin}</span>
          </div>
          <div className={styles.footerCol}>
            <span>{orgFacts.name}</span>
            <span>{orgFacts.city}</span>
          </div>
          <p className={styles.footerNote}>
            Konsepti 3 / 5 — &quot;Grid System&quot;. Sisältö on paikkamerkkiä
            designluonnosta varten.
          </p>
        </footer>
      </div>
    </div>
  );
}
