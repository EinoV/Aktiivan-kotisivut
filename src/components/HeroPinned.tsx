"use client";

import { useEffect, useRef, useState } from "react";
import { HeroArchipelago } from "@/components/HeroArchipelago";
import { HeroField } from "@/components/HeroField";
import { HeroPhaseLabel } from "@/components/HeroPhaseLabel";
import { HeroScrollFade } from "@/components/HeroScrollFade";
import { SiteNav } from "@/components/SiteNav";
import { pinProgress } from "@/lib/scrollProgress";
import styles from "./HeroPinned.module.css";

/**
 * The pinned hero: a tall wrapper (.heroPinOuter) around a sticky inner
 * hero (.heroWrap, unchanged visually from before). As the user scrolls
 * through the wrapper's extra height, the hero stays visually in place —
 * scrolling drives HeroField's dot-formation morph and HeroPhaseLabel's
 * text crossfade without the page itself moving — until the wrapper's
 * height is exhausted and it un-pins, releasing into .heroTransition and
 * the rest of the page exactly as a normal element would.
 *
 * Owns the one shared `progress` measurement (see pinProgress()) that
 * HeroScrollFade and HeroPhaseLabel both need — HeroField tracks the same
 * rect independently, with its own per-frame easing, since that's a
 * canvas-specific need this component doesn't share.
 */
export function HeroPinned() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    function update() {
      if (!wrapperRef.current) return;
      setProgress(
        pinProgress(wrapperRef.current.getBoundingClientRect(), window.innerHeight),
      );
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div ref={wrapperRef} className={styles.heroPinOuter}>
      <div className={styles.heroWrap}>
        <HeroScrollFade progress={progress} />
        <HeroArchipelago
          className={styles.heroArchipelago}
          src="/photos/archipelago-variant-b.jpg"
          backgroundPosition="46% 38%"
          srcMobile="/photos/archipelago-variant-b-mobile.jpg"
          backgroundPositionMobile="center 30%"
          filter="none"
          overlayOpacity={0}
          bottomScrim
          topScrim
        />
        <div className={styles.heroScrollDarken} />
        <HeroField
          className={styles.heroField}
          showDataPath
          showProximityLines
          wrapperRef={wrapperRef}
          theme={{
            aColor: "232, 236, 240",
            aAlpha: 1,
            haloBlur: 6,
            haloColor: "rgba(10, 18, 32, 0.55)",
            showAmbient: false,
          }}
        />
        <div className={styles.heroBottomFade} />
        <div className={styles.heroOverlay}>
          <SiteNav tone="onDark" />
          <HeroPhaseLabel progress={progress} />
        </div>
      </div>
    </div>
  );
}
