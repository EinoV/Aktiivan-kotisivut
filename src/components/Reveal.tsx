"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades its children in when they first scroll into view — the effect
 * aalto.finance runs across its pages.
 *
 * Measured there rather than guessed: opacity 0 → 1 over 0.9s, with a
 * small index-based delay between neighbours, and **no movement at all**.
 * A rise would read well too, but they deliberately don't, and a fade
 * alone is the quieter choice for a site whose register is this reserved.
 *
 * The styling lives in globals.css keyed off `data-reveal`, not in a CSS
 * module. That is what lets the <noscript> block in the root layout
 * un-hide everything with one rule: a hashed module class could not be
 * targeted from there, and content that stays invisible when JS fails is
 * a far worse outcome than content that simply doesn't fade.
 *
 * Fires once and disconnects. Nothing re-hides on scroll back up — an
 * element that fades out again as you leave it is a distraction, not a
 * transition.
 */
/**
 * Every revealed block waits this long after crossing the threshold before
 * it begins to fade.
 *
 * Without it the fade started on the same frame the observer fired, and
 * because the rootMargin below means that happens when the block is
 * already well inside the viewport, it read as the content arriving and
 * *then* animating rather than as an entrance. A short beat first is what
 * makes it feel deliberate.
 *
 * Added to each instance's own `delay` rather than replacing it, so a
 * stagger still staggers: the three audience rows land at 120 / 200 /
 * 280ms instead of 0 / 80 / 160.
 */
const BASE_DELAY = 120;

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  /** Extra milliseconds *on top of* BASE_DELAY. Use to stagger
   *  siblings; ~80ms between neighbours reads as a sequence. */
  delay?: number;
  className?: string;
  /** "li" so a list row can reveal itself without an invalid <div> inside
   *  a <ul>, and without a wrapper that would break the row's grid. */
  as?: "div" | "li";
}) {
  // A callback ref rather than useRef<HTMLDivElement>: the same ref has to
  // serve two element types, and this avoids casting either of them.
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // No reduced-motion branch here on purpose. globals.css already forces
    // [data-reveal] to opacity 1 under that query, so those readers see
    // everything regardless of whether this ever fires — and checking the
    // query here would mean calling setState synchronously inside an
    // effect, which triggers a cascading render.
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      // The bottom inset means a block has to be properly on screen, not
      // just clipping the edge, before it starts — otherwise everything
      // has already faded by the time you look at it.
      { threshold: 0.12, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const props = {
    ref: (el: HTMLElement | null) => {
      ref.current = el;
    },
    className,
    "data-reveal": shown ? "true" : "false",
    style: { transitionDelay: `${BASE_DELAY + delay}ms` },
  };

  return as === "li" ? <li {...props}>{children}</li> : <div {...props}>{children}</div>;
}
