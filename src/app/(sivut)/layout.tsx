import { SiteNav } from "@/components/SiteNav";
import { fraunces, newsreader, plexSans } from "@/lib/fonts";
import styles from "./layout.module.css";

/**
 * Shared shell for every page except the homepage. The homepage is
 * deliberately outside this route group: its navigation sits over the
 * hero photograph in the off-white `onDark` tone and is rendered inside
 * HeroPinned, so it can't share a layout that puts the nav above the
 * page content.
 *
 * "(sivut)" is a route group — the parentheses keep it out of the URL,
 * so this file governs /aktiiva, /hallitus, … and not /sivut/aktiiva.
 * /concepts sits outside the group and is unaffected by any of this.
 *
 * No SiteFooter here. Every page in this group ends with ContactBlock,
 * which carries the same three channels — rendering both put them twice
 * within a couple of hundred pixels. The homepage still has the footer;
 * it has no ContactBlock. */
export default function SivutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${styles.shell} ${fraunces.variable} ${newsreader.variable} ${plexSans.variable}`}
    >
      <a href="#sisalto" className={styles.skipLink}>
        Siirry sisältöön
      </a>
      {/* The nav floats over the page header's photograph instead of
          sitting on a paper strip above it — the treatment Aalto Finance
          uses, and the same relationship the homepage hero already has
          with its own nav. Every route in this group opens with a
          PageHeader banner, so there is always a photograph underneath.
          If a route without one is ever added here, it needs a different
          nav slot: paper links over paper is invisible. */}
      <div className={styles.navSlot}>
        <SiteNav tone="onDark" />
      </div>
      <main id="sisalto" className={styles.main}>
        {children}
      </main>
    </div>
  );
}
