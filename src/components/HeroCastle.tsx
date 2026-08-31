import type { CSSProperties } from "react";
import Image from "next/image";
import { SiteNav } from "@/components/SiteNav";
import styles from "./HeroCastle.module.css";

/**
 * The homepage hero: Turku Castle at blue hour, type in the sky above the
 * roofline, and a navy plinth along the foot carrying a slow marquee.
 *
 * No client JS: one <picture>, some gradients, and a single CSS animation.
 * The photograph itself does not move. An earlier version carried three
 * motion layers over it (a 48s scale drift, flickering glows on the lit
 * windows, stepped grain) and they were pulled — at amplitudes low enough
 * to stay dignified they were not perceptible, so they cost battery and
 * code for nothing.
 *
 * The plinth marquee is the deliberate exception, and the lesson from
 * that: it is meant to be seen moving. It runs at roughly the 50px/s crawl
 * Rogo uses for its client-logo band.
 *
 * The grain layer also survives, but still rather than stepping — it is
 * there to break up the banding a phone's night mode leaves in a smooth
 * dark sky, which is a job it does without moving.
 */

/**
 * How many times the three disciplines are laid end to end.
 *
 * The marquee loops by translating the track exactly -50%, so the second
 * half has to land pixel-for-pixel where the first half started. Two
 * things make that hold: the repeat count is even, and the spacing lives
 * on the items rather than as the track's `gap` — with `gap`, half the
 * track width lands half a gap short of the alignment point and the loop
 * visibly jumps once per cycle.
 *
 * 10 also keeps the track wider than the viewport plus one half-track on
 * displays up to ~3000px, below which the loop would show a bare patch.
 */
const MARQUEE_REPEATS = 10;

/**
 * Placeholders standing in for partner logos.
 *
 * Heights are set per logo rather than shared, because optical size and
 * bounding-box size are not the same thing: TuKY's mark is square and
 * reads large at any given height, Aktiiva's lockup is tall and narrow
 * and reads small at the same one. Matching the boxes would make one look
 * shouted and the other whispered.
 *
 * Shown in their own colours. A partner band that repaints partner
 * brands into one house tone is a real option — it looks more controlled
 * on navy — but it is also a decision to make once, deliberately, when
 * the real logos arrive, not a default to drift into with two
 * placeholders.
 */
const BAND_LOGOS: ReadonlyArray<{
  src: string;
  alt: string;
  width: number;
  height: number;
  displayHeight: string;
}> = [
  {
    src: "/logo/aktiiva-mark-white.png",
    alt: "Aktiiva",
    width: 198,
    height: 220,
    displayHeight: "3.1rem",
  },
  {
    src: "/logo/tuky-logo.png",
    alt: "Turun kauppakorkeakoulun ylioppilaskunta",
    width: 1080,
    height: 1080,
    displayHeight: "3rem",
  },
];

export function HeroCastle() {
  return (
    <section className={styles.hero}>
      <div className={styles.media}>
        {/* Hand-rolled <picture> rather than next/image: phones get a
            portrait crop of the castle rather than the landscape one
            repositioned, which is art direction, and next/image has no
            <source media> equivalent. Rendering two <Image fill> elements
            and hiding one with CSS would make phones download the desktop
            file too. The cost of doing it this way is losing automatic
            AVIF/WebP, so both files are pre-compressed at build time. */}
        <picture>
          <source
            media="(max-width: 640px)"
            srcSet="/photos/hero-castle-mobile.jpg"
            width={941}
            height={1672}
          />
          {/* Both sources are the same subject, so one alt covers the
              pair — which it could not when the phone crop was a different
              photograph altogether. */}
          <img
            className={styles.photo}
            src="/photos/hero-castle-wide.jpg"
            alt="Turun linna valaistuna sinisenä hetkenä."
            width={1672}
            height={941}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>

      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.bottomFade} aria-hidden="true" />

      <div className={styles.overlay}>
        <SiteNav tone="onDark" />
        <div className={styles.copy}>
          {/* The logo's own AKTIIVA wordmark rather than the name set in
              Newsreader. It was extracted from aktiiva-lockup-navy-bg.png,
              the only asset that carries it at any size — the small
              lockups are 198px wide — by finding the ink rows, splitting
              the wordmark off below the A, and turning the navy ground
              into alpha so it can sit on the photograph.

              alt carries the name, so the <h1> still has a text
              equivalent and nothing needs to be visually hidden. */}
          <h1 className={styles.headline}>
            <Image
              className={styles.wordmark}
              src="/logo/aktiiva-wordmark-white.png"
              alt="Aktiiva"
              width={611}
              height={112}
              priority
            />
          </h1>
          {/* Spelled out rather than composed from the disciplines list
              in content.ts: it needs Finnish genitive forms, and deriving
              grammar from a data array is how you end up with
              "Laskentatoimi, Rahoitus ja Yritysjuridiikka ainejärjestö". */}
          <p className={styles.sub}>
            Turun kauppakorkeakoulun laskentatoimen, rahoituksen ja
            yritysjuridiikan ainejärjestö
          </p>
        </div>

        {/* The plinth is the equivalent of the client-logo band Rogo runs
            under its hero. It carried the three disciplines as words until
            partner logos existed; these two are the placeholders for that,
            and the markup is now the shape it will keep — an image per
            item, nothing else.

            aria-hidden on the whole band, deliberately. It shows Aktiiva's
            own mark and TuKY's beside it, which is not a partnership
            claim, and announcing it as one would be a false statement to a
            screen reader. When real partners land this needs a real label
            and the first pass exposed, exactly as the discipline list
            was. */}
        <div className={styles.plinth} aria-hidden="true">
          <div className={styles.viewport}>
            <ul className={styles.track}>
              {Array.from({ length: MARQUEE_REPEATS }, (_, pass) =>
                BAND_LOGOS.map((logo) => (
                  <li key={`${pass}-${logo.src}`} className={styles.item}>
                    <Image
                      className={styles.logo}
                      style={{ "--logo-height": logo.displayHeight } as CSSProperties}
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                    />
                  </li>
                )),
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
