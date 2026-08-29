import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { audiences } from "@/lib/content";
import styles from "./HomeSections.module.css";

export function HomeSections({ footerNote }: { footerNote: ReactNode }) {
  return (
    <>
      <section id="aktiiva" className={styles.intro}>
        <p>
          Aktiiva ry on Turun kauppakorkeakoulun laskentatoimen, rahoituksen
          ja yritysjuridiikan opiskelijoiden ainejärjestö. Tavoitteenamme on
          tukea opiskelijoitamme opinnoissa sekä rakentaa tiivistä yhteisöä
          opiskelijoiden, yritysmaailman ja alumnien välille. Järjestämme
          lukuvuoden aikana excursioita ja muita tapahtumia, jotka
          mahdollistavat merkityksellisten kontaktien luomisen ja
          pitkäaikaisten yhteistyösuhteiden syntymisen.
        </p>
      </section>

      <section className={styles.audiences}>
        <ul className={styles.audienceList}>
          {audiences.map((a) => (
            <li key={a.id} className={styles.audienceRow}>
              <h3>{a.label}</h3>
              <p>{a.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="kumppanit" className={styles.partners}>
        <div className={styles.jobsHead}>
          <h2>Kumppanit</h2>
        </div>
        <p>Etsimme tällä hetkellä yrityksiä yhteistyökumppaneiksimme.</p>
      </section>

      <SiteFooter note={footerNote} />
    </>
  );
}
