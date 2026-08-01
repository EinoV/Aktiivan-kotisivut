# Aktiiva ry — design system

Extracted from the selected homepage direction (`/`, formerly "konsepti 1b-B").
This is the visual source of truth for building the rest of the site
(Aktiiva, Työpaikat, Kumppanit, Hallitus, Yhteystiedot). Match these tokens
and principles rather than inventing new ones per page.

## 1. Colour

Four tokens, defined as CSS custom properties on each page's root element:

| Token | Value | Use |
|---|---|---|
| `--navy` | `#112035` | Text on light backgrounds, the brand's dark anchor, halo/shadow colour behind light dots |
| `--paper` | `#f3f1ea` | Primary background (a warm off-white, deliberately not `#fff`), text on dark backgrounds |
| `--muted` | `#5c6572` | Secondary text, captions, metadata |
| `--rule` | `rgba(17, 32, 53, 0.14)` | Hairline dividers |

The A-symbol over photography uses two extra colour values, chosen for
contrast against a photograph rather than as new brand colours:

- Dot fill: `rgb(232, 236, 240)` — pale blue-grey, not pure white
- Dot halo/shadow: `rgba(10, 18, 32, 0.55)` — soft dark edge for separation,
  kept restrained so it reads as contrast, not glow

**Rule:** no gradients as decoration. The only gradients in the system are
functional scrims (see §5, Navigation) that exist solely to protect text
contrast — never a decorative background gradient, never a coloured brand
gradient.

## 2. Typography

Two families, loaded via `next/font/local` from `public/fonts/`:

- **Display — Fraunces** (variable, weight range 300–700, used around
  weight ≈480). Editorial serif with warmth; carries headings, section
  titles, and any large standalone statement. Used sparingly — body copy is
  never set in it.
- **Body/UI — IBM Plex Sans** (weight 400–500). Everything else: running
  text, navigation, labels, buttons, captions.

Type scale is fluid via `clamp()`, not fixed breakpoints, e.g. a section
heading is `clamp(1.75rem, 3vw, 2.25rem)`. Minimum body size is 1rem;
captions/labels bottom out around 0.75–0.85rem with added letter-spacing to
stay legible at small sizes (`letter-spacing: 0.08–0.14em` + uppercase for
true micro-labels).

## 3. Photographic treatment

Real, licensed photography, never stock-photo-generic. The grading recipe
(applied once, baked into the source file, not as a live CSS filter — this
keeps what you preview identical to what ships):

1. Crop first for composition: calm, low-detail area where the A/heading
   will sit; detailed subject matter (islands, architecture, people) pushed
   toward the edges. Avoid a strong horizontal horizon line where possible.
2. Desaturate: `saturation × 0.65` (subject-dependent; range 0.5–0.7 has
   been used).
3. Contrast: `× ~1.0` — a light touch, not flattened.
4. Brightness: `× 0.90` — pull highlights in, don't crush blacks.
5. Shadow-toward-navy: build a luminance mask (inverted, so shadows weight
   highest), composite `--navy` through that mask at ~25% strength. This
   tints shadows without touching highlights uniformly.
6. Final overlay: blend the whole image ~27% toward solid `--navy`.

Result should still read as an unmistakable, recognisable photograph —
never abstracted into pure texture. If step 6 pushes past "moody" into
"illegible", back it off.

**Live (non-baked) treatments**, applied in the browser:
- Scrims for text legibility only (§5).
- A very slow ambient scale — `1.0 → 1.025` over ~48s, ease-in-out,
  infinite — never a perceptible "zoom".
- A few pixels of mouse-only parallax (see §6).

**Mobile gets its own crop**, not just a repositioned desktop image. Same
grading recipe, different source crop chosen for a tall/narrow viewport
(calm area still centred, detail still at the edges, top/bottom kept calm
for nav and lower text).

## 4. Spacing

Fluid, `clamp()`-based, no fixed pixel breakpoint jumps except at the
640px mobile threshold. Recurring patterns:

- Section horizontal padding: `clamp(1.5rem, 5vw, 5rem)`
- Vertical rhythm between major sections: `clamp(4rem, 8vw, 7rem)`
- Gaps within a section (e.g. list items, grid): `clamp(1.5rem, 4vw, 3rem)`
- Hairline `--rule` borders mark section boundaries instead of
  background-colour blocking or shadows.

## 5. Navigation

- A flat, single-row list of text links. No pills, no boxes, no dropdown
  chrome.
- Sits transparently over the hero photograph — no solid nav bar.
- Text colour is chosen for contrast against that specific hero (off-white
  on a dark/moody photo; would be navy on a bright/light one) — it is a
  per-page judgement call, not a fixed rule.
- If the photo alone doesn't give enough contrast, add a **subtle, local**
  linear-gradient scrim (`--navy` fading from ~0.32 opacity to 0 over the
  top ~20% of the hero) — never a solid bar, and only where actually
  needed.
- **Mobile:** the logo and nav stack vertically; the nav itself wraps to
  multiple rows rather than truncating, hiding items behind a menu, or
  overflowing. Verify this at 390px and 430px — six-item nav rows *will*
  overflow a single line at phone widths.

## 6. Motion

- **Every** animated element must respect `prefers-reduced-motion: reduce`
  — check it explicitly in JS for canvas/parallax work, and mirror it in a
  `@media (prefers-reduced-motion: reduce)` block for CSS keyframes. Under
  reduced motion: static single frame, no parallax listeners attached at
  all (don't just shorten durations).
- Hero photo: the slow ambient scale from §3, plus a few pixels of
  parallax that only engages for `pointerType === "mouse"` — explicitly
  skipped when `(pointer: coarse)` matches, i.e. touch devices.
- The animated A (dot field): a continuous, very subtle per-dot "breathe"
  (~±10% radius, staggered phase per dot) plus real interactivity —
  dots gently repel/brighten near the cursor, and a click sends a soft
  ripple through the field. This is the one place where motion is a
  primary feature, not a decoration, because it *is* the interaction
  model for the A.
- Nothing else moves, with one deliberate exception: the pinned hero
  sequence (`HeroPinned`). Scrolling past the hero must not scroll the
  *page* — only the dots should visibly change — which is only really
  achievable with a pinned/sticky scroll section, so that's what this is:
  `HeroPinned.module.css`'s `.heroPinOuter` is a tall wrapper (340vh
  desktop, 260vh mobile) around `.heroWrap`, which is `position: sticky;
  top: 0`, not `relative`. As the user scrolls through the wrapper's
  extra height, the hero stays visually in place; `pinProgress()`
  (`src/lib/scrollProgress.ts`) turns the wrapper's own
  `getBoundingClientRect()` into a 0..1 value (0 exactly at pin-engage,
  1 exactly at pin-release, clamped through overscroll) — not
  `scrollY/innerHeight` against the whole page, which is what every
  earlier iteration of this hero used and which by definition scrolls the
  page while animating.

  `HeroPinned` measures that progress once (a `useState` + `scroll`
  listener, skipped entirely under `prefers-reduced-motion` — see below)
  and passes it as a plain prop to `HeroScrollFade` (which still just
  writes `--hero-scroll` for `.heroScrollDarken` to read) and
  `HeroPhaseLabel`. `HeroField` tracks the *same* wrapper rect but keeps
  its own independent listener and per-frame easing
  (`heroScrollSmoothed += (target - heroScrollSmoothed) * 0.18`, so a
  single big wheel/trackpad scroll doesn't just teleport the canvas
  between two states) — a genuine canvas-specific need the cheaper
  DOM-only consumers don't share, so it isn't worth collapsing into one
  shared tracker.

  What the user actually sees: the A morphs through three abstract
  formations, one per discipline, each paired with a real plain-text
  label ("Laskentatoimi", "Rahoitus", "Yritysjuridiikka" —
  `HeroPhaseLabel`, reusing `orgFacts.fields` rather than a fourth copy
  of the three names; no numbering prefix, since the three aren't a
  ranked or numbered sequence). The formations (`getLedgerGridCells` /
  `getGrowthBarsCells` / `getContractSealCells` in `src/lib/aRegion.ts`)
  are generated in the same 44×33 mask-cell space as `A_MASK_CELLS`:
  a ruled two-column ledger table for Laskentatoimi — an outer frame
  with a full-height divider down the centre and ragged rows of posted
  entries either side of it. It went through two rejected passes first
  (a plain two-block dot grid, then a T-account); the frame is what
  finally made it read as a *table* rather than as scattered dots, so
  keep the enclosing rule if this shape is revised again. Five solid columns ascending off a
  shared baseline for Rahoitus; and two contract sheets stacked at a
  diagonal offset, the front one carrying ragged-right ruled text lines
  and a solid dot seal in its lower corner, for Yritysjuridiikka.

  Two notes on those, both learned the hard way. First, the ascending
  columns are chart-adjacent, which §8 otherwise rules out — the client
  asked for that shape by name and supplied a reference image, so their
  direction wins; it's kept axis-less and label-less so it stays a dot
  formation reading as "rising" rather than a graphic pretending to plot
  real numbers. Second, dots can't occlude one another the way filled
  shapes can, so the back contract sheet is explicitly **clipped**
  against the front sheet's bounds. Without that clip its edges draw
  straight through the front sheet and the stack reads as one scribbled
  box. Any future formation that layers overlapping outlines needs the
  same treatment — and verify it by rendering the cell coordinates as an
  ASCII grid, not by eyeballing a canvas thumbnail: at the downscale
  needed for a readable screenshot, fine structure like ruled lines and
  overlapping rectangles compresses into an ambiguous blur that looks
  fine when it isn't. (Reading the canvas back, thresholding on alpha
  and printing *that* as an ASCII grid works too, and has the advantage
  of proving what actually rendered rather than what the geometry
  intended.)

  One more `HeroField` invariant worth not breaking: `resize()` reassigns
  `canvas.width`, which wipes the canvas. Under normal motion the rAF
  loop repaints on the next frame so it's invisible, but under reduced
  motion there is no loop, so the `ResizeObserver` callback has to
  repaint explicitly. Without it the hero goes permanently blank for
  reduced-motion users after any resize — and because `ResizeObserver`
  also fires once on its own right after mount, it raced the initial
  `draw(0)` and could blank the canvas immediately on load. All timing
  lives in one place,
  `src/lib/heroPinPhases.ts` — named phase
  ranges (`HOLD_A`, `MORPH_TO_1`, `HOLD_1`, …) plus `resolveMorphState()`
  and `labelOpacity()` — imported by both `HeroField` and
  `HeroPhaseLabel` so the dots and the label crossfade can never
  disagree about what's currently happening. Each A-dot's per-formation
  target is assigned once at creation using each dot's *fractional*
  index position, not `i % length` — there are more formation cells than
  A-dots for at least one formation, and a naive modulo never wraps in
  that case, silently leaving the tail of the shape unreachable by any
  dot (this bit the project once already, with the arrow this replaced).
  A per-dot `morphSeed` staggers each dot's onset slightly, so a
  formation visibly reforms rather than the two shapes cross-fading in
  place.

  `DisciplinesReveal`, the three-names section directly below the hero
  from an earlier iteration, is **not** removed — it's now the
  `prefers-reduced-motion` fallback specifically. Under reduced motion,
  `HeroPinned`'s listener never runs (the pin wrapper itself collapses
  to `height: auto`, `.heroWrap` reverts to `position: relative`, and
  `HeroPhaseLabel` is `display: none`), so the pinned sequence never
  shows anyone anything — `DisciplinesReveal`'s CSS flips from
  `display: none` to `display: flex` in that same media query and
  becomes the one place those three names are ever shown to that user.
  It's real, unconditionally SSR-rendered DOM text either way, never
  gated behind JS — for everyone else it's just not the visible copy,
  since the pinned hero already delivered the same names.

  Two more things do the hero-to-content seam-hiding work, both
  unchanged by any of this: `.heroBottomFade` (in `HeroPinned.module.css`
  now), a static fade inside the hero ending at the *exact* flat colour
  `.heroTransition` (still in `page.module.css`) starts at, so the hard
  edge between "real photo" and "CSS gradient" lands on two identical
  colours instead of a visible cut; and that gradient band itself (dark
  → `--muted` → warm grey → `--paper`, ~22–34vh, no JS) uses
  evenly-spaced stops rather than clustering them, since clustered stops
  are what made an early version read as a sudden band instead of a
  smooth one.

  Any ancestor of `.heroPinOuter` gaining `overflow`/`transform`/
  `filter`/`contain` silently breaks the sticky pin — no console error,
  it just stops pinning. **This already bit us once**: `globals.css` had
  `html, body { overflow-x: hidden }`, and per the CSS overflow spec a
  non-`visible` value on one axis forces the other axis from `visible` to
  `auto` — so both `html` and `body` computed to `overflow-y: auto` and
  became scroll containers. The hero then resolved its sticky offset
  against `body`'s scrollport while the page actually scrolled the
  documentElement, and the pin simply never engaged: the whole hero
  scrolled away while the dots were still on the first formation. The fix
  is `overflow-x: clip`, which clips horizontally exactly the same way but
  is in the same computed-value group as `visible`, so `overflow-y` stays
  `visible` and no scroll container is created. Never reintroduce
  `overflow-x: hidden` on `html`/`body` here — reach for `clip`. Worth
  re-checking the whole ancestor chain before adding any wrapping layout
  above the hero in future work; the failure is silent.

  No hover-lift-and-shadow card tricks anywhere. If a proposed animation
  doesn't serve legibility or this established interaction, cut it.

## 7. Footer

- Compact: logo mark, a contact column (email, Instagram, LinkedIn), an
  org-identity column (name, institution, city) — laid out in a single
  row on desktop, wrapping naturally at narrow widths. No multi-column
  sitemap sprawl.
- A hairline `--rule` divider separates the footer from the section above
  it, and a second hairline separates the main footer row from the
  attribution note beneath it.
- **Attribution note:** small (`0.75rem`), reduced opacity (~0.7), placed
  last. Must stay legally complete even while visually discreet —
  photographer name, source platform, licence (with a link), and an
  acknowledgement that the image was edited. Never omit this to save
  space; shrink type size instead.

## 8. What not to do

Carried over from the original brief and reconfirmed through the concept
process — still binding for every future page:

- No decorative gradients.
- No heavy drop shadows.
- No generic repeated card grids.
- No "everything centered" layouts.
- No text below a comfortable reading size for its role.
- No stock-photo-style imagery — real, specific, licensed, and credited.
- No solid navigation bar unless a scrim genuinely cannot solve contrast.

There is exactly one sanctioned exception to the "no background-colour
blocking" half of §4 — see the inverted band in §9.

## 9. Subpage patterns

The five content routes (`/aktiiva`, `/tyopaikat`, `/kumppanit`,
`/hallitus`, `/yhteystiedot`) live in the `(sivut)` route group and share
`src/app/(sivut)/sivut.module.css`. Four patterns carry them, and they
exist because the first version of these pages had none of them: every
page was `PageHeader` + a hairline-ruled list, aligned to one identical
left edge, so five different pages read as one repeating template.

**The two-column section** (`.gridSection` + `.gridAside`). A ~14rem
heading column that is `position: sticky` on desktop, and the content
beside it. This is the fix for the single-left-edge problem: it creates a
second left edge and fills the right half of the viewport, which the
capped ~58ch measure otherwise leaves empty. Collapses to one column at
640px, where the aside also stops being sticky. Use it for prose and
label/body rows; keep `.section` (full width) for the jobs and board
tables, where column alignment carries meaning.

**The dot motif** (`src/components/DotMark.tsx`). A static SVG built from
the *same* geometry the hero animates — `A_MASK_CELLS` plus
`getLedgerGridCells` / `getGrowthBarsCells` / `getContractSealCells` from
`aRegion.ts`. One per page, chosen for meaning (A / bars / ledger /
contract-and-seal), sitting in the right half of `PageHeader` at 10%
navy. It is SVG and a server component on purpose: no rAF, no client
bundle, no reduced-motion branch, and it ships inside the HTML. It is
`aria-hidden` and hidden entirely below 640px — it is texture, never
information. If it ever reads as an illustration competing with the
title, the fill is too strong.

This motif is the subpages' whole differentiation budget. §3's
photography clause is the usual lever, but the client chose no
photography for these pages, so the brand's own visual language does the
work instead — which is also why the subpages now read as the same site
as the hero rather than as a separate template.

**Buttons** (`.action`, `.actionInverse`). The system had no button at
all before this; the only call to action was a grey paragraph. Plex Sans
per §2, 1px `--navy` border, no radius beyond the existing 2px idiom, and
**fill swap only** on hover — §6 and §8 forbid lift and shadow.

**The inverted band** (`.invertBand`). Exactly one exists on the whole
subsite: the partner ask on `/kumppanit`. Without photography the
subpages have no tonal contrast whatsoever — every pixel is navy on
paper — and §1 already defines `--paper` as "text on dark backgrounds",
so an inverted surface is inside the token system. It is nonetheless a
deliberate exception to §4's "hairline borders… instead of
background-colour blocking", and it stays an accent only while it stays
singular. Do not add a second one; repeated, it becomes exactly the
colour-blocking §4 rules out. Body copy inside it uses a tint of
`--paper`, not `--muted` — `--muted` is specified for light backgrounds
and nearly vanishes on navy.

**Photography on the subpages** (`PhotoBand`, `NewsList`). Full-bleed
graded photographs of the Turku School of Economics and of Turku itself,
sourced from Wikimedia Commons under CC BY-SA and credited in the
subpage footer — §8 requires "real, specific, licensed, and credited",
and a generic office stock photo would fail all four words. The grading
follows §3 with the darkening steps backed off (desaturation and the
navy shadow tint at full strength, brightness left alone, the final
overlay at ~8% rather than 27%): §3's recipe assumes off-white text sits
*on* the photo, which is true in the hero and false here, and §3 itself
sanctions backing step 6 off. The recipe is reproducible —
`scripts/grade-photos.py`, run against the unmodified Commons originals;
the baked files in `public/photos/` are what ships, never a live CSS
filter.
Two bands cut from the same source use a zoom-and-offset pre-crop so
they read as different photographs rather than the same view twice.

**The announcement grid** (`NewsList`, "Ajankohtaista"). §8 rules out
"generic repeated card grids" and this is a grid of image-topped items —
a deliberate exception, made because the client asked for the reference
association sites' structure by name after seeing the alternative. It is
held as far from a generic card as the pattern allows: no border box, no
radius, no shadow, no hover-lift, no "read more" chrome. A hairline above
each item and nothing else, exactly like every other list on the
subsite. If it ever grows card chrome, it has drifted from the system and
should be pulled back.

**Two traps already sprung here, worth not repeating.** First, never
select these patterns positionally: `.tier:first-of-type` counted
*elements*, matched the section-head div rather than the first tier, and
the partner page's entire hierarchy silently failed to render with no
error anywhere. Use an explicit class (`.tierPrimary`). Second,
`globals.css` strips underlines site-wide, so any new context containing
running copy needs its own link affordance — body links inside `.rowBody`
inherited `--muted` and were literally indistinguishable from the text
around them (WCAG 1.4.1). `.prose a` / `.rowBody a` now cover it.
