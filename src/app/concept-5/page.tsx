import { AktiivaLogo } from "@/components/AktiivaLogo";
import { PlaceholderPhoto } from "@/components/PlaceholderPhoto";
import { audiences, contact, jobs, nav, orgFacts, partners } from "@/lib/content";
import { jetbrainsMono, spectral500, workSans } from "@/lib/fonts";
import styles from "./concept-5.module.css";

export const metadata = {
  title: "Konsepti 5 — Ledger / Index | Aktiiva ry",
};

export default function Concept5() {
  const today = "29.7.2026";

  return (
    <div className={`${styles.root} ${jetbrainsMono.variable} ${spectral500.variable} ${workSans.variable}`}>
      <div className={styles.ticker}>
        <span>
          {orgFacts.name} — {orgFacts.fields.join(" · ")}
        </span>
        <span>{orgFacts.institution}, {orgFacts.city}</span>
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <AktiivaLogo variant="mark-navy" height={38} priority />
          <ul className={styles.sidebarNav}>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <PlaceholderPhoto
            seed="c5-side"
            variant="halftone"
            caption="Syyskokous"
            className={styles.sidebarPhoto}
          />
          <div className={styles.factsBlock}>
            <span>Perustettu {orgFacts.founded}</span>
            <span>{orgFacts.institution}</span>
            <span>{orgFacts.city}</span>
          </div>
          <div className={styles.contactBlock} id="yhteystiedot">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <span>{contact.instagram}</span>
            <span>{contact.linkedin}</span>
          </div>
        </aside>

        <main className={styles.main}>
          <section className={styles.hero}>
            <p className={styles.heroEyebrow}>Päivitetty {today}</p>
            <h1 className={styles.headline}>
              Opiskelijat. Työnantajat. Alumnit. Yksi indeksi.
            </h1>
            <p className={styles.pullquote}>
              &ldquo;Katsoin ensin auki olevat paikat — jäin sitten kaikkeen
              muuhunkin.&rdquo;
            </p>
          </section>

          <section id="tyopaikat" className={styles.jobsIndex}>
            <div className={styles.sectionHead}>
              <h2>Avoimet paikat</h2>
              <span className={styles.count}>({jobs.length})</span>
            </div>
            {jobs.map((job, i) => (
              <div key={job.role + job.employer} className={styles.jobEntry}>
                <span className={styles.jobIndexNum}>
                  {String(i + 1).padStart(2, "0")} / {job.type}
                </span>
                <p className={styles.jobRole}>
                  {job.role} — {job.employer}
                </p>
                <p className={styles.jobMeta}>
                  {job.field} · {job.location}
                </p>
                <span className={styles.jobDeadline}>
                  Haku päättyy
                  <br />
                  {job.deadline}
                </span>
              </div>
            ))}
          </section>

          <section id="aktiiva" className={styles.routes}>
            <div className={styles.sectionHead}>
              <h2>Reitit</h2>
            </div>
            <ul className={styles.routeList}>
              {audiences.map((a) => (
                <li key={a.id} className={styles.routeItem}>
                  <a href={`#${a.id}`}>
                    <span>{a.heading}</span>
                    <span>{a.label} →</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section id="kumppanit" className={styles.partners}>
            <span className={styles.label}>Kumppanit</span>
            {partners.map((p) => p.name).join(", ")}.
          </section>

          <footer className={styles.footer}>
            <span>{orgFacts.name} — designkonsepti, ei tuotantosivu</span>
            <span>Konsepti 5 / 5 — &quot;Ledger / Index&quot;</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
