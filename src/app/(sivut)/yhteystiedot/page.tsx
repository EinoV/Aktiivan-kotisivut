import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
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
      />

      <section className={styles.section}>
        <div className={styles.contactGrid}>
          <div>
            <span className={styles.contactLabel}>Sähköposti</span>
            <p className={styles.contactValue}>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          </div>
          <div>
            <span className={styles.contactLabel}>Instagram</span>
            <p className={styles.contactValue}>{contact.instagram}</p>
          </div>
          <div>
            <span className={styles.contactLabel}>LinkedIn</span>
            <p className={styles.contactValue}>{contact.linkedin}</p>
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

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>Kenelle kirjoittaa</h2>
        </div>
        <ul className={styles.rows}>
          <li className={styles.row}>
            <h3 className={styles.rowLabel}>Yhteistyö ja rekrytointi</h3>
            <p className={styles.rowBody}>
              Kumppanuudet, excursiot ja työpaikkailmoitukset hoituvat
              yrityssuhdevastaavan kautta. Ks.{" "}
              <Link href="/kumppanit">kumppanuus</Link>.
            </p>
          </li>
          <li className={styles.row}>
            <h3 className={styles.rowLabel}>Opintoasiat</h3>
            <p className={styles.rowBody}>
              Kurssipalaute ja edunvalvonta opintovastaavalle — hän vie asian
              eteenpäin tiedekuntaan.
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
      </section>
    </>
  );
}
