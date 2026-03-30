# Image Organization Structure

**Last Updated:** March 29, 2026

This document describes the 1-to-1 page-specific image organization for NiO Pictures. Each page has its own unique image set — **no image reuse across pages**.

---

## Folder Structure

```
src/assets/images/
├── home/                            (9 images)
│   ├── about-portrait.jpg
│   ├── about-main.jpg
│   ├── events-panel.jpg
│   ├── events-hero.jpg
│   ├── family-panel.jpg
│   ├── family-hero.jpg
│   ├── grid-events.jpg
│   ├── grid-family.jpg
│   └── grid-portrait.jpg
│
├── about/                           (1 image)
│   └── main.jpg
│
├── event-photography-katy-tx/       (6 images)
│   ├── about-portrait.jpg
│   ├── about-main.jpg
│   ├── events-panel.jpg
│   ├── events-hero.jpg
│   ├── family-panel.jpg
│   └── family-hero.jpg
│
├── family-photography-katy-tx/      (6 images)
│   ├── about-portrait.jpg
│   ├── about-main.jpg
│   ├── events-panel.jpg
│   ├── events-hero.jpg
│   ├── family-panel.jpg
│   └── family-hero.jpg
│
├── portfolio/                       (5 images)
│   ├── about-main.jpg
│   ├── events-panel.jpg
│   ├── events-hero.jpg
│   ├── family-panel.jpg
│   └── family-hero.jpg
│
├── about/                           (legacy, archived)
├── heroes/                          (legacy, archived)
├── panels/                          (legacy, archived)
├── bkp/                             (backup)
└── [other assets]
```

---

## Page-to-Image Mapping

### Home Page (`src/pages/index.astro`)

**Location:** `src/assets/images/home/`  
**Total Images:** 9

| Filename             | Usage                                   | Dimensions       |
| -------------------- | --------------------------------------- | ---------------- |
| `about-portrait.jpg` | About section — tall portrait           | ~3:4 (portrait)  |
| `about-main.jpg`     | About section — secondary shot          | ~4:3 (landscape) |
| `events-panel.jpg`   | Events service card panel (background)  | ~16:9 (wide)     |
| `events-hero.jpg`    | Events service card thumbnail           | ~3:4 (portrait)  |
| `family-panel.jpg`   | Family service card panel (background)  | ~16:9 (wide)     |
| `family-hero.jpg`    | Family service card thumbnail           | ~3:4 (portrait)  |
| `grid-events.jpg`    | Featured grid — events image (large)    | ~4:3 (landscape) |
| `grid-family.jpg`    | Featured grid — family image (portrait) | ~3:4 (portrait)  |
| `grid-portrait.jpg`  | Featured grid — portrait image (large)  | ~3:2 (landscape) |

---

### About Page (`src/pages/about.astro`)

**Location:** `src/assets/images/about/`  
**Total Images:** 1

| Filename   | Usage            | Dimensions       |
| ---------- | ---------------- | ---------------- |
| `main.jpg` | Main about photo | ~4:3 (landscape) |

---

### Event Photography Page (`src/pages/event-photography-katy-tx.astro`)

**Location:** `src/assets/images/event-photography-katy-tx/`  
**Total Images:** 6

| Filename             | Usage                          | Dimensions       |
| -------------------- | ------------------------------ | ---------------- |
| `about-portrait.jpg` | About section — tall portrait  | ~3:4 (portrait)  |
| `about-main.jpg`     | About section — secondary shot | ~4:3 (landscape) |
| `events-panel.jpg`   | Events service card panel      | ~16:9 (wide)     |
| `events-hero.jpg`    | Events service card thumbnail  | ~3:4 (portrait)  |
| `family-panel.jpg`   | Family service card panel      | ~16:9 (wide)     |
| `family-hero.jpg`    | Family service card thumbnail  | ~3:4 (portrait)  |

---

### Family Photography Page (`src/pages/family-photography-katy-tx.astro`)

**Location:** `src/assets/images/family-photography-katy-tx/`  
**Total Images:** 6

| Filename             | Usage                          | Dimensions       |
| -------------------- | ------------------------------ | ---------------- |
| `about-portrait.jpg` | About section — tall portrait  | ~3:4 (portrait)  |
| `about-main.jpg`     | About section — secondary shot | ~4:3 (landscape) |
| `events-panel.jpg`   | Events service card panel      | ~16:9 (wide)     |
| `events-hero.jpg`    | Events service card thumbnail  | ~3:4 (portrait)  |
| `family-panel.jpg`   | Family service card panel      | ~16:9 (wide)     |
| `family-hero.jpg`    | Family service card thumbnail  | ~3:4 (portrait)  |

---

### Portfolio Page (`src/pages/portfolio.astro`)

**Location:** `src/assets/images/portfolio/`  
**Total Images:** 5

| Filename           | Usage                         | Dimensions       |
| ------------------ | ----------------------------- | ---------------- |
| `about-main.jpg`   | About section photo           | ~4:3 (landscape) |
| `events-panel.jpg` | Events service card panel     | ~16:9 (wide)     |
| `events-hero.jpg`  | Events service card thumbnail | ~3:4 (portrait)  |
| `family-panel.jpg` | Family service card panel     | ~16:9 (wide)     |
| `family-hero.jpg`  | Family service card thumbnail | ~3:4 (portrait)  |

---

## Background Images (Non-Astro Image)

These are served directly from `public/assets/images/` — **not processed by Astro Image**.

| File                    | Location                | Page                | Recommended Size |
| ----------------------- | ----------------------- | ------------------- | ---------------- |
| `hero-home.webp`        | `public/assets/images/` | Home — desktop hero | 1920×1080 (WebP) |
| `hero-home-mobile.webp` | `public/assets/images/` | Home — mobile hero  | 768×1080 (WebP)  |

---

## Replacement Instructions

### Step 1: Prepare Source Images

- Format: **JPEG** (`.jpg` or `.jpeg`)
- Astro Image will automatically generate optimized WebP variants
- No need to pre-optimize; Astro Image handles quality/compression

### Step 2: Replace Stub Files

1. Locate the page folder you want to update (e.g., `src/assets/images/home/`)
2. Replace each `.jpg` stub file with your real photograph **using the same filename**
3. Example: `src/assets/images/home/about-portrait.jpg` — just overwrite it

### Step 3: Build and Verify

```bash
npm run build
```

- Astro Image will process each JPEG and generate optimized WebP assets
- Check `dist/_astro/` for generated variants
- Built site output in `dist/`

### Step 4: Test

```bash
npm run preview
# or
npm run dev
```

- Verify images render correctly on each page
- Run Lighthouse audit on affected pages if changing above-fold hero images

---

## Image Import References

All page `.astro` files have been updated to reference the page-specific folders:

- `src/pages/index.astro` → imports from `src/assets/images/home/`
- `src/pages/about.astro` → imports from `src/assets/images/about/`
- `src/pages/event-photography-katy-tx.astro` → imports from `src/assets/images/event-photography-katy-tx/`
- `src/pages/family-photography-katy-tx.astro` → imports from `src/assets/images/family-photography-katy-tx/`
- `src/pages/portfolio.astro` → imports from `src/assets/images/portfolio/`

**No manual import updates needed** — just replace the `.jpg` files at their paths.

---

## Notes

- **Stub files:** Current `.jpg` files are 0.6 KB placeholders. Replace them with your real photos.
- **Legacy folders:** `about/`, `heroes/`, `panels/` are kept for reference but unused. Can be archived or deleted after full migration.
- **Backup folder:** `bkp/` contains previous WebP versions. Can be deleted after confirming replacements.
- **SEO:** Filenames in `src/assets/images/` do not appear in final URLs (Astro Image generates hashed names). Only `public/assets/images/` filenames are visible to search engines.
- **Compression:** Always export JPEGs at reasonable quality (85–90). Astro Image handles further optimization.

---

## Quick Checklist

- [ ] Prepare 28 unique JPEG photos (9 + 1 + 6 + 6 + 5 = 27, plus 2 WebP hero backgrounds)
- [ ] Drop JPEGs into corresponding `src/assets/images/` page folders
- [ ] Drop 2 WebP files into `public/assets/images/` (hero-home.webp, hero-home-mobile.webp)
- [ ] Run `npm run build`
- [ ] Run `npm run preview` and verify all pages render correctly
- [ ] Run Lighthouse on affected pages
- [ ] Commit changes
