import { A_MASK_CELLS, A_MASK_COLS, A_MASK_ROWS } from "./aMask";

export type ARegion = {
  regionX: number;
  regionY: number;
  regionW: number;
  regionH: number;
};

/**
 * The box the A glyph is drawn into, in container-pixel coordinates.
 * Capped by width first so the glyph never overflows a narrow/tall
 * viewport; height is then derived from the mask's own aspect ratio so
 * it's never stretched. Shared by HeroField (canvas dots) and the outline
 * trace below so both agree on where the A actually is.
 */
export function computeARegion(width: number, height: number): ARegion {
  const maskAspect = A_MASK_COLS / A_MASK_ROWS;
  const regionW = Math.min(height * 0.6 * maskAspect, width * 0.72);
  const regionH = regionW / maskAspect;
  const regionX = (width - regionW) / 2;
  const regionY = (height - regionH) / 2;
  return { regionX, regionY, regionW, regionH };
}

/** Maps an A-mask cell (col, row) to a 0..1 fraction within the region box. */
export function cellFraction(c: number, r: number) {
  return {
    fx: (c + 0.5) / A_MASK_COLS,
    fy: (r + 0.5) / A_MASK_ROWS,
  };
}

export function cellToPoint(c: number, r: number, region: ARegion) {
  const { fx, fy } = cellFraction(c, r);
  return {
    x: region.regionX + fx * region.regionW,
    y: region.regionY + fy * region.regionH,
  };
}

// Three abstract dot-formations the A morphs through, one per discipline,
// all in the same (col, row) mask-cell space as A_MASK_CELLS (cols 9..34,
// rows 3..32 — unlike the retired arrow, these have no header-clearance
// requirement, so they stay within the A's own row range). Deliberately
// abstract editorial references (a ledger grid, capital circulating,
// ruled document lines) — never literal financial iconography (no bar
// charts, coins, scales of justice, etc.), per the project brief.

/**
 * Laskentatoimi (accounting): a ruled two-column ledger table — an outer
 * frame with a full-height divider down the centre and ragged rows of
 * posted entries either side of it.
 */
export function getLedgerGridCells(): Array<{ c: number; r: number }> {
  const cells: Array<{ c: number; r: number }> = [];
  const col0 = 10;
  const col1 = 32;
  const row0 = 6;
  const row1 = 28;
  const dividerCol = 21; // exact centre of col0..col1, so both sides balance
  const row = (r: number, from: number, to: number) => {
    for (let c = from; c <= to; c++) cells.push({ c, r });
  };

  // Outer frame.
  row(row0, col0, col1);
  row(row1, col0, col1);
  for (let r = row0 + 1; r < row1; r++) {
    cells.push({ c: col0, r });
    cells.push({ c: col1, r });
  }
  // Centre divider, full height between the frame's top and bottom rules.
  for (let r = row0 + 1; r < row1; r++) cells.push({ c: dividerCol, r });

  // Posted entries, ragged in length so they read as figures rather than
  // a uniform mesh. Both columns are left-aligned inside their own half,
  // one cell clear of the frame and the divider.
  const debitLengths = [8, 6, 7, 5, 8, 6];
  const creditLengths = [7, 8, 5, 7, 6, 8];
  const entryRows = [10, 13, 16, 19, 22, 25];
  entryRows.forEach((r, i) => {
    row(r, col0 + 2, col0 + 1 + debitLengths[i]);
    row(r, dividerCol + 2, dividerCol + 1 + creditLengths[i]);
  });
  return cells;
}

/**
 * Rahoitus (finance): five solid dot-filled columns ascending left to
 * right off a shared baseline — a growth/return progression.
 *
 * The original brief ruled out chart iconography, but the client asked
 * for this shape directly ("vasemmalta oikealle kohoava pylväsmuodostelma")
 * and supplied a reference image of it, so their direction wins here. It's
 * kept axis-less and label-less so it stays a dot formation reading as
 * "rising", not a data graphic pretending to plot real numbers.
 */
export function getGrowthBarsCells(): Array<{ c: number; r: number }> {
  const cells: Array<{ c: number; r: number }> = [];
  const baseRow = 26;
  // 3 cols wide, 1-col gap between; span 12..30 centres on the mask's
  // own centre column (21.5), matching where the A sat.
  const bars = [
    { col0: 12, topRow: 22 },
    { col0: 16, topRow: 18 },
    { col0: 20, topRow: 14 },
    { col0: 24, topRow: 10 },
    { col0: 28, topRow: 6 },
  ];
  for (const bar of bars) {
    for (let c = bar.col0; c <= bar.col0 + 2; c++) {
      for (let r = bar.topRow; r <= baseRow; r++) {
        cells.push({ c, r });
      }
    }
  }
  return cells;
}

/**
 * Yritysjuridiikka (business law): two stacked contract documents offset
 * diagonally, the front one carrying ruled text lines and a solid dot
 * seal in its lower corner — document + seal, never scales of justice or
 * a gavel.
 */
export function getContractSealCells(): Array<{ c: number; r: number }> {
  const cells: Array<{ c: number; r: number }> = [];
  // Front sheet bounds, declared first because the back sheet is clipped
  // against them: dots can't occlude each other the way filled shapes do,
  // so without this the back sheet's edges draw straight through the
  // front one and the stack reads as one scribbled box.
  const front = { c0: 17, c1: 31, r0: 11, r1: 28 };
  const hiddenBehindFront = (c: number, r: number) =>
    c >= front.c0 && c <= front.c1 && r >= front.r0 && r <= front.r1;

  function rectPerimeter(
    c0: number,
    c1: number,
    r0: number,
    r1: number,
    clip = false,
  ) {
    const push = (c: number, r: number) => {
      if (!clip || !hiddenBehindFront(c, r)) cells.push({ c, r });
    };
    for (let c = c0; c <= c1; c++) {
      push(c, r0);
      push(c, r1);
    }
    for (let r = r0 + 1; r < r1; r++) {
      push(c0, r);
      push(c1, r);
    }
  }
  // Back sheet, peeking out up-and-left from behind the front one.
  rectPerimeter(11, 24, 5, 20, true);
  // Front sheet, the one carrying the content.
  rectPerimeter(front.c0, front.c1, front.r0, front.r1);
  // Ruled text lines inside the front sheet, ragged-right like real
  // paragraph copy rather than uniform bars.
  const textLines = [
    { row: 15, col0: 19, col1: 29 },
    { row: 18, col0: 19, col1: 26 },
    { row: 21, col0: 19, col1: 29 },
  ];
  for (const line of textLines) {
    for (let c = line.col0; c <= line.col1; c++) {
      cells.push({ c, r: line.row });
    }
  }
  // Seal, lower-right of the front sheet.
  const sealCol = 27;
  const sealRow = 25;
  const sealRadius = 2.4;
  for (let r = Math.round(sealRow - sealRadius); r <= Math.round(sealRow + sealRadius); r++) {
    for (let c = Math.round(sealCol - sealRadius); c <= Math.round(sealCol + sealRadius); c++) {
      if (Math.hypot(c - sealCol, r - sealRow) <= sealRadius) {
        cells.push({ c, r });
      }
    }
  }
  return cells;
}

/**
 * Traces the outer silhouette of the glyph — leftmost cell per row from
 * base to apex, then rightmost cell per row from apex back to base —
 * giving a closed-ish outline path that follows the actual rendered
 * letterform. Used for the slow "data path" pulse.
 */
export function getOutlineTrace(): Array<{ c: number; r: number }> {
  const rows = new Map<number, { min: number; max: number }>();
  for (const [c, r] of A_MASK_CELLS) {
    const existing = rows.get(r);
    if (!existing) {
      rows.set(r, { min: c, max: c });
    } else {
      existing.min = Math.min(existing.min, c);
      existing.max = Math.max(existing.max, c);
    }
  }
  // sortedRows is ascending by row index; small row = near the apex,
  // large row = near the base (matches how the mask was sampled top-down).
  const sortedRows = [...rows.keys()].sort((a, b) => a - b);
  const leftApexToBase = sortedRows.map((r) => ({ c: rows.get(r)!.min, r }));
  const rightApexToBase = sortedRows.map((r) => ({ c: rows.get(r)!.max, r }));
  // base(left) -> apex -> base(right), tracing the outer silhouette once
  return [...leftApexToBase.slice().reverse(), ...rightApexToBase];
}
