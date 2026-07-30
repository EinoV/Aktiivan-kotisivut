import { AktiivaLogo } from "@/components/AktiivaLogo";
import { PlaceholderPhoto } from "@/components/PlaceholderPhoto";
import { audiences, contact, jobs, nav, orgFacts, partners } from "@/lib/content";
import { newsreader, newsreaderItalicAlt, plexSans } from "@/lib/fonts";
import styles from "./concept-4.module.css";

export const metadata = {
  title: "Konsepti 4 — Community Layers | Aktiiva ry",
};

const navA = nav.slice(0, 3);
const navB = nav.slice(3);

const tierClass: Record<string, string> = {
  Pääyhteistyökumppani: "tier-main",
  Yhteistyökumppani: "tier-mid",
  Tapahtumakumppani: "tier-small",
};

export default function Concept4() {
  return (
    <div
      className={`${styles.root} ${newsreader.variable} ${newsreaderItalicAlt.variable} ${plexSans.variable}`}
    >
      <header className={styles.header}>
        <ul className={styles.navGroup}>
          {navA.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
        <AktiivaLogo variant="mark-navy" height={42} priority />
        <ul className={styles.navGroup}>
          {navB.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>
            {orgFacts.name} — {orgFacts.institution}
          </p>
          <h1 className={styles.headline}>
            Yhteisö, joka kasvaa opiskelijoiden, kumppanien ja alumnien
            mukana.
          </h1>
          <p className={styles.pullquote}>
            &ldquo;Parhaat kontaktit syntyivät Aktiivan tapahtumissa, ei
            luentosalissa.&rdquo;
          </p>
        </div>
        <div className={styles.heroCluster}>
          <div className={styles.clusterA}>
            <PlaceholderPhoto
              seed="c4-a"
              variant="halftone"
              caption="Vuosijuhla"
              className={styles.clusterFill}
            />
          </div>
          <div className={styles.clusterB}>
            <PlaceholderPhoto
              seed="c4-b"
              variant="silhouette"
              caption="Fuksiaiset"
              className={styles.clusterFill}
            />
          </div>
          <div className={styles.clusterC}>
            <PlaceholderPhoto
              seed="c4-c"
              variant="linework"
              caption="Yrityskäynti"
              className={styles.clusterFill}
            />
          </div>
        </div>
      </section>

      <section id="aktiiva" className={styles.intro}>
        <p>
          Aktiiva ry on Turun kauppakorkeakoulun laskentatoimen, rahoituksen
          ja yritysjuridiikan opiskelijoiden ainejärjestö.
        </p>
        <p>
          Järjestämme excursioita, yritysvierailuja ja opintoihin liittyviä
          tapahtumia — ja pidämme huolen siitä, että opiskeluaikana syntyy
          myös ystäviä, ei vain opintopisteitä.
        </p>
      </section>

      <section className={styles.audiences}>
        {audiences.map((a, i) => (
          <div key={a.id} className={styles.audienceBlock}>
            <PlaceholderPhoto
              seed={`c4-aud-${i}`}
              variant={i === 1 ? "silhouette" : "halftone"}
              caption={a.label}
              className={styles.photo}
            />
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
        <div className={styles.jobScroll}>
          {jobs.map((job) => (
            <div key={job.role + job.employer} className={styles.jobCard}>
              <p className={styles.jobOrg}>{job.employer}</p>
              <p className={styles.jobRole}>{job.role}</p>
              <p className={styles.jobMeta}>
                {job.field} · {job.location}
              </p>
              <p className={styles.jobMeta}>Haku päättyy {job.deadline}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="kumppanit" className={styles.partners}>
        <h2>Kumppanit</h2>
        <div className={styles.partnerRow}>
          {partners.map((p) => (
            <span key={p.name} className={styles[tierClass[p.tier]]}>
              {p.name}
            </span>
          ))}
        </div>
      </section>

      <footer id="yhteystiedot" className={styles.footer}>
        <AktiivaLogo variant="mark-navy" height={40} />
        <div className={styles.footerCol}>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <span>{contact.instagram}</span>
          <span>{contact.linkedin}</span>
        </div>
        <div className={styles.footerCol}>
          <span>{orgFacts.name}</span>
          <span>
            {orgFacts.institution}, {orgFacts.city}
          </span>
        </div>
        <p className={styles.footerNote}>
          Konsepti 4 / 5 — &ldquo;Community Layers&rdquo;. Sisältö on
          paikkamerkkiä designluonnosta varten.
        </p>
      </footer>
    </div>
  );
}
