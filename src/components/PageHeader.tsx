import styles from "./PageHeader.module.css";

/**
 * The title block every subpage opens with: a small uppercase eyebrow,
 * the page title, and a lead paragraph. Left-aligned rather than centred
 * (design-system.md §8 — no "everything centered" layouts), and the lead
 * is capped near 60 characters per line for comfortable reading.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lead}>{lead}</p>
    </header>
  );
}
