import { ContactIcon } from "@/components/ContactIcon";
import { contact, orgFacts } from "@/lib/content";
import styles from "./ContactBlock.module.css";

/**
 * The navy contact block every subpage closes on: a serif heading over a
 * stack of icon rows, following the shape Aalto Accounting uses.
 *
 * No Facebook row — Aktiiva does not have one, and a channel that does
 * not exist is worse than a shorter list.
 *
 * The postal address sits below the stack rather than in it. It is the
 * one item that is a record instead of a channel, with nothing to click,
 * and at four times the length of the others it would break the row
 * rhythm the pattern depends on.
 *
 * `headingId` is a prop because the heading is what labels the section,
 * and two of these on one page would otherwise collide on the id.
 */
export function ContactBlock({
  headingId = "ota-yhteytta",
}: {
  headingId?: string;
}) {
  return (
    <section className={styles.block} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <h2 id={headingId} className={styles.heading}>
          Ota yhteyttä
        </h2>

        <ul className={styles.channels} role="list">
          <li>
            <a href={`mailto:${contact.email}`}>
              <ContactIcon kind="email" className={styles.icon} />
              {contact.email}
            </a>
          </li>
          <li>
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ContactIcon kind="instagram" className={styles.icon} />
              {contact.instagram}
            </a>
          </li>
          <li>
            <a
              href={contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ContactIcon kind="linkedin" className={styles.icon} />
              {contact.linkedin}
            </a>
          </li>
        </ul>

        <p className={styles.address}>
          <ContactIcon kind="location" className={styles.icon} />
          {orgFacts.name}, {orgFacts.institution}, {contact.address}
        </p>
      </div>
    </section>
  );
}
