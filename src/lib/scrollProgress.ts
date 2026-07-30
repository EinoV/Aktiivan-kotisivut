/**
 * Progress (0..1) through a pinned/sticky scroll section: 0 at the exact
 * moment the sticky child engages (wrapperRect.top === 0), 1 at the exact
 * moment it's about to release (wrapperRect.top === -(wrapper height minus
 * one viewport)). Clamped, so overscroll/rubber-banding is handled for
 * free — callers never see out-of-range values.
 */
export function pinProgress(wrapperRect: DOMRect, viewportHeight: number): number {
  const total = wrapperRect.height - viewportHeight;
  if (total <= 0) return 0;
  return Math.min(Math.max(-wrapperRect.top / total, 0), 1);
}
