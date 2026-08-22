import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PhotoBand } from "@/components/PhotoBand";
import { contact, orgFacts } from "@/lib/content";
import styles from "../sivut.module.css";

export const metadata = {
  title: "Yhteystiedot — Aktiiva ry",
  description:
    "Aktiiva ry:n yhteystiedot: sähköposti, sosiaalinen media ja postiosoite Turun kauppakorkeakoululla.",
};

export default function YhteystiedotPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ota yhteyttä"
        title="Yhteystiedot"
        lead="Yleiset asiat hallituksen sähköpostiin. Yksittäistä vastuualuetta koskevat viestit menevät nopeimmin perille suoraan oikealle hallituslaiselle."
        motif="a"
      />

      <section className={styles.section} aria-label="Yhteystiedot">
        <div className={styles.contactGrid}>
          <div>
            <span className={styles.contactLabel}>Sähköposti</span>
            <p className={styles.contactValue}>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          </div>
          <div>
            <span className={styles.contactLabel}>Instagram</span>
            <p className={styles.contactValue}>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.instagram}
              </a>
            </p>
          </div>
          <div>
            <span className={styles.contactLabel}>LinkedIn</span>
            <p className={styles.contactValue}>
              <a
                href={contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.linkedin}
              </a>
            </p>
          </div>
          <div>
            <span className={styles.contactLabel}>Postiosoite</span>
            <p className={styles.contactValue}>
              {orgFacts.name}
              <br />
              {orgFacts.institution}
              <br />
              {contact.address}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.gridSection} aria-labelledby="kenelle">
        <div className={styles.gridAside}>
          <h2 id="kenelle" className={styles.h2}>
            Kenelle kirjoittaa
          </h2>
          <span className={styles.asideNote}>
            Vastuualueiden osoitteet löytyvät hallitussivulta.
          </span>
        </div>
        <div>
          <ul className={styles.rows} role="list">
            <li className={styles.row}>
              <h3 className={styles.rowLabel}>Yhteistyö ja rekrytointi</h3>
              <p className={styles.rowBody}>
                Kumppanuudet, excursiot ja työpaikkailmoitukset hoituvat
                yrityssuhdevastaavan kautta.
              </p>
            </li>
            <li className={styles.row}>
              <h3 className={styles.rowLabel}>Opintoasiat</h3>
              <p className={styles.rowBody}>
                Kurssipalaute ja edunvalvonta opintovastaavalle — hän vie
                asian eteenpäin tiedekuntaan.
              </p>
            </li>
            <li className={styles.row}>
              <h3 className={styles.rowLabel}>Jäsenyys</h3>
              <p className={styles.rowBody}>
                Jäsenmaksut ja jäsenrekisteri kuuluvat rahastonhoitajalle.
                Kaikkien vastuualueiden osoitteet löytyvät{" "}
                <Link href="/hallitus">hallitussivulta</Link>.
              </p>
            </li>
          </ul>
          <div className={styles.actionRow}>
            <a className={styles.action} href={`mailto:${contact.email}`}>
              Lähetä sähköpostia
            </a>
            <Link className={styles.action} href="/hallitus">
              Hallituksen yhteystiedot
            </Link>
          </div>
        </div>
      </section>

      {/* Closing image rather than a header band — the other pages open
          with theirs, and repeating that on all five would put the
          structural monotony straight back. */}
      <PhotoBand
        src="/photos/tse-facade-wide.jpg"
        alt="Turun kauppakorkeakoulun julkisivu lähikuvassa."
        caption="Löydät meidät Turun kauppakorkeakoululta, Rehtorinpellonkadulta."
      />
    </>
  );
}
