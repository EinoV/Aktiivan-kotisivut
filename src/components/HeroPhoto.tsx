"use client";

import { useEffect, useRef } from "react";

const MAX_SHIFT = 7;

export function HeroPhoto({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const photo = photoRef.current;
    if (!wrap || !photo) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    function handlePointerMove(e: PointerEvent) {
      const rect = wrap!.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      photo!.style.transform = `translate(${(-nx * MAX_SHIFT * 2).toFixed(2)}px, ${(-ny * MAX_SHIFT * 2).toFixed(2)}px) scale(1.06)`;
    }

    function handlePointerLeave() {
      photo!.style.transform = "translate(0px, 0px) scale(1.06)";
    }

    wrap.addEventListener("pointermove", handlePointerMove);
    wrap.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      wrap.removeEventListener("pointermove", handlePointerMove);
      wrap.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      <div
        ref={photoRef}
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: "url(/photos/kupittaa-architecture.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 62%",
          transform: "scale(1.06)",
          transition: "transform 0.35s ease-out",
          WebkitMaskImage: "url(/logo/aktiiva-a-symbol-navy.png)",
          maskImage: "url(/logo/aktiiva-a-symbol-navy.png)",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    </div>
  );
}
