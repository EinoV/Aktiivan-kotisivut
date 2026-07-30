import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { fraunces, plexSans } from "@/lib/fonts";
import styles from "./layout.module.css";

/**
 * Shared shell for every page except the homepage. The homepage is
 * deliberately outside this route group: its navigation sits over the
 * hero photograph in the off-white `onDark` tone and is rendered inside
 * HeroPinned, so it can't share a layout that puts the nav above the
 * page content.
 *
 * "(sivut)" is a route group — the parentheses keep it out of the URL,
 * so this file governs /aktiiva, /tyopaikat, … and not /sivut/aktiiva.
 */
export default function SivutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.shell} ${fraunces.variable} ${plexSans.variable}`}>
      <SiteNav tone="onLight" />
      <main className={styles.main}>{children}</main>
      <SiteFooter
        note={
          <>
            Sisältö on paikkamerkkiä designluonnosta varten — nimet, luvut ja
            yhteystiedot eivät ole todellisia. Ks. myös{" "}
            <Link href="/concepts">konseptien historia</Link>.
          </>
        }
      />
    </div>
  );
}
