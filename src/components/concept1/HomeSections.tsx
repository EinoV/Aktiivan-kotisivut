import type { ReactNode } from "react";
import Image from "next/image";
import { AktiivaLogo } from "@/components/AktiivaLogo";
import { ContactBlock } from "@/components/ContactBlock";
import { LogoBand } from "@/components/LogoBand";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { audiences } from "@/lib/content";
import styles from "./HomeSections.module.css";

/**
 * `audiencesVariant` exists so the live homepage can run the audience
 * block as a navy feature with photographs while /concept-1b and
 * /concept-1b-a — which render this same component — keep the all-paper
 * text page they were drawn as. They are design history; restyling them
 * retroactively would rewrite it.
 *
 * "feature" is one editorial treatment, not two settings: the navy ground
 * and the alternating half-width photographs only work together. The
 * label/heading/body markup is shared by both variants, because that
 * change improves either equally.
 */
export function HomeSections({
  footerNote,
  audiencesVariant = "plain",
  closing = "footer",
  logoBand = false,
}: {
  footerNote?: ReactNode;
  audiencesVariant?: "plain" | "feature";
  /** How the page ends. The live homepage closes on ContactBlock like
   *  every subpage does; the archived /concept-* routes keep the footer,
   *  which is also where their third-party attribution lives. */
  closing?: "footer" | "contact";
  /** A band of --paper carrying nothing but the navy mark, between the
   *  audience block and the closing. Both of those are navy, so without
   *  it the page runs dark from the audiences all the way to the bottom. */
  logoBand?: boolean;
}) {
  return (
    <>
      <Reveal>
        <section id="aktiiva" className={styles.intro}>
          <p>
            Aktiiva ry on Turun kauppakorkeakoulun laskentatoimen,
            rahoituksen ja yritysjuridiikan opiskelijoiden ainejärjestö.
            Tavoitteenamme on tukea opiskelijoitamme opinnoissa sekä
            rakentaa tiivistä yhteisöä opiskelijoiden, yritysmaailman ja
            alumnien välille. Järjestämme lukuvuoden aikana excursioita ja
            muita tapahtumia, jotka mahdollistavat merkityksellisten
            kontaktien luomisen ja pitkäaikaisten yhteistyösuhteiden
            syntymisen.
          </p>
        </section>
      </Reveal>

      <section
        className={`${styles.audiences} ${
          audiencesVariant === "feature" ? styles.audiencesFeature : ""
        }`}
      >
        <ul className={styles.audienceList}>
          {audiences.map((a, i) => (
            /* Per row, not per section: the block is 1500px tall, so one
               fade for the whole thing would already be over by the time
               the last row is on screen. */
            <Reveal
              key={a.id}
              as="li"
              className={styles.audienceRow}
              delay={i * 80}
            >
              {audiencesVariant === "feature" && (
                <div className={styles.audienceMedia}>
                  <Image
                    src={a.image}
                    alt={a.imageAlt}
                    fill
                    sizes="(max-width: 720px) 100vw, 45vw"
                    className={styles.audienceImage}
                  />
                </div>
              )}
              <div className={styles.audienceText}>
                <p className={styles.audienceLabel}>{a.label}</p>
                {/* content.ts has carried a `heading` for each audience all
                    along and nothing rendered it. Three written headlines
                    were sitting unused while this section showed three
                    bare paragraphs. */}
                <h3 className={styles.audienceHeading}>{a.heading}</h3>
                <p className={styles.audienceBody}>{a.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {logoBand && (
        <Reveal delay={100}>
          <LogoBand />
        </Reveal>
      )}

      {closing === "contact" ? (
        <Reveal>
          <ContactBlock />
        </Reveal>
      ) : (
        <SiteFooter note={footerNote} />
      )}
    </>
  );
}
