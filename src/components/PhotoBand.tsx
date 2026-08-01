import Image from "next/image";
import styles from "./PhotoBand.module.css";

/**
 * A full-bleed graded photograph used to break up the subpages.
 *
 * The images are baked with design-system.md §3's grading recipe (see
 * the scratchpad grade.py), but with the darkening steps backed off:
 * the hero's recipe assumes off-white text sits on top of the photo,
 * while these sit on --paper as editorial filler and only need to read
 * as the same brand family. §3 explicitly sanctions backing step 6 off.
 *
 * `priority` only for a band that is genuinely above the fold — every
 * other one should lazy-load.
 */
export function PhotoBand({
  src,
  alt,
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}) {
  return (
    <figure className={styles.band}>
      <div className={styles.frame}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className={styles.image}
          priority={priority}
        />
      </div>
      {caption ? (
        <figcaption className={styles.caption}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}
