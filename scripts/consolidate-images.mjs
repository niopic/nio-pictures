import { access, copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));

const imageCopies = [
  {
    destination: "src/assets/images/home-about-portrait.jpg",
    sources: [
      "src/assets/images/home/about-portrait.jpg",
      "src/assets/images/home/home-hero-2.jpg",
    ],
  },
  {
    destination: "src/assets/images/home-about-main.jpg",
    sources: [
      "src/assets/images/home/about-main.jpg",
      "src/assets/images/home/home-hero-1.jpg",
    ],
  },
  {
    destination: "src/assets/images/home-events-panel.jpg",
    sources: [
      "src/assets/images/home/events-panel.jpg",
      "src/assets/images/home/home-panel-1.jpg",
    ],
  },
  {
    destination: "src/assets/images/home-family-panel.jpg",
    sources: [
      "src/assets/images/home/family-panel.jpg",
      "src/assets/images/home/home-panel-2.jpg",
    ],
  },
  {
    destination: "src/assets/images/home-events-hero.jpg",
    sources: [
      "src/assets/images/home/events-hero.jpg",
      "src/assets/images/home/home-hero-3.jpg",
    ],
  },
  {
    destination: "src/assets/images/home-family-hero.jpg",
    sources: [
      "src/assets/images/home/family-hero.jpg",
      "src/assets/images/home/home-hero-4.jpg",
    ],
  },
  {
    destination: "src/assets/images/home-grid-events.jpg",
    sources: [
      "src/assets/images/home/grid-events.jpg",
      "src/assets/images/home/home-grid-1.jpg",
    ],
  },
  {
    destination: "src/assets/images/home-grid-family.jpg",
    sources: [
      "src/assets/images/home/grid-family.jpg",
      "src/assets/images/home/home-grid-2.jpg",
    ],
  },
  {
    destination: "src/assets/images/home-grid-portrait.jpg",
    sources: [
      "src/assets/images/home/grid-portrait.jpg",
      "src/assets/images/home/home-grid-3.jpg",
    ],
  },
  {
    destination: "src/assets/images/events-hero.jpg",
    sources: [
      "src/assets/images/event-photography-katy-tx/events-hero.jpg",
      "src/assets/images/event-photography-katy-tx/event-hero-1.jpg",
    ],
  },
  {
    destination: "src/assets/images/events-panel.jpg",
    sources: [
      "src/assets/images/event-photography-katy-tx/events-panel.jpg",
      "src/assets/images/event-photography-katy-tx/event-panel-1.jpg",
    ],
  },
  {
    destination: "src/assets/images/events-about-portrait.jpg",
    sources: [
      "src/assets/images/event-photography-katy-tx/about-portrait.jpg",
      "src/assets/images/event-photography-katy-tx/event-hero-4.jpg",
    ],
  },
  {
    destination: "src/assets/images/events-about-main.jpg",
    sources: [
      "src/assets/images/event-photography-katy-tx/about-main.jpg",
      "src/assets/images/event-photography-katy-tx/event-hero-3.jpg",
    ],
  },
  {
    destination: "src/assets/images/events-family-hero.jpg",
    sources: [
      "src/assets/images/event-photography-katy-tx/family-hero.jpg",
      "src/assets/images/event-photography-katy-tx/event-hero-2.jpg",
    ],
  },
  {
    destination: "src/assets/images/events-family-panel.jpg",
    sources: [
      "src/assets/images/event-photography-katy-tx/family-panel.jpg",
      "src/assets/images/event-photography-katy-tx/event-panel-2.jpg",
    ],
  },
  {
    destination: "src/assets/images/family-hero.jpg",
    sources: [
      "src/assets/images/family-photography-katy-tx/family-hero.jpg",
      "src/assets/images/family-photography-katy-tx/family-hero-1.jpg",
    ],
  },
  {
    destination: "src/assets/images/family-panel.jpg",
    sources: [
      "src/assets/images/family-photography-katy-tx/family-panel.jpg",
      "src/assets/images/family-photography-katy-tx/family-panel-1.jpg",
    ],
  },
  {
    destination: "src/assets/images/family-about-portrait.jpg",
    sources: [
      "src/assets/images/family-photography-katy-tx/about-portrait.jpg",
      "src/assets/images/family-photography-katy-tx/family-hero-4.jpg",
    ],
  },
  {
    destination: "src/assets/images/family-about-main.jpg",
    sources: [
      "src/assets/images/family-photography-katy-tx/about-main.jpg",
      "src/assets/images/family-photography-katy-tx/family-hero-3.jpg",
    ],
  },
  {
    destination: "src/assets/images/family-events-hero.jpg",
    sources: [
      "src/assets/images/family-photography-katy-tx/events-hero.jpg",
      "src/assets/images/family-photography-katy-tx/family-hero-2.jpg",
    ],
  },
  {
    destination: "src/assets/images/family-events-panel.jpg",
    sources: [
      "src/assets/images/family-photography-katy-tx/events-panel.jpg",
      "src/assets/images/family-photography-katy-tx/family-panel-2.jpg",
    ],
  },
  {
    destination: "src/assets/images/about-main.jpg",
    sources: [
      "src/assets/images/about/main.jpg",
      "src/assets/images/about/about-hero-1.jpg",
    ],
  },
  {
    destination: "src/assets/images/portfolio-events-1.jpg",
    sources: [
      "src/assets/images/portfolio/events-hero.jpg",
      "src/assets/images/portfolio/portfolio-hero-1.jpg",
    ],
  },
  {
    destination: "src/assets/images/portfolio-events-2.jpg",
    sources: [
      "src/assets/images/portfolio/events-panel.jpg",
      "src/assets/images/portfolio/portfolio-panel-1.jpg",
    ],
  },
  {
    destination: "src/assets/images/portfolio-family-1.jpg",
    sources: [
      "src/assets/images/portfolio/family-hero.jpg",
      "src/assets/images/portfolio/portfolio-hero-2.jpg",
    ],
  },
  {
    destination: "src/assets/images/portfolio-family-2.jpg",
    sources: [
      "src/assets/images/portfolio/family-panel.jpg",
      "src/assets/images/portfolio/portfolio-panel-2.jpg",
    ],
  },
  {
    destination: "src/assets/images/portfolio-editorial-1.jpg",
    sources: [
      "src/assets/images/portfolio/about-main.jpg",
      "src/assets/images/portfolio/portfolio-hero-3.jpg",
    ],
  },
];

const exists = async (filePath) => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

const firstExistingSource = async (sources) => {
  for (const source of sources) {
    const absoluteSource = resolve(rootDir, source);
    if (await exists(absoluteSource)) {
      return { relative: source, absolute: absoluteSource };
    }
  }

  return null;
};

for (const { destination, sources } of imageCopies) {
  const absoluteDestination = resolve(rootDir, destination);

  if (await exists(absoluteDestination)) {
    console.log(`skipped ${destination}`);
    continue;
  }

  const source = await firstExistingSource(sources);

  if (!source) {
    console.log(`missing source for ${destination}`);
    continue;
  }

  await mkdir(dirname(absoluteDestination), { recursive: true });
  await copyFile(source.absolute, absoluteDestination);
  console.log(`✓ copied ${source.relative} -> ${destination}`);
}