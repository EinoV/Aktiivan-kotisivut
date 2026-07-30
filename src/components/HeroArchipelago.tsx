"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/lib/useIsMobile";
import styles from "./HeroArchipelago.module.css";

const MAX_SHIFT = 5;
const DEFAULT_MOBILE_BREAKPOINT = 640;

type Props = {
  src: string;
  backgroundPosition?: string;
  srcMobile?: string;
  backgroundPositionMobile?: string;
  mobileBreakpoint?: number;
  filter?: string;
  overlayOpacity?: number;
  bottomScrim?: boolean;
  topScrim?: boolean;
  className?: string;
};

export function HeroArchipelago({
  src,
  backgroundPosition = "center center",
  srcMobile,
  backgroundPositionMobile,
  mobileBreakpoint = DEFAULT_MOBILE_BREAKPOINT,
  filter = "saturate(0.85) contrast(1) brightness(1)",
  overlayOpacity = 0.24,
  bottomScrim = true,
  topScrim = false,
  className,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(mobileBreakpoint);

  useEffect(() => {
    const wrap = wrapRef.current;
    const layer = parallaxRef.current;
    if (!wrap || !layer) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || coarsePointer) return;

    function handlePointerMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      const rect = wrap!.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      layer!.style.transform = `translate(${(-nx * MAX_SHIFT * 2).toFixed(2)}px, ${(-ny * MAX_SHIFT * 2).toFixed(2)}px)`;
    }

    function handlePointerLeave() {
      layer!.style.transform = "translate(0px, 0px)";
    }

    wrap.addEventListener("pointermove", handlePointerMove);
    wrap.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      wrap.removeEventListener("pointermove", handlePointerMove);
      wrap.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  const activeSrc = isMobile && srcMobile ? srcMobile : src;
  const activePosition =
    isMobile && backgroundPositionMobile
      ? backgroundPositionMobile
      : backgroundPosition;

  return (
    <div ref={wrapRef} className={className}>
      <div className={styles.animLayer}>
        <div
          ref={parallaxRef}
          className={styles.parallaxLayer}
          style={{
            backgroundImage: `url(${activeSrc})`,
            backgroundPosition: activePosition,
            backgroundSize: "cover",
            filter,
          }}
        />
      </div>
      <div className={styles.overlay} style={{ opacity: overlayOpacity }} />
      {bottomScrim && <div className={styles.bottomScrim} />}
      {topScrim && <div className={styles.topScrim} />}
    </div>
  );
}
