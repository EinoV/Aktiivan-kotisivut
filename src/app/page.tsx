import { HeroCastle } from "@/components/HeroCastle";
import { HomeSections } from "@/components/concept1/HomeSections";
import { fraunces, newsreader, plexSans } from "@/lib/fonts";
import styles from "./page.module.css";

/* No title here on purpose: the root layout's template would turn one
   into "Aktiiva ry — Aktiiva ry". The default it sets is already right. */

export default function Home() {
  return (
    <div
      className={`${styles.root} ${fraunces.variable} ${newsreader.variable} ${plexSans.variable}`}
    >
      <HeroCastle />

      {/* Closes on ContactBlock, like every subpage, rather than on the
          footer — the two carry the same three channels and rendering
          both put them twice within a couple of hundred pixels.

          No footerNote either: every photograph on the live site is the
          organisation's own, so there is nothing to attribute. The
          archived /concept-* routes still pass one and keep the footer —
          they use third-party photography and OpenStreetMap data. */}
      <HomeSections audiencesVariant="feature" logoBand closing="contact" />
    </div>
  );
}
