import Image from "next/image";

const SOURCES = {
  "mark-navy": { src: "/logo/aktiiva-mark-navy.png", w: 198, h: 220 },
  "mark-white": { src: "/logo/aktiiva-mark-white.png", w: 198, h: 220 },
  /* Extracted from aktiiva-lockup-navy-bg.png, the only asset that
     carries the mark at any size — the shipped lockups are 198px tall,
     which caps a retina screen at about 104px on the page. This is
     2.9x that, so the homepage logo band can be set large without
     upscaling. */
  "mark-navy-lg": {
    src: "/logo/aktiiva-mark-navy-lg.png",
    w: 615,
    h: 645,
  },
} as const;

type Props = {
  variant: keyof typeof SOURCES;
  height: number;
  className?: string;
  priority?: boolean;
};

export function AktiivaLogo({ variant, height, className, priority }: Props) {
  const { src, w, h } = SOURCES[variant];
  const width = Math.round((w / h) * height);
  return (
    <Image
      src={src}
      alt="Aktiiva ry"
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
