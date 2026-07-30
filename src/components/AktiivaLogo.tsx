import Image from "next/image";

const SOURCES = {
  "mark-navy": { src: "/logo/aktiiva-mark-navy.png", w: 198, h: 220 },
  "mark-white": { src: "/logo/aktiiva-mark-white.png", w: 198, h: 220 },
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
