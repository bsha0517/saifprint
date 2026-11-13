/**
 * Generates optimised responsive images and brand assets.
 *
 *   npm run assets
 *
 * Inputs:  assets/photos/*.jpg   (original stock photos — see IMAGE-CREDITS.md)
 *          assets/brand/al-saif-logo-original.png (official logo, transparent PNG)
 * Outputs: public/images/<name>-<width>.webp
 *          src/config/image-manifest.json (intrinsic sizes, used to prevent layout shift)
 *          public/brand/al-saif-logo(-header).{png,webp}, src/config/brand-manifest.json,
 *          public/favicon.ico, public/apple-touch-icon.png,
 *          public/icon-192.png, public/icon-512.png, public/og-image.jpg
 *
 * Generated files are committed so the site builds without running this script.
 */
import { readdir, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const photosDir = path.join(root, "assets", "photos");
const outDir = path.join(root, "public", "images");
const publicDir = path.join(root, "public");

const WIDTHS = [480, 768, 1080, 1440, 1920];
const QUALITY = 72;

await mkdir(outDir, { recursive: true });

const manifest = {};
for (const file of (await readdir(photosDir)).filter((f) => f.endsWith(".jpg")).sort()) {
  const name = file.replace(/\.jpg$/, "");
  const input = sharp(path.join(photosDir, file)).rotate();
  const { width, height } = await input.metadata();
  const widths = WIDTHS.filter((w) => w <= width);
  if (!widths.includes(width) && width < WIDTHS.at(-1)) widths.push(width);
  for (const w of widths) {
    await sharp(path.join(photosDir, file))
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(path.join(outDir, `${name}-${w}.webp`));
  }
  manifest[name] = { width, height, widths };
  console.log(`✓ ${name} (${width}×${height}) → ${widths.join(", ")}`);
}
await writeFile(
  path.join(root, "src", "config", "image-manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);

// ---- Brand assets (from the official logo supplied by Al-Saif) -------------
// assets/brand/al-saif-logo-original.png: 2172×724 transparent PNG.
// Regions measured from the artwork: full lockup, "AP" monogram, tagline row.
const logoSrc = path.join(root, "assets", "brand", "al-saif-logo-original.png");
const LOCKUP = { left: 186, top: 160, width: 1999 - 186, height: 556 - 160 };
const MONOGRAM = { left: 186, top: 160, width: 773 - 186, height: 556 - 160 };
const TAGLINE = { left: 879 - 186, top: 500 - 160 }; // relative to LOCKUP; cleared for the header variant
const brandDir = path.join(publicDir, "brand");
await mkdir(brandDir, { recursive: true });

const pad = 24;
const lockup = await sharp(logoSrc).extract(LOCKUP).extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
// Full lockup (with "Printing | Packaging | Finishing" tagline) — footer & social image
await sharp(lockup).resize({ width: 960 }).png({ compressionLevel: 9 }).toFile(path.join(brandDir, "al-saif-logo.png"));
await sharp(lockup).resize({ width: 960 }).webp({ quality: 90 }).toFile(path.join(brandDir, "al-saif-logo.webp"));

// Header lockup: same artwork with the small tagline removed (illegible at header size).
// Clear the alpha channel inside the tagline box of the raw RGBA pixels.
const { data: px, info: pxInfo } = await sharp(logoSrc).extract(LOCKUP).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let y = TAGLINE.top; y < pxInfo.height; y++) {
  for (let x = TAGLINE.left; x < pxInfo.width; x++) px[(y * pxInfo.width + x) * 4 + 3] = 0;
}
const headerLogo = await sharp(px, { raw: { width: pxInfo.width, height: pxInfo.height, channels: 4 } }).png().toBuffer();
const trimmedHeader = await sharp(headerLogo).trim({ threshold: 1 }).png().toBuffer();
await sharp(trimmedHeader).resize({ height: 112 }).png({ compressionLevel: 9 }).toFile(path.join(brandDir, "al-saif-logo-header.png"));
await sharp(trimmedHeader).resize({ height: 112 }).webp({ quality: 90 }).toFile(path.join(brandDir, "al-saif-logo-header.webp"));
const hm = await sharp(path.join(brandDir, "al-saif-logo-header.png")).metadata();
const fm = await sharp(path.join(brandDir, "al-saif-logo.png")).metadata();
await writeFile(
  path.join(root, "src", "config", "brand-manifest.json"),
  JSON.stringify({ header: { width: hm.width, height: hm.height }, full: { width: fm.width, height: fm.height } }, null, 2) + "\n",
);

// App / favicon icons: the "AP" monogram centred on a white rounded tile
async function iconTile(size) {
  const inner = Math.round(size * 0.78);
  const mono = await sharp(logoSrc).extract(MONOGRAM).resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const r = Math.round(size * 0.18);
  const tile = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="#FFFFFF"/></svg>`);
  return sharp(tile).composite([{ input: mono, gravity: "centre" }]).png().toBuffer();
}
await writeFile(path.join(publicDir, "apple-touch-icon.png"), await sharp(await iconTile(180)).flatten({ background: "#FFFFFF" }).png().toBuffer());
await writeFile(path.join(publicDir, "icon-192.png"), await iconTile(192));
await writeFile(path.join(publicDir, "icon-512.png"), await iconTile(512));

// favicon.ico containing a single 32×32 PNG (valid ICO with PNG payload)
const png32 = await iconTile(32);
const ico = Buffer.alloc(22);
ico.writeUInt16LE(0, 0); // reserved
ico.writeUInt16LE(1, 2); // type: icon
ico.writeUInt16LE(1, 4); // count
ico.writeUInt8(32, 6); // width
ico.writeUInt8(32, 7); // height
ico.writeUInt8(0, 8); // palette
ico.writeUInt8(0, 9); // reserved
ico.writeUInt16LE(1, 10); // colour planes
ico.writeUInt16LE(32, 12); // bits per pixel
ico.writeUInt32LE(png32.length, 14); // size
ico.writeUInt32LE(22, 18); // offset
await writeFile(path.join(publicDir, "favicon.ico"), Buffer.concat([ico, png32]));

// Open Graph / social sharing image (1200×630)
const W = 1200;
const H = 630;
const photo = await sharp(path.join(photosDir, "hero-offset-press-in-motion.jpg"))
  .resize(560, H, { fit: "cover", position: "centre" })
  .toBuffer();
const card = await sharp(lockup).resize({ width: 520 }).png().toBuffer();
const cardMeta = await sharp(card).metadata();
const overlay = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#171D3D" stop-opacity="1"/>
      <stop offset="1" stop-color="#171D3D" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="640" y="0" width="140" height="${H}" fill="url(#fade)"/>
  <rect x="56" y="56" width="${cardMeta.width + 24}" height="${cardMeta.height + 24}" rx="18" fill="#FFFFFF"/>
  <rect x="68" y="${56 + cardMeta.height + 24 + 44}" width="64" height="4" fill="#C99B2B"/>
  <text x="68" y="${56 + cardMeta.height + 24 + 104}" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="700" fill="#FFFFFF">Printing &amp; Packaging</text>
  <text x="68" y="${56 + cardMeta.height + 24 + 154}" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="700" fill="#FFFFFF">Solutions in Lahore</text>
  <text x="68" y="${56 + cardMeta.height + 24 + 210}" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#C9CDE0">Offset printing · Custom packaging · Print finishing</text>
</svg>`);
await sharp({ create: { width: W, height: H, channels: 3, background: "#171D3D" } })
  .composite([
    { input: photo, left: W - 560, top: 0 },
    { input: overlay, left: 0, top: 0 },
    { input: card, left: 68, top: 68 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(publicDir, "og-image.jpg"));

console.log("✓ brand assets and og-image.jpg");
