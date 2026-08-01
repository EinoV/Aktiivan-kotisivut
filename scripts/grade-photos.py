"""Grade the Turku source photographs for the subpages.

Run from the repo root with the unmodified Wikimedia Commons originals
in ./sources (or set AKTIIVA_PHOTO_SRC). The originals are deliberately
not committed - only the graded output in public/photos/ is.

    tse-building.jpg  Turku School of Economics  Anneli Salo     CC BY-SA 3.0
    tse-entrance.jpg  TSE main entrance          Samuli Lintula  CC BY-SA 3.0
    turku-aerial.jpg  Aerial view of Turku       kallerna        CC BY-SA 4.0

design-system.md §3 defines the house recipe, but it was tuned for the
hero, where the photo is a dark bed for off-white text. These images sit
on --paper as editorial filler, so the darkening steps are backed off —
which §3 itself sanctions ("If step 6 pushes past 'moody' into
'illegible', back it off"). Desaturation and the navy shadow tint are
kept at full strength, because those are what make a photo look like it
belongs to this brand rather than like a stock image.
"""

import os

from PIL import Image, ImageChops, ImageEnhance

NAVY = (17, 32, 53)
SRC = os.environ.get("AKTIIVA_PHOTO_SRC", "sources")
OUT = "public/photos"


def zoom_in(im, factor, hfocus=0.5, vfocus=0.5):
    """Crop to a sub-rectangle before the aspect crop, so two bands cut
    from the same source read as genuinely different photographs rather
    than as the same view twice."""
    if factor >= 1.0:
        return im
    w, h = im.size
    nw, nh = int(w * factor), int(h * factor)
    left = int((w - nw) * hfocus)
    top = int((h - nh) * vfocus)
    return im.crop((left, top, left + nw, top + nh))


def crop_to(im, ratio, focus=0.5):
    """Crop to an aspect ratio, focus = 0 top/left .. 1 bottom/right."""
    w, h = im.size
    target_h = w / ratio
    if target_h <= h:
        top = (h - target_h) * focus
        box = (0, top, w, top + target_h)
    else:
        target_w = h * ratio
        left = (w - target_w) * focus
        box = (left, 0, left + target_w, h)
    return im.crop([int(v) for v in box])


def grade(im, sat=0.65, contrast=1.02, brightness=1.0, shadow=0.18, overlay=0.08):
    im = ImageEnhance.Color(im).enhance(sat)
    im = ImageEnhance.Contrast(im).enhance(contrast)
    im = ImageEnhance.Brightness(im).enhance(brightness)
    # Shadow-toward-navy: inverted luminance mask so shadows weight highest.
    lum = im.convert("L")
    mask = ImageChops.invert(lum).point(lambda v: int(v * shadow))
    im = Image.composite(Image.new("RGB", im.size, NAVY), im, mask)
    # Light unifying overlay, far below the hero's 27%.
    return Image.blend(im, Image.new("RGB", im.size, NAVY), overlay)


JOBS = [
    # (source, output, aspect, width, vertical focus, zoom, h-focus)
    ("tse-building.jpg", "tse-building-wide.jpg", 16 / 7, 1600, 0.55, 1.0, 0.5),
    ("turku-aerial.jpg", "turku-aerial-wide.jpg", 16 / 7, 1600, 0.5, 1.0, 0.5),
    ("tse-entrance.jpg", "tse-entrance-wide.jpg", 16 / 7, 1600, 0.5, 1.0, 0.5),
    # Second cuts from the same two sources, zoomed and offset so they
    # read as different photographs on /tyopaikat and /yhteystiedot.
    ("turku-aerial.jpg", "turku-riverside-wide.jpg", 16 / 7, 1600, 0.6, 0.55, 0.68),
    ("tse-building.jpg", "tse-facade-wide.jpg", 16 / 7, 1600, 0.45, 0.5, 0.72),
    ("tse-entrance.jpg", "tse-entrance-card.jpg", 4 / 3, 900, 0.5, 1.0, 0.5),
    ("tse-building.jpg", "tse-building-card.jpg", 4 / 3, 900, 0.55, 1.0, 0.5),
    ("turku-aerial.jpg", "turku-aerial-card.jpg", 4 / 3, 900, 0.5, 1.0, 0.5),
]

for src, dst, ratio, width, focus, zoom, hfocus in JOBS:
    im = Image.open(f"{SRC}/{src}").convert("RGB")
    im = zoom_in(im, zoom, hfocus, focus)
    im = crop_to(im, ratio, focus)
    im = im.resize((width, int(width / ratio)), Image.LANCZOS)
    im = grade(im)
    im.save(f"{OUT}/{dst}", "JPEG", quality=82, optimize=True, progressive=True)
    print(f"{dst:26} {im.size[0]}x{im.size[1]}")
