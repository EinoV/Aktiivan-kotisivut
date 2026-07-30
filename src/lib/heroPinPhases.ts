// Single source of truth for how the pinned hero's 0..1 progress maps to
// "what's happening" — imported by both HeroField (dot positions) and
// HeroPhaseLabel (text crossfades) so the two can never disagree about
// timing. See design-system.md for the full phase table.

export type PhaseRange = readonly [number, number];

export const HOLD_A: PhaseRange = [0, 0.06];
export const MORPH_TO_1: PhaseRange = [0.06, 0.2];
export const HOLD_1: PhaseRange = [0.2, 0.38];
export const MORPH_TO_2: PhaseRange = [0.38, 0.52];
export const HOLD_2: PhaseRange = [0.52, 0.7];
export const MORPH_TO_3: PhaseRange = [0.7, 0.84];
export const HOLD_3: PhaseRange = [0.84, 1];

/** Classic smoothstep, clamped outside [edge0, edge1]. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

export type MorphState = {
  /** -1 means "the A itself" (dot.baseX/baseY), not a formation index. */
  fromIndex: -1 | 0 | 1;
  toIndex: 0 | 1 | 2;
  /** Raw linear 0..1 within the active segment — NOT eased. HeroField
   * applies its own per-dot staggered smoothstep on top of this, the same
   * pattern used for every morph so far this session, so dots don't all
   * move in lockstep. */
  blend: number;
};

/** Which two formations HeroField's dots should be interpolating between
 * at this progress, and how far along (see MorphState.blend caveat). */
export function resolveMorphState(progress: number): MorphState {
  if (progress <= MORPH_TO_1[0]) return { fromIndex: -1, toIndex: 0, blend: 0 };
  if (progress < MORPH_TO_1[1]) {
    const t = (progress - MORPH_TO_1[0]) / (MORPH_TO_1[1] - MORPH_TO_1[0]);
    return { fromIndex: -1, toIndex: 0, blend: t };
  }
  if (progress < MORPH_TO_2[0]) return { fromIndex: -1, toIndex: 0, blend: 1 };
  if (progress < MORPH_TO_2[1]) {
    const t = (progress - MORPH_TO_2[0]) / (MORPH_TO_2[1] - MORPH_TO_2[0]);
    return { fromIndex: 0, toIndex: 1, blend: t };
  }
  if (progress < MORPH_TO_3[0]) return { fromIndex: 0, toIndex: 1, blend: 1 };
  if (progress < MORPH_TO_3[1]) {
    const t = (progress - MORPH_TO_3[0]) / (MORPH_TO_3[1] - MORPH_TO_3[0]);
    return { fromIndex: 1, toIndex: 2, blend: t };
  }
  return { fromIndex: 1, toIndex: 2, blend: 1 };
}

/** Label i fades in across the segment that morphs *into* it and fades
 * out across the segment that morphs *away* from it — the last label has
 * no fade-out, since it's the terminal state once released. */
const LABEL_WINDOWS: ReadonlyArray<{ fadeIn: PhaseRange; fadeOut: PhaseRange | null }> = [
  { fadeIn: MORPH_TO_1, fadeOut: MORPH_TO_2 },
  { fadeIn: MORPH_TO_2, fadeOut: MORPH_TO_3 },
  { fadeIn: MORPH_TO_3, fadeOut: null },
];

export function labelOpacity(progress: number, index: 0 | 1 | 2): number {
  const { fadeIn, fadeOut } = LABEL_WINDOWS[index];
  if (progress < fadeIn[0]) return 0;
  if (progress < fadeIn[1]) return smoothstep(fadeIn[0], fadeIn[1], progress);
  if (!fadeOut || progress < fadeOut[0]) return 1;
  if (progress < fadeOut[1]) return 1 - smoothstep(fadeOut[0], fadeOut[1], progress);
  return 0;
}
