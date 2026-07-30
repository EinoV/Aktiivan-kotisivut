import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
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
      />

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>Nykyiset kumppanit</h2>
        </div>
        {partnerTiers.map((tier) => {
          const names = partners.filter((p) => p.tier === tier);
          if (names.length === 0) return null;
          return (
            <div key={tier} className={styles.tier}>
              <span className={styles.tierLabel}>{tier}</span>
              <div className={styles.tierNames}>
                {names.map((p) => (
                  <span key={p.name}>{p.name}</span>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>Mitä kumppanuus sisältää</h2>
        </div>
        <ul className={styles.rows}>
          {partnerBenefits.map((b) => (
            <li key={b.title} className={styles.row}>
              <h3 className={styles.rowLabel}>{b.title}</h3>
              <p className={styles.rowBody}>{b.body}</p>
            </li>
          ))}
        </ul>
        <p className={styles.cta}>
          Kiinnostuitteko? Yrityssuhdevastaavamme kertoo mielellään lisää —
          löydät yhteystiedot <Link href="/hallitus">hallitussivulta</Link>{" "}
          tai <Link href="/yhteystiedot">yhteystiedoista</Link>.
        </p>
      </section>
    </>
  );
}
