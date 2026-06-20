import sharp from "sharp";
import { readdir, unlink } from "node:fs/promises";
import { resolve, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const dir = fileURLToPath(new URL("../src/assets/images", import.meta.url));
const entries = await readdir(dir, { withFileTypes: true });

for (const entry of entries) {
  if (!entry.isFile()) continue;
  const ext = extname(entry.name).toLowerCase();
  if (ext !== ".jpg" && ext !== ".jpeg") continue;

  const src  = resolve(dir, entry.name);
  const dest = resolve(dir, basename(entry.name, ext) + ".webp");

  await sharp(src).webp({ quality: 90 }).toFile(dest);
  await unlink(src);
  console.log(`✓ ${entry.name} → ${basename(dest)}`);
}
