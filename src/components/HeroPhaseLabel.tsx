"use client";

import { orgFacts } from "@/lib/content";
import { labelOpacity } from "@/lib/heroPinPhases";
import styles from "./HeroPhaseLabel.module.css";

/**
 * The "Laskentatoimi" / "Rahoitus" / "Yritysjuridiikka" labels crossfading
 * in the hero as HeroField's dots morph through the matching formation —
 * driven by the exact same heroPinPhases.ts boundaries HeroField uses, so
 * the two can never visually disagree. Prop-driven (no scroll listener of
 * its own): cheap enough, unlike the canvas, that React-state-driven
 * re-renders are fine.
 *
 * Real DOM text at all times, not gated behind JS/animation — a screen
 * reader encounters all three regardless of which one is currently
 * visually foregrounded. Hidden entirely under prefers-reduced-motion
 * (see the CSS module): DisciplinesReveal is the static fallback there.
 */
export function HeroPhaseLabel({ progress }: { progress: number }) {
  return (
    <div className={styles.wrap}>
      {orgFacts.fields.map((name, i) => {
        const opacity = labelOpacity(progress, i as 0 | 1 | 2);
        return (
          <p
            key={name}
            className={styles.label}
            style={{
              opacity,
              transform: `translateY(${(1 - opacity) * 14}px)`,
            }}
          >
            {name}
          </p>
        );
      })}
    </div>
  );
}
