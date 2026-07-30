"use client";

import { useEffect, useRef, type RefObject } from "react";
import { A_MASK_CELLS } from "@/lib/aMask";
import {
  ARCHIPELAGO_COLS,
  ARCHIPELAGO_MASK,
  ARCHIPELAGO_ROWS,
} from "@/lib/archipelagoMask";
import {
  cellToPoint,
  computeARegion,
  getContractSealCells,
  getGrowthBarsCells,
  getLedgerGridCells,
  getOutlineTrace,
} from "@/lib/aRegion";
import { getSampledEdges, type Edge } from "@/lib/aEdges";
import { pinProgress } from "@/lib/scrollProgress";
import { resolveMorphState } from "@/lib/heroPinPhases";

type Dot = {
  baseX: number;
  baseY: number;
  r: number;
  isA: boolean;
  isLand: boolean;
  phase: number;
  // per-dot randomness (0..1), fixed at creation, so each morph segment
  // isn't perfectly uniform — staggers each dot's onset slightly
  morphSeed: number;
  // where this A-dot sits in each of the three discipline formations, in
  // container-pixel space — index 0 = Laskentatoimi, 1 = Rahoitus,
  // 2 = Yritysjuridiikka. Empty for non-A dots.
  morphTargets: { x: number; y: number }[];
  // transient per-frame state, written in the position pass and read by
  // the line/dot drawing passes that follow it within the same frame
  cx: number;
  cy: number;
  boost: number;
};

type Ripple = { x: number; y: number; start: number };

const AMBIENT_SPACING = 21;
const AMBIENT_RADIUS = 1.4;
const A_RADIUS = 3.1;
const INFLUENCE = 150;
const RIPPLE_LIFE = 900;
const PULSE_DURATION = 11000;
const SAMPLED_EDGES = getSampledEdges(18);
const OUTLINE_TRACE = getOutlineTrace();
const FORMATION_CELLS = [
  getLedgerGridCells(),
  getGrowthBarsCells(),
  getContractSealCells(),
];

export type HeroFieldTheme = {
  /** rgb triplet, e.g. "17, 32, 53" */
  aColor: string;
  aAlpha: number;
  /** canvas shadowBlur amount behind A dots; 0 disables the halo */
  haloBlur: number;
  haloColor: string;
  ambientColor: string;
  ambientLandAlpha: number;
  ambientWaterAlpha: number;
  showAmbient: boolean;
};

const DEFAULT_THEME: HeroFieldTheme = {
  aColor: "17, 32, 53",
  aAlpha: 0.78,
  haloBlur: 0,
  haloColor: "rgba(17, 32, 53, 0.5)",
  ambientColor: "17, 32, 53",
  ambientLandAlpha: 0.34,
  ambientWaterAlpha: 0.06,
  showAmbient: true,
};

export function HeroField({
  className,
  theme,
  showDataPath = false,
  showProximityLines = false,
  wrapperRef,
}: {
  className?: string;
  theme?: Partial<HeroFieldTheme>;
  /** A single slow pulse tracing the glyph's outline, plus a faint static guide line. */
  showDataPath?: boolean;
  /** Thin lines between a small curated set of adjacent A-dots, only while the cursor is near both. */
  showProximityLines?: boolean;
  /**
   * The pinned scroll section's own tall wrapper (see HeroPinned) — its
   * rect is what pinProgress() measures. Omit on routes that don't sit
   * inside a pinned hero (the archived concept pages): the A then just
   * stays put, no scroll listener attached, no morph.
   */
  wrapperRef?: RefObject<HTMLDivElement | null>;
}) {
  const resolvedTheme: HeroFieldTheme = { ...DEFAULT_THEME, ...theme };
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let dots: Dot[] = [];
    let aDots: Dot[] = [];
    let outlinePoints: { x: number; y: number }[] = [];
    let outlineCumLength: number[] = [];
    let outlineTotalLength = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let pointer: { x: number; y: number } | null = null;
    const ripples: Ripple[] = [];
    let raf = 0;
    // Drives the A-to-formation morph as the user scrolls through the
    // pinned hero. heroScrollTarget snaps to wherever pin progress is
    // (set by handleScroll below); heroScrollSmoothed eases toward it a
    // little every frame. Without that easing, a single big wheel/
    // trackpad scroll jumps the target in one step and the morph would
    // just teleport between two states instead of visibly happening.
    let heroScrollTarget = 0;
    let heroScrollSmoothed = 0;

    function buildDots() {
      dots = [];
      aDots = [];
      if (resolvedTheme.showAmbient) {
        const cols = Math.ceil(width / AMBIENT_SPACING) + 1;
        const rows = Math.ceil(height / AMBIENT_SPACING) + 1;
        const offsetX = (width - (cols - 1) * AMBIENT_SPACING) / 2;
        const offsetY = (height - (rows - 1) * AMBIENT_SPACING) / 2;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = offsetX + c * AMBIENT_SPACING;
            const y = offsetY + r * AMBIENT_SPACING;
            const mc = Math.min(
              ARCHIPELAGO_COLS - 1,
              Math.max(0, Math.floor((x / width) * ARCHIPELAGO_COLS)),
            );
            const mr = Math.min(
              ARCHIPELAGO_ROWS - 1,
              Math.max(0, Math.floor((y / height) * ARCHIPELAGO_ROWS)),
            );
            dots.push({
              baseX: x,
              baseY: y,
              r: AMBIENT_RADIUS,
              isA: false,
              isLand: ARCHIPELAGO_MASK[mr][mc],
              phase: Math.random() * Math.PI * 2,
              morphSeed: 0,
              morphTargets: [],
              cx: x,
              cy: y,
              boost: 0,
            });
          }
        }
      }

      const region = computeARegion(width, height);
      // Proportional index, not `i % formationPoints.length` — there are
      // more formation cells than A-dots for at least one formation, and
      // a plain modulo never wraps in that case, silently leaving the
      // tail of the shape unreachable by any dot (this bit us once
      // already with the retired arrow's converging tip). Scaling by
      // each dot's fractional position guarantees the full formation is
      // always covered.
      const formationPoints = FORMATION_CELLS.map((cells) =>
        cells.map((cell) => cellToPoint(cell.c, cell.r, region)),
      );
      A_MASK_CELLS.forEach(([c, r], i) => {
        const { x, y } = cellToPoint(c, r, region);
        const morphTargets = formationPoints.map((points) => {
          const targetIndex = Math.min(
            points.length - 1,
            Math.floor((i / A_MASK_CELLS.length) * points.length),
          );
          return points[targetIndex];
        });
        const dot: Dot = {
          baseX: x,
          baseY: y,
          r: A_RADIUS,
          isA: true,
          isLand: false,
          phase: Math.random() * Math.PI * 2,
          morphSeed: Math.random(),
          morphTargets,
          cx: x,
          cy: y,
          boost: 0,
        };
        dots.push(dot);
        aDots.push(dot);
      });

      outlinePoints = OUTLINE_TRACE.map(({ c, r }) => cellToPoint(c, r, region));
      outlineCumLength = [0];
      outlineTotalLength = 0;
      for (let i = 1; i < outlinePoints.length; i++) {
        const d = Math.hypot(
          outlinePoints[i].x - outlinePoints[i - 1].x,
          outlinePoints[i].y - outlinePoints[i - 1].y,
        );
        outlineTotalLength += d;
        outlineCumLength.push(outlineTotalLength);
      }
    }

    function pointAtT(t: number) {
      const target = t * outlineTotalLength;
      let i = 1;
      while (i < outlineCumLength.length && outlineCumLength[i] < target) i++;
      if (i >= outlinePoints.length) return outlinePoints[outlinePoints.length - 1];
      const segStart = outlineCumLength[i - 1];
      const segLen = outlineCumLength[i] - segStart || 1;
      const segT = (target - segStart) / segLen;
      const p0 = outlinePoints[i - 1];
      const p1 = outlinePoints[i];
      return {
        x: p0.x + (p1.x - p0.x) * segT,
        y: p0.y + (p1.y - p0.y) * segT,
      };
    }

    function resize() {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
    }

    // Sets dot.cx/cy to the current interpolated formation position (or
    // baseX/baseY for non-A dots, or while there's nothing to morph
    // toward). Runs BEFORE updateDotState so pointer/ripple displacement
    // below can layer on top of wherever the dot currently is, rather
    // than fighting it.
    function applyMorph(dot: Dot) {
      if (!dot.isA || dot.morphTargets.length === 0) {
        dot.cx = dot.baseX;
        dot.cy = dot.baseY;
        return;
      }
      const state = resolveMorphState(heroScrollSmoothed);
      const fromPoint =
        state.fromIndex === -1
          ? { x: dot.baseX, y: dot.baseY }
          : dot.morphTargets[state.fromIndex];
      const toPoint = dot.morphTargets[state.toIndex];
      // Staggered per-dot onset plus a smoothstep ease, so each formation
      // visibly reforms rather than the two shapes just cross-fading in
      // place.
      const onset = dot.morphSeed * 0.3;
      const local = Math.min(
        Math.max((state.blend - onset) / (1 - onset), 0),
        1,
      );
      const eased = local * local * (3 - 2 * local);
      dot.cx = fromPoint.x + (toPoint.x - fromPoint.x) * eased;
      dot.cy = fromPoint.y + (toPoint.y - fromPoint.y) * eased;
    }

    function updateDotState(dot: Dot, now: number) {
      // Proximity checks intentionally use baseX/baseY (the A's original
      // position), not the dot's current morphed position — hover still
      // targets "where the A used to be" once a formation has taken over.
      // A minor interaction nicety, not core content, so this
      // approximation is fine.
      if (pointer) {
        const dx = dot.baseX - pointer.x;
        const dy = dot.baseY - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < INFLUENCE) {
          const f = 1 - dist / INFLUENCE;
          const angle = Math.atan2(dy, dx);
          dot.cx += Math.cos(angle) * f * 9;
          dot.cy += Math.sin(angle) * f * 9;
          dot.boost = f;
          return;
        }
      }

      for (const ripple of ripples) {
        const age = now - ripple.start;
        if (age > RIPPLE_LIFE) continue;
        const dx = dot.baseX - ripple.x;
        const dy = dot.baseY - ripple.y;
        const dist = Math.hypot(dx, dy);
        const wave = (age / RIPPLE_LIFE) * 260;
        const band = 46;
        const d = Math.abs(dist - wave);
        if (d < band) {
          const f = (1 - d / band) * (1 - age / RIPPLE_LIFE);
          const angle = Math.atan2(dy, dx);
          dot.cx += Math.cos(angle) * f * 12;
          dot.cy += Math.sin(angle) * f * 12;
          dot.boost = f * 0.8;
          return;
        }
      }

      dot.boost = 0;
    }

    function drawDot(dot: Dot, now: number) {
      if (!ctx) return;
      const boost = dot.boost;
      const breathe = prefersReduced
        ? 1
        : 1 + 0.1 * Math.sin(now * 0.0006 + dot.phase);
      const landFactor = dot.isLand ? 1.55 : 0.75;
      const radius = dot.r * breathe * (1 + boost * 0.85) * (dot.isA ? 1 : landFactor);
      const baseAlpha = dot.isA
        ? resolvedTheme.aAlpha
        : dot.isLand
          ? resolvedTheme.ambientLandAlpha
          : resolvedTheme.ambientWaterAlpha;
      const alpha = Math.min(1, baseAlpha + boost * (dot.isA ? 0.2 : 0.45));
      const color = dot.isA ? resolvedTheme.aColor : resolvedTheme.ambientColor;
      ctx.beginPath();
      if (dot.isA && resolvedTheme.haloBlur > 0) {
        ctx.shadowBlur = resolvedTheme.haloBlur;
        ctx.shadowColor = resolvedTheme.haloColor;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.fillStyle = `rgba(${color}, ${alpha})`;
      ctx.arc(dot.cx, dot.cy, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawOutlineGuide() {
      if (!ctx || outlinePoints.length < 2) return;
      ctx.save();
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.moveTo(outlinePoints[0].x, outlinePoints[0].y);
      for (let i = 1; i < outlinePoints.length; i++) {
        ctx.lineTo(outlinePoints[i].x, outlinePoints[i].y);
      }
      ctx.strokeStyle = `rgba(${resolvedTheme.aColor}, 0.14)`;
      ctx.lineWidth = 0.75;
      ctx.stroke();
      ctx.restore();
    }

    function drawPulse(now: number) {
      if (!ctx || outlineTotalLength === 0) return;
      const t = (now % PULSE_DURATION) / PULSE_DURATION;
      ctx.save();
      ctx.shadowBlur = 0;
      for (let i = 0; i < 5; i++) {
        const echoT = ((t - i * 0.012) % 1 + 1) % 1;
        const p = pointAtT(echoT);
        const alpha = 0.55 * (1 - i / 5);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${resolvedTheme.aColor}, ${alpha.toFixed(3)})`;
        ctx.arc(p.x, p.y, 2.6 - i * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function drawProximityLines() {
      if (!ctx || SAMPLED_EDGES.length === 0) return;
      ctx.save();
      ctx.shadowBlur = 0;
      for (const edge of SAMPLED_EDGES as Edge[]) {
        const a = aDots[edge.a];
        const b = aDots[edge.b];
        if (!a || !b) continue;
        const strength = Math.min(a.boost, b.boost);
        if (strength <= 0.02) continue;
        ctx.beginPath();
        ctx.moveTo(a.cx, a.cy);
        ctx.lineTo(b.cx, b.cy);
        ctx.strokeStyle = `rgba(${resolvedTheme.aColor}, ${(strength * 0.6).toFixed(3)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      ctx.restore();
    }

    function draw(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const now = t;
      heroScrollSmoothed += (heroScrollTarget - heroScrollSmoothed) * 0.18;

      for (const dot of dots) {
        applyMorph(dot);
        updateDotState(dot, now);
      }

      // The outline guide and pulse trace the A's original silhouette,
      // which only still matches the dots during the hold-as-A phase and
      // the morph into Formation 1 — fade both out over that window (not
      // the whole sequence) so they never look disconnected from what
      // the dots are actually doing once a formation has taken over.
      const morphState = resolveMorphState(heroScrollSmoothed);
      const outlineFade = morphState.fromIndex === -1 ? 1 - morphState.blend : 0;
      if (showDataPath) {
        ctx.save();
        ctx.globalAlpha = outlineFade;
        drawOutlineGuide();
        ctx.restore();
      }
      if (showProximityLines) drawProximityLines();

      for (const dot of dots) {
        drawDot(dot, now);
      }

      if (showDataPath && !prefersReduced) {
        ctx.save();
        ctx.globalAlpha = outlineFade;
        drawPulse(now);
        ctx.restore();
      }

      while (ripples.length && now - ripples[0].start > RIPPLE_LIFE) {
        ripples.shift();
      }
    }

    function loop(t: number) {
      draw(t);
      raf = requestAnimationFrame(loop);
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function handlePointerLeave() {
      pointer = null;
    }

    function handlePointerDown(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        start: performance.now(),
      });
    }

    // Plain scroll listener (sets the target the draw loop eases toward)
    // rather than requestAnimationFrame — see HeroScrollFade for why:
    // it's one cheap read per event, and it isn't throttled to zero in a
    // backgrounded tab the way rAF is.
    function handleScroll() {
      if (!wrapperRef?.current) return;
      heroScrollTarget = pinProgress(
        wrapperRef.current.getBoundingClientRect(),
        window.innerHeight,
      );
    }

    // Reassigning canvas.width inside resize() wipes the canvas. Under
    // normal motion the rAF loop repaints on the next frame so that's
    // invisible, but under reduced motion there is no loop — so without
    // this explicit repaint the hero goes permanently blank after any
    // resize. ResizeObserver also fires once on its own right after
    // mount, which raced the initial draw(0) below and could blank the
    // canvas immediately on load.
    const ro = new ResizeObserver(() => {
      resize();
      if (prefersReduced) draw(0);
    });
    ro.observe(container);
    resize();

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    container.addEventListener("pointerdown", handlePointerDown);
    if (!prefersReduced && wrapperRef) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    if (prefersReduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("scroll", handleScroll);
    };
    // theme/showDataPath/showProximityLines/wrapperRef are read once to
    // seed the canvas system on mount; they aren't meant to change during
    // this component's lifetime for our usage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
