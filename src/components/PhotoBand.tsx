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
  priority = false,
  cropBottom = false,
  tall = false,
  tallest = false,
  narrow = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  /** Pins the cover-crop toward the bottom of the source photo instead of centering. */
  cropBottom?: boolean;
  /** Uses a taller frame so more of a portrait source survives the crop. */
  tall?: boolean;
  /** Taller still than `tall` — for a source that needs the crop to reach further up from the bottom. Takes precedence over tall. */
  tallest?: boolean;
  /** Caps the band to the text sections' content width instead of full-bleed. */
  narrow?: boolean;
}) {
  const frameClass = tallest ? styles.frameTallest : tall ? styles.frameTall : "";
  const imageClass = cropBottom ? styles.imageBottom : styles.image;

  return (
    <figure className={styles.band}>
      <div className={`${styles.frame} ${frameClass} ${narrow ? styles.frameNarrow : ""}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className={imageClass}
          priority={priority}
        />
      </div>
    </figure>
  );
}
