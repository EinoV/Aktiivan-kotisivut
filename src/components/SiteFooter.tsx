import type { ReactNode } from "react";
import { AktiivaLogo } from "@/components/AktiivaLogo";
import { ContactIcon } from "@/components/ContactIcon";
import { Reveal } from "@/components/Reveal";
import { contact } from "@/lib/content";
import styles from "./SiteFooter.module.css";

/**
 * Two things only: who this is, and how to reach them.
 *
 * It used to carry seven lines — the three contact channels, the org name,
 * the institution, a "Yhteystiedot" link and a note — all at the same size
 * and the same opacity, so none of them led. Three of those were
 * duplicates: the mark already says Aktiiva, the institution repeats the
 * homepage hero, and "Yhteystiedot" is in the header nav on every page.
 * What is left is a large mark against the channels, and the size
 * difference between the two is the whole hierarchy.
 *
 * `note` stays supported and is still passed by /concept-1b and
 * /concept-1b-a, which use third-party photography and OpenStreetMap data
 * and are legally required to credit them. The live pages use the
 * organisation's own photographs and have nothing to attribute, so they
 * pass nothing.
 */
export function SiteFooter({ note }: { note?: ReactNode }) {
  return (
    // Not id="yhteystiedot": that collided with the real /yhteystiedot
    // route, so on that page the anchor and the route shared a name.
    <footer id="sivun-alaosa" className={styles.footer}>
      {/* One fade for the whole footer rather than one per block: it
          arrives as a unit at the end of the page. */}
      <Reveal>
        <div className={styles.inner}>
          {/* White mark: the footer ground is navy. The height prop only
              sets the intrinsic size handed to next/image; the CSS class
              drives the rendered size responsively. */}
          <AktiivaLogo
            variant="mark-white"
            height={110}
            className={styles.mark}
          />

          <div className={styles.col}>
            <a href={`mailto:${contact.email}`}>
              <ContactIcon kind="email" className={styles.icon} />
              {contact.email}
            </a>
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ContactIcon kind="instagram" className={styles.icon} />
              {contact.instagram}
            </a>
            <a
              href={contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ContactIcon kind="linkedin" className={styles.icon} />
              LinkedIn
            </a>
          </div>
        </div>
      </Reveal>

      {note ? <p className={styles.note}>{note}</p> : null}
    </footer>
  );
}
