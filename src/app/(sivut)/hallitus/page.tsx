import { PageHeader } from "@/components/PageHeader";
import { PhotoBand } from "@/components/PhotoBand";
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
        title="Hallitus"
        lead="Hallitus valitaan vuosittain syyskokouksessa, ja se vastaa Aktiivan toiminnasta kokonaisuudessaan. Kaikkiin alla oleviin voi olla suoraan yhteydessä oman vastuualueensa asioissa."
        motif="a"
      />

      <PhotoBand
        src="/photos/afters.jpg"
        alt="Yleisöä ja paneelikeskustelu luentosalissa."
        priority
        tallest
        cropBottom
        narrow
      />

      <section className={styles.section} aria-labelledby="jasenet">
        <div className={styles.sectionHead}>
          <h2 id="jasenet" className={styles.h2}>
            Hallitus
          </h2>
        </div>
        <ul className={styles.rows} role="list">
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
      </section>
    </>
  );
}
