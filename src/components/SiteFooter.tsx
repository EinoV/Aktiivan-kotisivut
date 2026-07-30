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
    <footer id="yhteystiedot" className={styles.footer}>
      <AktiivaLogo variant="mark-navy" height={44} />
      <div className={styles.col}>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <span>{contact.instagram}</span>
        <span>{contact.linkedin}</span>
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
