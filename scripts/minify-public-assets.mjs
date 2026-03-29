import { build } from "esbuild";
import { copyFile, readdir } from "node:fs/promises";
import path from "node:path";

const distRoot = path.resolve("dist/assets");
const projectRoot = path.resolve(".");

async function getFiles(dirPath, extensions) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        return getFiles(fullPath, extensions);
      }
      return extensions.has(path.extname(entry.name)) ? [fullPath] : [];
    }),
  );

  return files.flat();
}

async function minifyAssets() {
  const cssFiles = await getFiles(
    path.join(distRoot, "css"),
    new Set([".css"]),
  );
  const jsFiles = await getFiles(path.join(distRoot, "js"), new Set([".js"]));

  if (cssFiles.length) {
    await build({
      entryPoints: cssFiles,
      allowOverwrite: true,
      bundle: false,
      minify: true,
      outdir: path.join(distRoot, "css"),
      logLevel: "silent",
    });
  }

  if (jsFiles.length) {
    await build({
      entryPoints: jsFiles,
      allowOverwrite: true,
      bundle: false,
      minify: true,
      outdir: path.join(distRoot, "js"),
      logLevel: "silent",
    });
  }

  await Promise.all([
    copyFile(path.join(projectRoot, "_headers"), path.resolve("dist/_headers")),
    copyFile(
      path.join(projectRoot, "_redirects"),
      path.resolve("dist/_redirects"),
    ),
  ]);
}

await minifyAssets();
