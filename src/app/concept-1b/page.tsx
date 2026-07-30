import { AktiivaLogo } from "@/components/AktiivaLogo";
import { HeroField } from "@/components/HeroField";
import { HeroPhoto } from "@/components/HeroPhoto";
import { HomeSections } from "@/components/concept1/HomeSections";
import { nav, orgFacts } from "@/lib/content";
import { fraunces, plexSans } from "@/lib/fonts";
import styles from "./concept-1b.module.css";

export const metadata = {
  title: "Konsepti 1b — Masthead, interaktiivinen hero | Aktiiva ry",
};

export default function Concept1b() {
  return (
    <div className={`${styles.root} ${fraunces.variable} ${plexSans.variable}`}>
      <div className={styles.heroWrap}>
        <HeroPhoto className={styles.heroPhotoLayer} />
        <HeroField className={styles.heroField} />
        <div className={styles.heroOverlay}>
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

          <div className={styles.heroBottom}>
            <p className={styles.heroCaption}>
              {orgFacts.fields.join(" · ")}
            </p>
            <a className={styles.scrollCue} href="#aktiiva">
              Selaa
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M2 5L7 10L12 5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <HomeSections
        footerNote={
          <>
            Konsepti 1b — &ldquo;Masthead&rdquo;, tarkennettu: interaktiivinen
            hero, minimoitu teksti. Sisältö on paikkamerkkiä designluonnosta
            varten. Heron pistekentän saariston muoto perustuu OpenStreetMapin
            rantaviiva-aineistoon, © OpenStreetMap contributors (ODbL).
            Arkkitehtuurivalokuva: ICT-talo, Joukahaisenkatu, Kupittaa — kuva:
            Kotivalo, Wikimedia Commons (CC BY-SA 3.0), käsitelty.
          </>
        }
      />
    </div>
  );
}
