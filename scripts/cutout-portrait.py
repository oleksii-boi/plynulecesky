"""Cut the studio black backdrop out of the portrait.

A plain flood fill leaves a dark halo, because the silhouette pixels are
blends of subject and backdrop. Here the border-connected black region only
seeds the matte: the outer band gets a luminance-derived alpha and its colour
is un-premultiplied against black, which removes the fringe.
"""

import sys

import numpy as np
from PIL import Image
from scipy import ndimage

SRC, DST = sys.argv[1], sys.argv[2]
PREVIEW = sys.argv[3] if len(sys.argv) > 3 else None

BACKDROP_MAX_LUMA = 20
RAMP_LO, RAMP_HI = 8.0, 72.0
CORE_EROSION = 3

rgb = np.asarray(Image.open(SRC).convert("RGB"), dtype=np.float32)
luma = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)

dark = luma < BACKDROP_MAX_LUMA
labels, count = ndimage.label(dark)
# Only the one big border-touching region is the backdrop; deep shadow folds
# in the sweater are just as dark and reach the bottom edge of the frame.
sizes = ndimage.sum(dark, labels, range(1, count + 1))
backdrop = ~ndimage.binary_fill_holes(labels != (int(np.argmax(sizes)) + 1))

core = ndimage.binary_erosion(~backdrop, np.ones((CORE_EROSION,) * 2), border_value=1)

alpha = np.clip((luma - RAMP_LO) / (RAMP_HI - RAMP_LO), 0.0, 1.0)
alpha[core] = 1.0
alpha[backdrop & ~ndimage.binary_dilation(core, np.ones((5, 5)))] = 0.0

out = np.clip(rgb / np.maximum(alpha, 0.15)[..., None], 0, 255)
out = np.where((alpha < 0.995)[..., None], out, rgb)

Image.fromarray(
    np.concatenate([out, alpha[..., None] * 255], axis=2).round().astype(np.uint8),
    "RGBA",
).save(DST)

if PREVIEW:
    lavender = np.array([241, 230, 255], dtype=np.float32)
    a = alpha[..., None]
    Image.fromarray((out * a + lavender * (1 - a)).round().astype(np.uint8)).save(PREVIEW)
