import { AktiivaLogo } from "@/components/AktiivaLogo";
import { HeroArchipelago } from "@/components/HeroArchipelago";
import { HeroField } from "@/components/HeroField";
import { HomeSections } from "@/components/concept1/HomeSections";
import { nav, orgFacts } from "@/lib/content";
import { fraunces, plexSans } from "@/lib/fonts";
import styles from "./concept-1b-a.module.css";

export const metadata = {
  title: "Konsepti 1b-A — Saaristo, kirkas | Aktiiva ry",
};

export default function Concept1bA() {
  return (
    <div className={`${styles.root} ${fraunces.variable} ${plexSans.variable}`}>
      <div className={styles.heroWrap}>
        <HeroArchipelago
          className={styles.heroArchipelago}
          src="/photos/archipelago-variant-a.jpg"
          backgroundPosition="55% 35%"
          filter="none"
          overlayOpacity={0}
          bottomScrim
        />
        <HeroField
          className={styles.heroField}
          theme={{
            aAlpha: 1,
            haloBlur: 9,
            haloColor: "rgba(243, 241, 234, 0.9)",
            showAmbient: false,
          }}
        />
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
            Konsepti 1b-A (väliaikainen variaatio) — kirkas saaristohero.
            Sisältö on paikkamerkkiä designluonnosta varten. Valokuva:
            Lempisaari, Naantalin saaristo — kuva: Plenz, Wikimedia Commons
            (CC BY-SA 3.0), käsitelty.
          </>
        }
      />
    </div>
  );
}
