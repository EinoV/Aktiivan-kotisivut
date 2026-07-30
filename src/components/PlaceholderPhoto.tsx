// Stand-in for real Aktiiva photography (students / events), used only until
// actual photos are available. Deliberately abstract — a duotone halftone or
// silhouette treatment, not a fake attempt at a real photo. Deterministic
// (seeded), so server and client render identically.

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return h;
}

type Props = {
  seed: string;
  variant?: "halftone" | "silhouette" | "linework";
  tone?: "navy-on-light" | "light-on-navy";
  caption: string;
  className?: string;
};

const NAVY = "#112035";
const PAPER = "#f3f1ea";

export function PlaceholderPhoto({
  seed,
  variant = "halftone",
  tone = "navy-on-light",
  caption,
  className,
}: Props) {
  const bg = tone === "navy-on-light" ? PAPER : NAVY;
  const fg = tone === "navy-on-light" ? NAVY : PAPER;
  const rand = mulberry32(hashSeed(seed));
  const off1 = rand() * 10;
  const off2 = rand() * 10;

  return (
    <figure
      className={className}
      style={{ margin: 0, position: "relative", isolation: "isolate" }}
    >
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%", display: "block" }}
        role="img"
        aria-label={caption}
      >
        <rect width="400" height="300" fill={bg} />
        {variant === "halftone" && (
          <g fill={fg}>
            {Array.from({ length: 15 }).map((_, row) =>
              Array.from({ length: 20 }).map((__, col) => {
                const x = col * 20 + 10;
                const y = row * 20 + 10;
                const value =
                  (Math.sin(row * 0.55 + off1) * Math.cos(col * 0.4 + off2) +
                    1) /
                  2;
                const r = 1 + value * 7.5;
                return <circle key={`${row}-${col}`} cx={x} cy={y} r={r} />;
              }),
            )}
          </g>
        )}
        {variant === "linework" && (
          <g stroke={fg} strokeWidth={1.1}>
            {Array.from({ length: 40 }).map((_, i) => {
              const t = i / 40;
              const wobble = Math.sin(i * 0.7 + off1) * 6;
              const x = -60 + i * 14 + wobble;
              const density = 0.35 + 0.65 * Math.abs(Math.sin(t * 3 + off2));
              return (
                <line
                  key={i}
                  x1={x}
                  y1={-20}
                  x2={x + 140}
                  y2={320}
                  opacity={density}
                />
              );
            })}
          </g>
        )}
        {variant === "silhouette" && (
          <g fill={fg}>
            {Array.from({ length: 6 }).map((_, i) => {
              const x = 20 + i * 65 + rand() * 20;
              const scale = 0.7 + rand() * 0.6;
              const headR = 16 * scale;
              const shoulderW = 46 * scale;
              const shoulderH = 70 * scale;
              const baseY = 300;
              return (
                <g key={i}>
                  <circle cx={x} cy={baseY - shoulderH - headR + 6} r={headR} />
                  <path
                    d={`M ${x - shoulderW / 2} ${baseY}
                        Q ${x - shoulderW / 2} ${baseY - shoulderH} ${x} ${baseY - shoulderH}
                        Q ${x + shoulderW / 2} ${baseY - shoulderH} ${x + shoulderW / 2} ${baseY}
                        Z`}
                  />
                </g>
              );
            })}
          </g>
        )}
      </svg>
      <figcaption
        style={{
          position: "absolute",
          bottom: "0.75rem",
          left: "0.75rem",
          fontSize: "0.65rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: fg,
          opacity: 0.55,
          background: bg,
          padding: "0.2rem 0.5rem",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Kuvapaikka — {caption}
      </figcaption>
    </figure>
  );
}
