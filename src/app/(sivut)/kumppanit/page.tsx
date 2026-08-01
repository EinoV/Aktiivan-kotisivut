import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PhotoBand } from "@/components/PhotoBand";
import { partnerBenefits, partners } from "@/lib/content";
import styles from "../sivut.module.css";

const partnerTiers = [
  "Pääyhteistyökumppani",
  "Yhteistyökumppani",
  "Tapahtumakumppani",
] as const;

export const metadata = {
  title: "Kumppanit — Aktiiva ry",
  description:
    "Aktiiva ry:n yhteistyökumppanit sekä tiedot kumppanuudesta laskentatoimen, rahoituksen ja yritysjuridiikan opiskelijoiden ainejärjestön kanssa.",
};

export default function KumppanitPage() {
  return (
    <>
      <PageHeader
        eyebrow="Yhteistyö"
        title="Kumppanit"
        lead="Kumppanimme tekevät toiminnan mahdolliseksi — ja tapaavat samalla ne opiskelijat, jotka suuntaavat heidän alansa tehtäviin. Yhteistyö räätälöidään aina yhdessä."
        motif="ledger"
      />

      <PhotoBand
        src="/photos/turku-aerial-wide.jpg"
        alt="Ilmakuva Turun keskustasta, Aurajoki ja tuomiokirkko näkyvissä."
        caption="Turku — jäsentemme opiskelu- ja usein myös ensimmäinen työpaikkakaupunki."
        priority
      />

      <section className={styles.gridSection} aria-labelledby="nykyiset">
        <div className={styles.gridAside}>
          <h2 id="nykyiset" className={styles.h2}>
            Nykyiset kumppanit
          </h2>
          <span className={styles.asideNote}>
            Yhteistyön taso määrittää näkyvyyden laajuuden.
          </span>
        </div>
        <div>
          {partnerTiers.map((tier, i) => {
            const names = partners.filter((p) => p.tier === tier);
            if (names.length === 0) return null;
            return (
              <div
                key={tier}
                /* Explicit class for the top tier — see the note on
                   .tierPrimary in sivut.module.css. */
                className={
                  i === 0 ? `${styles.tier} ${styles.tierPrimary}` : styles.tier
                }
              >
                <span className={styles.tierLabel}>{tier}</span>
                <div className={styles.tierNames}>
                  {names.map((p) => (
                    <span key={p.name}>{p.name}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.gridSection} aria-labelledby="sisaltaa">
        <div className={styles.gridAside}>
          <h2 id="sisaltaa" className={styles.h2}>
            Mitä kumppanuus sisältää
          </h2>
        </div>
        <ul className={styles.rows} role="list">
          {partnerBenefits.map((b) => (
            <li key={b.title} className={styles.row}>
              <h3 className={styles.rowLabel}>{b.title}</h3>
              <p className={styles.rowBody}>{b.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* The one inverted band on the whole subsite — see .invertBand. */}
      <section className={styles.invertBand} aria-labelledby="kumppaniksi">
        <div className={styles.invertInner}>
          <h2 id="kumppaniksi" className={styles.invertTitle}>
            Tule kumppaniksi
          </h2>
          <p className={styles.invertBody}>
            Kerromme mielellään, miltä yhteistyö voisi näyttää juuri teidän
            kohdallanne. Yrityssuhdevastaavamme vastaa yhteydenottoihin.
          </p>
          <div className={styles.actionRow}>
            <a
              className={styles.actionInverse}
              href="mailto:yritys@aktiivary.fi"
            >
              Ota yhteyttä
            </a>
            <Link className={styles.actionInverse} href="/hallitus">
              Hallituksen yhteystiedot
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
