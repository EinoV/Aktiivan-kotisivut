"use client";

import { useEffect } from "react";

/**
 * Writes a single CSS custom property (--hero-scroll, 0..1) so the hero
 * photo can darken in sync with the rest of the pinned sequence — see
 * .heroScrollDarken in HeroPinned.module.css. Prop-driven rather than
 * tracking scroll itself: HeroPinned already measures pin progress (via
 * pinProgress()) for HeroPhaseLabel, and duplicating that formula here
 * would just be duplicating knowledge, not preserving separation of
 * concerns, now that both want the exact same measurement.
 */
export function HeroScrollFade({ progress }: { progress: number }) {
  useEffect(() => {
    document.documentElement.style.setProperty("--hero-scroll", progress.toFixed(3));
  }, [progress]);

  useEffect(() => {
    return () => {
      document.documentElement.style.removeProperty("--hero-scroll");
    };
  }, []);

  return null;
}
