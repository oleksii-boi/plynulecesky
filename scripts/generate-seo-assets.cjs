/**
 * Generate favicon + OG image assets from the brand glyph.
 * Run: node scripts/generate-seo-assets.mjs
 */
const { chromium } = require("@playwright/test");
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const GLYPH = fs.readFileSync(path.join(PUBLIC, "images/brand-glyph.svg"), "utf8");

const BG = "#EBF5FF";
const INK = "#1B222D";
const ACCENT = "#0059E0";

async function renderSvg({ width, height, background, padding = 0.18 }) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });

  const glyphWidth = Math.round(width * (1 - padding * 2));
  await page.setContent(`<!doctype html>
<html><head><style>
  html, body { margin: 0; width: ${width}px; height: ${height}px; background: ${background}; }
  .wrap { width: 100%; height: 100%; display: grid; place-items: center; }
  img { width: ${glyphWidth}px; height: auto; display: block; }
</style></head>
<body><div class="wrap"><img src="data:image/svg+xml;base64,${Buffer.from(GLYPH).toString("base64")}" alt="" /></div></body>
</html>`);

  const buf = await page.screenshot({ type: "png", omitBackground: background === "transparent" });
  await browser.close();
  return buf;
}

async function renderOg() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });

  await page.setContent(`<!doctype html>
<html><head><style>
  @font-face {
    font-family: Inter;
    src: local("Inter"), local("Arial");
  }
  html, body {
    margin: 0;
    width: 1200px;
    height: 630px;
    background: ${BG};
    color: ${INK};
    font-family: Inter, Arial, sans-serif;
  }
  .card {
    box-sizing: border-box;
    width: 1200px;
    height: 630px;
    padding: 72px 88px;
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 64px;
    align-items: center;
  }
  .mark {
    width: 280px;
    height: 400px;
    display: grid;
    place-items: center;
  }
  .mark img { width: 220px; height: auto; display: block; }
  .copy { display: flex; flex-direction: column; gap: 24px; }
  .brand {
    margin: 0;
    font-size: 84px;
    font-weight: 600;
    letter-spacing: -0.045em;
    line-height: 0.98;
  }
  .tag {
    margin: 0;
    max-width: 640px;
    font-size: 34px;
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: 1.25;
    color: #4a5563;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    width: fit-content;
    margin-top: 8px;
    padding: 12px 18px;
    border-radius: 999px;
    background: white;
    color: ${ACCENT};
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: ${ACCENT};
  }
</style></head>
<body>
  <div class="card">
    <div class="mark">
      <img src="data:image/svg+xml;base64,${Buffer.from(GLYPH).toString("base64")}" alt="" />
    </div>
    <div class="copy">
      <h1 class="brand">Plynule česky</h1>
      <p class="tag">Czech with Kateryna Leshchenko — A1–C1 lessons online.</p>
      <div class="pill"><span class="dot"></span>plynulecesky.cz</div>
    </div>
  </div>
</body></html>`);

  const buf = await page.screenshot({ type: "png" });
  await browser.close();
  return buf;
}

function writeWithPython(pngPath, outputs) {
  const py = `
from PIL import Image
from pathlib import Path

src = Image.open(${JSON.stringify(pngPath)}).convert("RGBA")
outputs = ${JSON.stringify(outputs)}

for item in outputs:
    out = Path(item["path"])
    size = item["size"]
    fmt = item["format"]
    bg = item.get("background")
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0) if bg is None else tuple(bg))
    # Fit glyph into ~70% of canvas
    target = int(size * 0.72)
    glyph = src.copy()
    glyph.thumbnail((target, target), Image.Resampling.LANCZOS)
    x = (size - glyph.width) // 2
    y = (size - glyph.height) // 2
    canvas.paste(glyph, (x, y), glyph)
    if fmt == "ICO":
        # Multi-size ICO from the largest canvas path is handled separately.
        canvas.save(out, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    else:
        if fmt == "JPEG":
            rgb = Image.new("RGB", canvas.size, (255, 255, 255))
            rgb.paste(canvas, mask=canvas.split()[-1])
            rgb.save(out, format="JPEG", quality=92, optimize=True)
        else:
            canvas.save(out, format=fmt, optimize=True)
    print(f"wrote {out}")
`;
  const result = spawnSync("python3", ["-"], {
    input: py,
    encoding: "utf8",
    cwd: ROOT,
  });
  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || "Pillow write failed");
  }
  process.stdout.write(result.stdout);
}

function pngToJpeg(pngPath, jpgPath) {
  const py = `
from PIL import Image
img = Image.open(${JSON.stringify(pngPath)}).convert("RGB")
img.save(${JSON.stringify(jpgPath)}, format="JPEG", quality=92, optimize=True)
print("wrote", ${JSON.stringify(jpgPath)})
`;
  const result = spawnSync("python3", ["-"], { input: py, encoding: "utf8", cwd: ROOT });
  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || "JPEG conversion failed");
  }
  process.stdout.write(result.stdout);
}

function makeIco(fromPng, toIco) {
  const py = `
from PIL import Image
src = Image.open(${JSON.stringify(fromPng)}).convert("RGBA")
sizes = [16, 32, 48]
images = []
for size in sizes:
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    glyph = src.copy()
    target = int(size * 0.78)
    glyph.thumbnail((target, target), Image.Resampling.LANCZOS)
    x = (size - glyph.width) // 2
    y = (size - glyph.height) // 2
    canvas.paste(glyph, (x, y), glyph)
    images.append(canvas)
images[0].save(
    ${JSON.stringify(toIco)},
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=images[1:],
)
print("wrote", ${JSON.stringify(toIco)})
`;
  const result = spawnSync("python3", ["-"], { input: py, encoding: "utf8", cwd: ROOT });
  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || "ICO write failed");
  }
  process.stdout.write(result.stdout);
}

(async () => {
  const tmpDir = path.join(ROOT, ".tmp-seo");
  fs.mkdirSync(tmpDir, { recursive: true });

  const glyphHi = path.join(tmpDir, "glyph-hi.png");
  fs.writeFileSync(glyphHi, await renderSvg({ width: 1024, height: 1024, background: "transparent", padding: 0.12 }));

  // Favicon SVG (transparent, browser-native)
  fs.copyFileSync(
    path.join(PUBLIC, "images/brand-glyph.svg"),
    path.join(PUBLIC, "favicon.svg")
  );

  writeWithPython(glyphHi, [
    { path: path.join(PUBLIC, "favicon-32x32.png"), size: 32, format: "PNG" },
    { path: path.join(PUBLIC, "favicon-48x48.png"), size: 48, format: "PNG" },
    { path: path.join(PUBLIC, "apple-touch-icon.png"), size: 180, format: "PNG", background: [235, 245, 255, 255] },
    { path: path.join(PUBLIC, "icon-192.png"), size: 192, format: "PNG", background: [235, 245, 255, 255] },
    { path: path.join(PUBLIC, "icon-512.png"), size: 512, format: "PNG", background: [235, 245, 255, 255] },
  ]);
  makeIco(glyphHi, path.join(PUBLIC, "favicon.ico"));

  const ogPng = path.join(tmpDir, "og.png");
  fs.writeFileSync(ogPng, await renderOg());
  pngToJpeg(ogPng, path.join(PUBLIC, "images/og.jpg"));

  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log("SEO assets generated.");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
