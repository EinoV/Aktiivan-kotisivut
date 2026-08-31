import Link from "next/link";
import { AktiivaLogo } from "@/components/AktiivaLogo";
import { newsreader, plexSans } from "@/lib/fonts";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Sivua ei löytynyt",
};

/**
 * The 404. Rendered by the root layout, which carries no font variables
 * or colour tokens of its own — those live on each page's own wrapper —
 * so this applies its own, the same way app/page.tsx does. Without that
 * it would fall back to the browser's serif on white and look like a
 * different site.
 *
 * Navy rather than paper: it is the one page with nothing to read, and
 * the site's own dark field is a better place to be lost in than an
 * empty sheet.
 */
export default function NotFound() {
  return (
    <main
      className={`${styles.root} ${newsreader.variable} ${plexSans.variable}`}
    >
      <div className={styles.inner}>
        <AktiivaLogo variant="mark-white" height={44} />
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Sivua ei löytynyt</h1>
        <p className={styles.body}>
          Etsimääsi sivua ei ole tai se on siirretty. Palaa etusivulle tai
          katso yhteystiedot.
        </p>
        <p className={styles.links}>
          <Link href="/">Etusivulle</Link>
          <Link href="/yhteystiedot">Yhteystiedot</Link>
        </p>
      </div>
    </main>
  );
}
