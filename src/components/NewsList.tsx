import Image from "next/image";
import { news } from "@/lib/content";
import styles from "./NewsList.module.css";

/**
 * "Ajankohtaista" — the announcement block the reference association
 * sites lead with (image, date, headline, excerpt).
 *
 * design-system.md §8 rules out "generic repeated card grids", and this
 * is a grid of image-topped items, so it is a deliberate exception made
 * at the client's explicit request for that structure. It is kept as far
 * from a generic card as the pattern allows: no border box, no radius,
 * no shadow, no hover-lift (§6) — just a photograph, a hairline, and
 * type. If it ever grows a card chrome, it has drifted.
 */
export function NewsList() {
  return (
    <ul className={styles.list} role="list">
      {news.map((item) => (
        <li key={item.title} className={styles.item}>
          <div className={styles.frame}>
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className={styles.image}
            />
          </div>
          <time className={styles.date} dateTime={item.isoDate}>
            {item.date}
          </time>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.excerpt}>{item.excerpt}</p>
        </li>
      ))}
    </ul>
  );
}
