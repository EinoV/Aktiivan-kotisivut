import { DotMark, type DotMarkMotif } from "@/components/DotMark";
import styles from "./PageHeader.module.css";

/**
 * The title block every subpage opens with: a small uppercase eyebrow,
 * the page title, and a lead paragraph, with the page's dot motif
 * occupying the right side of the band.
 *
 * Left-aligned rather than centred (design-system §8 — no "everything
 * centered" layouts). The motif fills the right half, which previously
 * sat empty on every subpage because the text measure is capped near
 * 58ch for readability.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  motif,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  motif: DotMarkMotif;
}) {
  return (
    <header className={styles.header}>
      <div className={styles.text}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lead}>{lead}</p>
      </div>
      <div className={styles.markSlot}>
        <DotMark motif={motif} />
      </div>
    </header>
  );
}
