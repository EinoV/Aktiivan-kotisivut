import type { ReactNode } from "react";
import Link from "next/link";
import { AktiivaLogo } from "@/components/AktiivaLogo";
import { contact, orgFacts } from "@/lib/content";
import styles from "./SiteFooter.module.css";

/**
 * Shared across the homepage and every subpage. `note` is optional
 * because the photo credit it usually carries only applies where the
 * photograph actually appears (the homepage hero) — subpages pass their
 * own shorter note or none at all.
 */
export function SiteFooter({ note }: { note?: ReactNode }) {
  return (
    // Not id="yhteystiedot": that collided with the real /yhteystiedot
    // route, so on that page the anchor and the route shared a name.
    <footer id="sivun-alaosa" className={styles.footer}>
      <AktiivaLogo variant="mark-navy" height={44} />
      <div className={styles.col}>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <a
          href={contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {contact.instagram}
        </a>
        <a
          href={contact.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
      <div className={styles.col}>
        <span>{orgFacts.name}</span>
        <span>
          {orgFacts.institution}, {orgFacts.city}
        </span>
        <Link href="/yhteystiedot">Yhteystiedot</Link>
      </div>
      {note ? <p className={styles.note}>{note}</p> : null}
    </footer>
  );
}
