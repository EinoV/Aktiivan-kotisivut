"use client";

import { useSyncExternalStore } from "react";

function subscribeToBreakpoint(breakpoint: number) {
  return (callback: () => void) => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    mq.addEventListener("change", callback);
    return () => mq.removeEventListener("change", callback);
  };
}

/** SSR-safe (defaults to false server-side), hydration-safe viewport check. */
export function useIsMobile(breakpoint = 640) {
  return useSyncExternalStore(
    subscribeToBreakpoint(breakpoint),
    () => window.matchMedia(`(max-width: ${breakpoint}px)`).matches,
    () => false,
  );
}
