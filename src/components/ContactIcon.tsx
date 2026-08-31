/**
 * Marks for the footer's contact links: an envelope, and the Instagram and
 * LinkedIn glyphs.
 *
 * Drawn inline rather than loaded as brand asset files. Three icons at
 * this size are smaller as markup than the requests would cost, and
 * inlining lets them take their colour from the link they sit in, so they
 * follow it on hover without a second rule.
 *
 * Built for roughly 17px on screen, which is what 1.15em comes to next to
 * the footer's 0.95rem links. That drives the drawing: the Instagram and
 * LinkedIn rounded squares are the same 18-unit box so the row keeps one
 * rhythm, and the two solid dots are filled rather than stroked because a
 * 1.2px ring around a 2px dot turns to mush at this size.
 */
const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

export type ContactIconKind =
  | "email"
  | "instagram"
  | "linkedin"
  | "location";

export function ContactIcon({
  kind,
  className,
}: {
  kind: ContactIconKind;
  className: string;
}) {
  switch (kind) {
    case "email":
      return (
        <svg {...ICON_PROPS} className={className}>
          <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
          <path d="M3.6 7.4 12 13.2l8.4-5.8" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...ICON_PROPS} className={className}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" stroke="none" />
        </svg>
      );
    case "location":
      return (
        <svg {...ICON_PROPS} className={className}>
          <path d="M12 21.2s6.8-6 6.8-10.8a6.8 6.8 0 1 0-13.6 0C5.2 15.2 12 21.2 12 21.2Z" />
          <circle cx="12" cy="10.2" r="2.5" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...ICON_PROPS} className={className}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M7.6 10.6v5.9" />
          <circle cx="7.6" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
          <path d="M11.7 16.5v-5.9" />
          <path d="M11.7 13.3a2.4 2.4 0 0 1 4.8 0v3.2" />
        </svg>
      );
  }
}
