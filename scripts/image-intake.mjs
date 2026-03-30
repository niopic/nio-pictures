import sharp from "sharp";
import { access, mkdir, readdir, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const ROOT = process.cwd();
const IMAGES_ROOT = path.join(ROOT, "src", "assets", "images");
const PREVIEW_ROOT = path.join(ROOT, ".tmp", "image-intake-previews");

const SLOT_PROFILES = {
  "about-hero-1": { width: 1600, height: 1200, kind: "landscape" },
  "event-hero-1": { width: 1200, height: 1600, kind: "portrait" },
  "event-panel-1": { width: 1920, height: 1080, kind: "landscape" },
  "event-hero-2": { width: 1200, height: 1600, kind: "portrait" },
  "event-panel-2": { width: 1920, height: 1080, kind: "landscape" },
  "event-hero-3": { width: 1600, height: 1200, kind: "landscape" },
  "event-hero-4": { width: 1200, height: 1600, kind: "portrait" },
  "family-hero-1": { width: 1200, height: 1600, kind: "portrait" },
  "family-panel-1": { width: 1920, height: 1080, kind: "landscape" },
  "family-hero-2": { width: 1200, height: 1600, kind: "portrait" },
  "family-panel-2": { width: 1920, height: 1080, kind: "landscape" },
  "family-hero-3": { width: 1600, height: 1200, kind: "landscape" },
  "family-hero-4": { width: 1200, height: 1600, kind: "portrait" },
  "home-hero-1": { width: 1600, height: 1200, kind: "landscape" },
  "home-hero-2": { width: 1200, height: 1600, kind: "portrait" },
  "home-grid-1": { width: 1600, height: 1200, kind: "landscape" },
  "home-grid-2": { width: 1200, height: 1600, kind: "portrait" },
  "home-grid-3": { width: 1800, height: 1200, kind: "landscape" },
  "home-hero-3": { width: 1200, height: 1600, kind: "portrait" },
  "home-hero-4": { width: 1200, height: 1600, kind: "portrait" },
  "home-panel-1": { width: 1920, height: 1080, kind: "landscape" },
  "home-panel-2": { width: 1920, height: 1080, kind: "landscape" },
  "portfolio-hero-1": { width: 1200, height: 1600, kind: "portrait" },
  "portfolio-panel-1": { width: 1920, height: 1080, kind: "landscape" },
  "portfolio-hero-2": { width: 1200, height: 1600, kind: "portrait" },
  "portfolio-panel-2": { width: 1920, height: 1080, kind: "landscape" },
  "portfolio-hero-3": { width: 1600, height: 1200, kind: "landscape" },
};

const SLOT_BUDGETS_KB = {
  "event-hero-1": 260,
  "event-hero-2": 260,
  "event-hero-4": 260,
  "family-hero-1": 260,
  "family-hero-2": 260,
  "family-hero-4": 260,
  "home-hero-2": 260,
  "home-grid-2": 260,
  "home-hero-3": 260,
  "home-hero-4": 260,
  "portfolio-hero-1": 260,
  "portfolio-hero-2": 260,
  "about-hero-1": 320,
  "event-hero-3": 320,
  "family-hero-3": 320,
  "home-hero-1": 320,
  "home-grid-1": 320,
  "home-grid-3": 320,
  "portfolio-hero-3": 320,
  "event-panel-1": 380,
  "event-panel-2": 380,
  "family-panel-1": 380,
  "family-panel-2": 380,
  "home-panel-1": 380,
  "home-panel-2": 380,
  "portfolio-panel-1": 380,
  "portfolio-panel-2": 380,
};

const DEFAULT_BUDGET_KB = 350;

const SLOT_ALIASES = {
  "about-page-hero": "about-hero-1",
  "home-about-hero": "home-hero-1",
  "home-about-hero-2": "home-hero-2",
  "home-service-hero-1": "home-hero-3",
  "home-service-hero-2": "home-hero-4",
  "home-service-panel-1": "home-panel-1",
  "home-service-panel-2": "home-panel-2",
  "event-page-hero": "event-hero-1",
  "event-page-panel": "event-panel-1",
  "event-page-support-hero": "event-hero-2",
  "event-page-support-panel": "event-panel-2",
  "event-page-about-hero": "event-hero-3",
  "event-page-about-hero-2": "event-hero-4",
  "family-page-hero": "family-hero-1",
  "family-page-panel": "family-panel-1",
  "family-page-support-hero": "family-hero-2",
  "family-page-support-panel": "family-panel-2",
  "family-page-about-hero": "family-hero-3",
  "family-page-about-hero-2": "family-hero-4",
  "portfolio-hero": "portfolio-hero-1",
  "portfolio-panel": "portfolio-panel-1",
  "portfolio-support-hero": "portfolio-hero-2",
  "portfolio-support-panel": "portfolio-panel-2",
  "portfolio-about-hero": "portfolio-hero-3",
  "about-hero": "about-hero-1",
  "events-hero": "event-hero-1",
  "events-panel": "event-panel-1",
  "family-hero": "family-hero-1",
  "family-panel": "family-panel-1",
  "about-main": "home-hero-1",
  "about-portrait": "home-hero-2",
  "grid-events": "home-grid-1",
  "grid-family": "home-grid-2",
  "grid-portrait": "home-grid-3",
  "grid-1": "home-grid-1",
  "grid-2": "home-grid-2",
  "grid-3": "home-grid-3",
  grid1: "home-grid-1",
  grid2: "home-grid-2",
  grid3: "home-grid-3",
  "event-hero": "event-hero-1",
  "event-panel": "event-panel-1",
  "bg-image": "home-panel-1",
  "bg-image-wide": "home-panel-1",
  main: "home-hero-1",
};

const FOCUS_MAP = {
  center: "center",
  centre: "centre",
  north: "north",
  south: "south",
  east: "east",
  west: "west",
  northeast: "northeast",
  northwest: "northwest",
  southeast: "southeast",
  southwest: "southwest",
  attention: sharp.strategy.attention,
  entropy: sharp.strategy.entropy,
};

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }

  return args;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function toNumber(value, fallback = null) {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

async function pathExists(filePath) {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function listPages() {
  const entries = await readdir(IMAGES_ROOT, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

async function listSlotsForPage(page) {
  const pageDir = path.join(IMAGES_ROOT, page);
  const entries = await readdir(pageDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && /\.jpe?g$/i.test(entry.name))
    .map((entry) => entry.name.replace(/\.(jpe?g)$/i, ""))
    .sort();
}

function computeExtractBox(srcWidth, srcHeight, targetRatio, focalX, focalY) {
  const sourceRatio = srcWidth / srcHeight;

  let cropWidth;
  let cropHeight;

  if (sourceRatio > targetRatio) {
    cropHeight = srcHeight;
    cropWidth = Math.round(cropHeight * targetRatio);
  } else {
    cropWidth = srcWidth;
    cropHeight = Math.round(cropWidth / targetRatio);
  }

  const fx = clamp(focalX, 0, 1);
  const fy = clamp(focalY, 0, 1);

  const left = clamp(Math.round(fx * srcWidth - cropWidth / 2), 0, srcWidth - cropWidth);
  const top = clamp(Math.round(fy * srcHeight - cropHeight / 2), 0, srcHeight - cropHeight);

  return {
    left,
    top,
    width: cropWidth,
    height: cropHeight,
  };
}

function printUsage() {
  output.write("Usage:\n");
  output.write("  npm run image:intake -- --src \"C:/photos/image.jpg\" --page portfolio --slot events-hero [--force]\n\n");
  output.write("Options:\n");
  output.write("  --src <path>       Source image path\n");
  output.write("  --page <folder>    Target page folder under src/assets/images\n");
  output.write("  --slot <name>      Slot filename without extension (aliases supported)\n");
  output.write("                      Examples: event-panel, bg-image, grid-1\n");
  output.write("  --focus <mode>     attention|entropy|center|north|south|...\n");
  output.write("  --x <0..1>         Manual focal X (overrides focus)\n");
  output.write("  --y <0..1>         Manual focal Y (overrides focus)\n");
  output.write("  --max-kb <n>       Max output size in KB (default is slot-based)\n");
  output.write("  --min-quality <n>  Minimum JPEG quality floor [default: 55]\n");
  output.write("  --quality <n>      Starting JPEG quality [default: 90]\n");
  output.write("  --no-autocompress  Disable size budget compression\n");
  output.write("  --force            Overwrite target file\n");
  output.write("  --preview          Save a preview image before writing target\n");
  output.write("  --preview-only     Save preview only, do not write target\n");
  output.write("  --dry-run          Print target and crop settings only\n");
  output.write("  --list             List page folders and available slots\n");
  output.write("  --help             Show this help\n");
}

function normalizeSlot(slotName) {
  const normalized = String(slotName || "").trim().toLowerCase();
  return SLOT_ALIASES[normalized] || normalized;
}

function getAliasesForSlot(slotName) {
  return Object.keys(SLOT_ALIASES).filter((alias) => SLOT_ALIASES[alias] === slotName);
}

function makeTimestamp() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const sec = String(now.getSeconds()).padStart(2, "0");
  return `${yyyy}${mm}${dd}-${hh}${min}${sec}`;
}

async function askYesNo(questionText) {
  if (!process.stdin.isTTY) {
    return false;
  }

  const rl = createInterface({ input, output });
  try {
    const answer = (await rl.question(questionText)).trim().toLowerCase();
    return answer === "y" || answer === "yes";
  } finally {
    rl.close();
  }
}

async function promptIfMissing(args) {
  if (!process.stdin.isTTY) {
    return args;
  }

  const rl = createInterface({ input, output });

  try {
    if (!args.src) {
      args.src = (await rl.question("Source image path: ")).trim();
    }

    const pages = await listPages();
    if (!args.page) {
      output.write(`Pages: ${pages.join(", ")}\n`);
      args.page = (await rl.question("Page folder: ")).trim();
    }

    if (args.page && pages.includes(args.page)) {
      const slots = await listSlotsForPage(args.page);
      if (!args.slot) {
        output.write(`Slots in ${args.page}: ${slots.join(", ")}\n`);
        args.slot = (await rl.question("Slot: ")).trim();
      }
    }

    if (!args.focus && args.x === undefined && args.y === undefined) {
      const answer = (await rl.question("Focus mode (attention/entropy/center/north) [attention]: ")).trim();
      args.focus = answer || "attention";
    }
  } finally {
    rl.close();
  }

  return args;
}

function getBudgetKB(slot, args) {
  const overrideBudget = toNumber(args["max-kb"], null);
  if (overrideBudget !== null && overrideBudget > 0) {
    return overrideBudget;
  }

  return SLOT_BUDGETS_KB[slot] || DEFAULT_BUDGET_KB;
}

async function encodeJpegWithBudget(imagePipeline, options) {
  const {
    targetKB,
    startQuality,
    minQuality,
    disableAutoCompress,
  } = options;

  const qualityStart = clamp(Math.round(startQuality), 1, 100);
  const qualityMin = clamp(Math.round(minQuality), 1, 100);
  const step = 5;

  let best = null;

  for (let quality = qualityStart; quality >= qualityMin; quality -= step) {
    const buffer = await imagePipeline
      .clone()
      .jpeg({
        quality,
        progressive: true,
        mozjpeg: true,
        chromaSubsampling: "4:4:4",
      })
      .toBuffer();

    const sizeKB = Math.round((buffer.length / 1024) * 10) / 10;
    best = { buffer, quality, sizeKB };

    if (disableAutoCompress || sizeKB <= targetKB) {
      return {
        ...best,
        metBudget: sizeKB <= targetKB,
      };
    }
  }

  return {
    ...best,
    metBudget: best ? best.sizeKB <= targetKB : false,
  };
}

async function run() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printUsage();
    return;
  }

  if (args.list) {
    const pages = args.page ? [args.page] : await listPages();
    for (const page of pages) {
      const pageDir = path.join(IMAGES_ROOT, page);
      if (!(await pathExists(pageDir))) {
        throw new Error(`Unknown page folder: ${page}`);
      }
      const slots = await listSlotsForPage(page);
      output.write(`${page}:\n`);
      for (const slot of slots) {
        const aliases = getAliasesForSlot(slot);
        if (aliases.length) {
          output.write(`  - ${slot} (aliases: ${aliases.join(", ")})\n`);
        } else {
          output.write(`  - ${slot}\n`);
        }
      }
    }
    return;
  }

  await promptIfMissing(args);

  if (!args.src || !args.page || !args.slot) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const sourcePath = path.resolve(args.src);
  if (!(await pathExists(sourcePath))) {
    throw new Error(`Source image not found: ${sourcePath}`);
  }

  const pageDir = path.join(IMAGES_ROOT, args.page);
  if (!(await pathExists(pageDir))) {
    throw new Error(`Unknown page folder: ${args.page}`);
  }

  const resolvedSlot = normalizeSlot(args.slot);

  const availableSlots = await listSlotsForPage(args.page);
  if (!availableSlots.includes(resolvedSlot)) {
    throw new Error(`Unknown slot for page '${args.page}': ${args.slot}`);
  }

  const targetPath = path.join(pageDir, `${resolvedSlot}.jpg`);
  const targetExists = await pathExists(targetPath);

  const profile = SLOT_PROFILES[resolvedSlot] || { width: 1600, height: 1200, kind: "landscape" };
  const targetKB = getBudgetKB(resolvedSlot, args);
  const minQuality = toNumber(args["min-quality"], 55);
  const startQuality = toNumber(args.quality, 90);
  const disableAutoCompress = Boolean(args["no-autocompress"]);

  const focalX = toNumber(args.x, null);
  const focalY = toNumber(args.y, null);

  const image = sharp(sourcePath).rotate();
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error("Could not read source image dimensions.");
  }

  let pipeline;
  let modeLabel;

  if (focalX !== null && focalY !== null) {
    const ratio = profile.width / profile.height;
    const box = computeExtractBox(metadata.width, metadata.height, ratio, focalX, focalY);

    pipeline = image.extract(box).resize(profile.width, profile.height, { fit: "fill" });
    modeLabel = `manual focal point (x=${clamp(focalX, 0, 1)}, y=${clamp(focalY, 0, 1)})`;
  } else {
    const focusKey = String(args.focus || "attention").toLowerCase();
    const defaultPosition = profile.kind === "portrait" ? "north" : sharp.strategy.attention;
    const position = FOCUS_MAP[focusKey] ?? defaultPosition;

    pipeline = image.resize(profile.width, profile.height, {
      fit: "cover",
      position,
    });

    modeLabel = `auto focus (${focusKey}${focusKey === "attention" && profile.kind === "portrait" ? " with portrait-safe top bias fallback" : ""})`;
  }

  if (args["dry-run"]) {
    output.write(
      `Dry run only.\nTarget: ${targetPath}\nOutput: ${profile.width}x${profile.height}\nMode: ${modeLabel}\nBudget: ${targetKB} KB${disableAutoCompress ? " (disabled)" : ""}\n`,
    );
    return;
  }

  const encoded = await encodeJpegWithBudget(pipeline, {
    targetKB,
    startQuality,
    minQuality,
    disableAutoCompress,
  });

  if (!encoded || !encoded.buffer) {
    throw new Error("Failed to encode output image.");
  }

  const outputBuffer = encoded.buffer;

  if (args.preview || args["preview-only"]) {
    await mkdir(PREVIEW_ROOT, { recursive: true });
    const previewFileName = `${args.page}-${resolvedSlot}-${makeTimestamp()}.jpg`;
    const previewPath = path.join(PREVIEW_ROOT, previewFileName);
    await writeFile(previewPath, outputBuffer);
    output.write(`Preview saved: ${previewPath}\n`);
  }

  if (args["preview-only"]) {
    output.write("Preview-only mode: target file was not modified.\n");
    return;
  }

  if (targetExists && !args.force) {
    if (args.preview) {
      const confirmed = await askYesNo("Target exists. Apply this preview crop to the real file? (y/N): ");
      if (!confirmed) {
        output.write("Cancelled before overwrite.\n");
        return;
      }
    } else {
      throw new Error(`Target exists. Re-run with --force or use --preview first: ${targetPath}`);
    }
  }

  await writeFile(targetPath, outputBuffer);

  output.write("Saved image successfully.\n");
  output.write(`Target: ${targetPath}\n`);
  if (resolvedSlot !== args.slot) {
    output.write(`Alias resolved: ${args.slot} -> ${resolvedSlot}\n`);
  }
  output.write(`Output: ${profile.width}x${profile.height}\n`);
  output.write(`Mode: ${modeLabel}\n`);
  output.write(`Quality: ${encoded.quality}\n`);
  output.write(`Size: ${encoded.sizeKB} KB (budget ${targetKB} KB)\n`);

  if (!encoded.metBudget && !disableAutoCompress) {
    output.write(
      "Warning: Could not meet target size budget before reaching minimum quality.\n",
    );
  }
}

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
