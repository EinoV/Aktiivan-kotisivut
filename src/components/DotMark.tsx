import { A_MASK_CELLS } from "@/lib/aMask";
import {
  getContractSealCells,
  getGrowthBarsCells,
  getLedgerGridCells,
} from "@/lib/aRegion";
import styles from "./DotMark.module.css";

/**
 * A static dot mark built from the *same* geometry the homepage hero
 * animates — `A_MASK_CELLS` plus the three discipline formations in
 * `aRegion.ts`. The subpages previously carried none of the hero's
 * visual language, which is a large part of why they read as a
 * different, less finished site.
 *
 * Deliberately SVG and a server component, not canvas: it needs no
 * requestAnimationFrame, no client bundle, and no reduced-motion branch,
 * and it ships inside the HTML. It is pure decoration layered behind the
 * page title, so it is `aria-hidden` and never carries meaning that
 * isn't also in the text.
 */
export type DotMarkMotif = "a" | "ledger" | "bars" | "contract";

const MOTIF_CELLS: Record<DotMarkMotif, Array<{ c: number; r: number }>> = {
  a: A_MASK_CELLS.map(([c, r]) => ({ c, r })),
  ledger: getLedgerGridCells(),
  bars: getGrowthBarsCells(),
  contract: getContractSealCells(),
};

export function DotMark({ motif }: { motif: DotMarkMotif }) {
  const cells = MOTIF_CELLS[motif];

  // Fit the viewBox to the motif's own bounds rather than the full 44×33
  // mask, so every motif optically fills the same box no matter how much
  // of the grid it happens to occupy.
  let minC = Infinity;
  let maxC = -Infinity;
  let minR = Infinity;
  let maxR = -Infinity;
  for (const { c, r } of cells) {
    if (c < minC) minC = c;
    if (c > maxC) maxC = c;
    if (r < minR) minR = r;
    if (r > maxR) maxR = r;
  }
  const pad = 1;
  const width = maxC - minC + pad * 2;
  const height = maxR - minR + pad * 2;

  return (
    <svg
      className={styles.mark}
      viewBox={`${minC - pad} ${minR - pad} ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      {cells.map(({ c, r }) => (
        <circle key={`${c}-${r}`} cx={c + 0.5} cy={r + 0.5} r={0.3} />
      ))}
    </svg>
  );
}
