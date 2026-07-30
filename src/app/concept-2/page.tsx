import { AktiivaLogo } from "@/components/AktiivaLogo";
import { PlaceholderPhoto } from "@/components/PlaceholderPhoto";
import { audiences, contact, jobs, nav, orgFacts, partners } from "@/lib/content";
import { archivo, newsreaderItalic } from "@/lib/fonts";
import styles from "./concept-2.module.css";

export const metadata = {
  title: "Konsepti 2 — Split Frame | Aktiiva ry",
};

const partnerTiers = [
  "Pääyhteistyökumppani",
  "Yhteistyökumppani",
  "Tapahtumakumppani",
] as const;

const filmstripSeeds = [
  { seed: "c2-film-1", caption: "Fuksiaiset, syyskuu" },
  { seed: "c2-film-2", caption: "Yrityskäynti" },
  { seed: "c2-film-3", caption: "Pikkujoulut" },
  { seed: "c2-film-4", caption: "Kevätexcursio" },
];

export default function Concept2() {
  return (
    <div className={`${styles.root} ${archivo.variable} ${newsreaderItalic.variable}`}>
      <header className={styles.topbar}>
        <AktiivaLogo variant="mark-white" height={34} priority />
        <ul className={styles.nav}>
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </header>

      <div className={styles.heroSplit}>
        <div className={styles.heroLeft}>
          <h1 className={styles.headline}>
            Talouden ja juridiikan opiskelijat kohtaavat työelämän Turussa.
          </h1>
          <p className={styles.caption}>
            Excursiot, yritysvierailut ja verkostot — {orgFacts.name}, vuodesta{" "}
            {orgFacts.founded}.
          </p>
        </div>
        <PlaceholderPhoto
          seed="c2-hero"
          variant="halftone"
          tone="navy-on-light"
          caption="Syyslukukauden avajaiset"
          className={styles.heroRight}
        />
      </div>

      <section id="aktiiva" className={styles.intro}>
        <p className={styles.introEyebrow}>Mikä Aktiiva on</p>
        <p className={styles.introBody}>
          Aktiiva ry on Turun kauppakorkeakoulun laskentatoimen, rahoituksen ja
          yritysjuridiikan opiskelijoiden ainejärjestö. Yhdistämme opinnot ja
          työelämän tapahtumin, excursioin ja kumppanuuksin — ja pidämme huolen
          siitä, että mukana syntyy myös ystäviä.
        </p>
      </section>

      <div className={styles.filmstrip}>
        {filmstripSeeds.map((f) => (
          <PlaceholderPhoto
            key={f.seed}
            seed={f.seed}
            variant="linework"
            tone="navy-on-light"
            caption={f.caption}
          />
        ))}
      </div>

      <section className={styles.audiences}>
        {audiences.map((a, i) => (
          <div key={a.id} className={styles.audienceCol}>
            <PlaceholderPhoto
              seed={`c2-aud-${i}`}
              variant="silhouette"
              tone="navy-on-light"
              caption={a.label}
              className={styles.audiencePhoto}
            />
            <h3>{a.label}</h3>
            <p>{a.body}</p>
          </div>
        ))}
      </section>

      <div className={styles.navyBlock}>
        <div className={styles.navyInner}>
          <section id="tyopaikat">
            <div className={styles.sectionHead}>
              <h2>Avoimet paikat</h2>
              <span>Kaikki työpaikat →</span>
            </div>
            <ul className={styles.ledger}>
              {jobs.map((job) => (
                <li key={job.role + job.employer} className={styles.ledgerRow}>
                  <span className={styles.role}>{job.role}</span>
                  <span className={styles.muted}>{job.employer}</span>
                  <span className={styles.muted}>{job.field}</span>
                  <span className={styles.muted}>{job.location}</span>
                  <span className={styles.deadline}>{job.deadline}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="kumppanit" className={styles.partnersSection}>
            <div className={styles.sectionHead}>
              <h2>Kumppanit</h2>
            </div>
            {partnerTiers.map((tier) => {
              const names = partners.filter((p) => p.tier === tier);
              if (names.length === 0) return null;
              return (
                <div key={tier} className={styles.partnerGroup}>
                  <p className={styles.partnerGroupLabel}>{tier}</p>
                  <div className={styles.partnerGroupNames}>
                    {names.map((p) => (
                      <span key={p.name}>{p.name}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </div>

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
          Konsepti 2 / 5 — &ldquo;Split Frame&rdquo;. Sisältö on paikkamerkkiä
          designluonnosta varten.
        </p>
      </footer>
    </div>
  );
}
