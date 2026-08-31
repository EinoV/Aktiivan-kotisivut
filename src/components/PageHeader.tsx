import Image from "next/image";
import styles from "./PageHeader.module.css";

/**
 * The banner every subpage opens with: a full-bleed graded photograph
 * with the page title and lead set over its lower half.
 *
 * This replaces a paper title band that carried a faint dot-A motif in
 * its right column. That motif existed to echo the homepage hero's dot
 * field; once the hero became a photograph the motif referenced nothing,
 * and all three subpages passed the same one, so the three headers were
 * identical apart from the title. DotMark is still in the repo but no
 * longer used here.
 *
 * The photograph moved up from a band further down each page rather than
 * being added — the pages carry the same number of images as before.
 *
 * Title only. Each banner used to carry a lead paragraph under the title;
 * those were removed outright, not relocated. Two of the three said
 * something the rest of their page does not — how the board is elected,
 * and which address to write to for what — so that copy needs a home
 * somewhere below if it is wanted back.
 */
export function PageHeader({
  title,
  photo,
}: {
  title: string;
  photo: { src: string; alt: string };
}) {
  return (
    <header className={styles.header}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="100vw"
        priority
        className={styles.photo}
      />
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.text}>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </header>
  );
}
