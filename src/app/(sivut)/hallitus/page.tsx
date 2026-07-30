import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { board } from "@/lib/content";
import styles from "../sivut.module.css";

export const metadata = {
  title: "Hallitus — Aktiiva ry",
  description:
    "Aktiiva ry:n hallitus, vastuualueet ja yhteystiedot. Hallitus valitaan vuosittain syyskokouksessa.",
};

export default function HallitusPage() {
  return (
    <>
      <PageHeader
        eyebrow="Toimikausi 2026"
        title="Hallitus"
        lead="Hallitus valitaan vuosittain syyskokouksessa, ja se vastaa Aktiivan toiminnasta kokonaisuudessaan. Kaikkiin alla oleviin voi olla suoraan yhteydessä oman vastuualueensa asioissa."
      />

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>Jäsenet</h2>
          <span className={styles.headNote}>{board.length} jäsentä</span>
        </div>
        <ul className={styles.rows}>
          {board.map((m) => (
            <li key={m.role} className={styles.boardRow}>
              <h3 className={styles.boardRole}>{m.role}</h3>
              <div>
                <span className={styles.boardName}>{m.name}</span>
                <a href={`mailto:${m.email}`} className={styles.boardEmail}>
                  {m.email}
                </a>
              </div>
              <p className={styles.boardRemit}>{m.remit}</p>
            </li>
          ))}
        </ul>
        <p className={styles.cta}>
          Hallitustoiminta on avointa kaikille jäsenille — ehdolle voi asettua
          syyskokouksessa ilman aiempaa kokemusta. Lue lisää{" "}
          <Link href="/aktiiva">Aktiivasta</Link>.
        </p>
      </section>
    </>
  );
}
