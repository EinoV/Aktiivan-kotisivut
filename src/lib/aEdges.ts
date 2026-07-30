import { A_MASK_CELLS } from "./aMask";

/**
 * A small, curated set of grid-adjacency edges between A-mask cells, used
 * to draw "nearby dots connect" lines during cursor interaction. Built
 * from real adjacency (so it always traces the actual glyph structure)
 * then deterministically thinned to a limited count — this is meant to
 * read as a few analytical connections, not a network graph.
 */
export type Edge = { a: number; b: number };

function buildAllAdjacency(): Edge[] {
  const index = new Map<string, number>();
  A_MASK_CELLS.forEach(([c, r], i) => index.set(`${c},${r}`, i));

  const edges: Edge[] = [];
  const neighborOffsets: Array<[number, number]> = [
    [1, 0],
    [0, 1],
    [1, 1],
    [-1, 1],
  ];

  A_MASK_CELLS.forEach(([c, r], i) => {
    for (const [dc, dr] of neighborOffsets) {
      const j = index.get(`${c + dc},${r + dr}`);
      if (j !== undefined) edges.push({ a: i, b: j });
    }
  });
  return edges;
}

export function getSampledEdges(limit = 18): Edge[] {
  const all = buildAllAdjacency();
  if (all.length <= limit) return all;
  const step = all.length / limit;
  const sampled: Edge[] = [];
  for (let i = 0; i < limit; i++) {
    sampled.push(all[Math.floor(i * step)]);
  }
  return sampled;
}
