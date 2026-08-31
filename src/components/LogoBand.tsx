import { AktiivaLogo } from "@/components/AktiivaLogo";
import styles from "./LogoBand.module.css";

/**
 * A breath of --paper carrying nothing but the navy mark.
 *
 * It exists to separate two navy fields. Both places that use it — the
 * homepage between the audiences spread and the contact block, and
 * /aktiiva between the activities spread and the same block — have the
 * identical problem: without it the page runs dark from the middle to
 * the bottom with no break.
 *
 * Shared rather than copied so the two stay identical; they are meant to
 * be the same object seen twice, not two similar bands.
 *
 * Centred, which the rest of the site is not (design-system.md §8 rules
 * out "everything centred" layouts) — but this is a single mark rather
 * than a layout, and there is nothing for it to align to.
 *
 * `aria-hidden`: the wordmark is decorative here. The organisation is
 * named in the contact block directly below and in the nav above.
 */
export function LogoBand() {
  return (
    <section className={styles.band} aria-hidden="true">
      {/* Navy on transparent, so it sits on --paper without leaving a
          lighter rectangle around itself. The height prop only sets the
          intrinsic size handed to next/image; the CSS drives the
          rendered size. */}
      <AktiivaLogo variant="mark-navy-lg" height={360} className={styles.mark} />
    </section>
  );
}
