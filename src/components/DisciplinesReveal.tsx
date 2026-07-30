"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./DisciplinesReveal.module.css";

const DISCIPLINES = ["Laskentatoimi", "Rahoitus", "Yritysjuridiikka"] as const;

export function DisciplinesReveal() {
  const kickerRef = useRef<HTMLParagraphElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [kickerVisible, setKickerVisible] = useState(false);
  const [visible, setVisible] = useState<boolean[]>(() =>
    DISCIPLINES.map(() => false),
  );

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Under reduced motion the CSS shows everything immediately, so the
    // observers (which only exist to drive the staggered fade-in) are
    // skipped entirely rather than setting state synchronously here.
    if (prefersReduced) return;

    const observers: IntersectionObserver[] = [];

    if (kickerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          setKickerVisible(true);
          observer.disconnect();
        },
        { threshold: 0.5, rootMargin: "0px 0px -15% 0px" },
      );
      observer.observe(kickerRef.current);
      observers.push(observer);
    }

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          setVisible((prev) => {
            if (prev[i]) return prev;
            const next = [...prev];
            next[i] = true;
            return next;
          });
          observer.disconnect();
        },
        { threshold: 0.5, rootMargin: "0px 0px -15% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className={styles.section} aria-label="Pääaineet">
      <div className={styles.dotAxes} aria-hidden="true">
        <span className={styles.dotAxis} style={{ left: "38%" }} />
        <span className={styles.dotAxis} style={{ left: "50%" }} />
        <span className={styles.dotAxis} style={{ left: "62%" }} />
      </div>

      <p ref={kickerRef} className={styles.kicker} data-visible={kickerVisible}>
        Kolme opintosuuntaa
      </p>
      <ul className={styles.list}>
        {DISCIPLINES.map((name, i) => (
          <li
            key={name}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={styles.item}
            data-visible={visible[i]}
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
