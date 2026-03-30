# Image Organization Structure

**Last Updated:** March 30, 2026

This document tracks image naming and placement for NiO Pictures Astro pages.

## Naming Convention

- Canonical format is `page-role-index.jpg`.
- Allowed roles are `hero`, `panel`, and `grid`.
- Remove contextual suffixes like `about` and `support` from canonical filenames.
- Keep names stable. Replace image content by overwriting existing files instead of renaming.

## Current Folder Structure

```text
src/assets/images/
|- home/ (9)
|  |- home-grid-1.jpg
|  |- home-grid-2.jpg
|  |- home-grid-3.jpg
|  |- home-hero-1.jpg
|  |- home-hero-2.jpg
|  |- home-hero-3.jpg
|  |- home-hero-4.jpg
|  |- home-panel-1.jpg
|  |- home-panel-2.jpg
|- about/ (1)
|  |- about-hero-1.jpg
|- event-photography-katy-tx/ (6)
|  |- event-hero-1.jpg
|  |- event-hero-2.jpg
|  |- event-hero-3.jpg
|  |- event-hero-4.jpg
|  |- event-panel-1.jpg
|  |- event-panel-2.jpg
|- family-photography-katy-tx/ (6)
|  |- family-hero-1.jpg
|  |- family-hero-2.jpg
|  |- family-hero-3.jpg
|  |- family-hero-4.jpg
|  |- family-panel-1.jpg
|  |- family-panel-2.jpg
|- portfolio/ (5)
|  |- portfolio-hero-1.jpg
|  |- portfolio-hero-2.jpg
|  |- portfolio-hero-3.jpg
|  |- portfolio-panel-1.jpg
|  |- portfolio-panel-2.jpg
```

## Page Mapping

### Home Page (`src/pages/index.astro`)

**Location:** `src/assets/images/home/`

| Filename | Usage | Target Ratio |
| --- | --- | --- |
| `home-hero-1.jpg` | About section landscape image | 4:3 |
| `home-hero-2.jpg` | About section portrait image | 3:4 |
| `home-hero-3.jpg` | Events service card hero | 3:4 |
| `home-hero-4.jpg` | Family service card hero | 3:4 |
| `home-panel-1.jpg` | Events service panel background | 16:9 |
| `home-panel-2.jpg` | Family service panel background | 16:9 |
| `home-grid-1.jpg` | Featured grid image 1 | 4:3 |
| `home-grid-2.jpg` | Featured grid image 2 | 3:4 |
| `home-grid-3.jpg` | Featured grid image 3 | 3:2 |

### About Page (`src/pages/about.astro`)

**Location:** `src/assets/images/about/`

| Filename | Usage | Target Ratio |
| --- | --- | --- |
| `about-hero-1.jpg` | Main about image | 4:3 |

### Event Page (`src/pages/event-photography-katy-tx.astro`)

**Location:** `src/assets/images/event-photography-katy-tx/`

| Filename | Usage | Target Ratio |
| --- | --- | --- |
| `event-hero-1.jpg` | Main event hero image | 3:4 |
| `event-panel-1.jpg` | Main event panel background | 16:9 |
| `event-hero-2.jpg` | Secondary hero image | 3:4 |
| `event-panel-2.jpg` | Secondary panel background | 16:9 |
| `event-hero-3.jpg` | Tertiary hero image | 4:3 |
| `event-hero-4.jpg` | Quaternary hero image | 3:4 |

### Family Page (`src/pages/family-photography-katy-tx.astro`)

**Location:** `src/assets/images/family-photography-katy-tx/`

| Filename | Usage | Target Ratio |
| --- | --- | --- |
| `family-hero-1.jpg` | Main family hero image | 3:4 |
| `family-panel-1.jpg` | Main family panel background | 16:9 |
| `family-hero-2.jpg` | Secondary hero image | 3:4 |
| `family-panel-2.jpg` | Secondary panel background | 16:9 |
| `family-hero-3.jpg` | Tertiary hero image | 4:3 |
| `family-hero-4.jpg` | Quaternary hero image | 3:4 |

### Portfolio Page (`src/pages/portfolio.astro`)

**Location:** `src/assets/images/portfolio/`

| Filename | Usage | Target Ratio |
| --- | --- | --- |
| `portfolio-hero-1.jpg` | Main portfolio hero image | 3:4 |
| `portfolio-panel-1.jpg` | Main portfolio panel background | 16:9 |
| `portfolio-hero-2.jpg` | Secondary portfolio hero | 3:4 |
| `portfolio-panel-2.jpg` | Secondary portfolio panel | 16:9 |
| `portfolio-hero-3.jpg` | Tertiary portfolio hero | 4:3 |

## Background Images In Public

These files live in `public/assets/images/` and are not Astro-processed:

- `hero-home.webp`
- `hero-home-mobile.webp`

## Replacement Workflow

1. Export source photos as JPEG (`.jpg` or `.jpeg`).
2. Replace matching files in the correct `src/assets/images/<page>/` folder.
3. Keep exact filenames to avoid import churn.
4. Run `npm run build` and verify rendering.

## Utility Note

`npm run image:intake` now uses strict `page-role-index` slots as canonical names.
Legacy names are accepted through a minimal backward-compatibility alias set.

## Checklist

- [ ] Prepare 27 unique JPEG source images for Astro-managed slots.
- [ ] Replace files in all page folders without renaming.
- [ ] Keep `hero-home.webp` and `hero-home-mobile.webp` updated in `public/assets/images/`.
- [ ] Run `npm run build`.
- [ ] Run `npm run preview` and spot-check image placements.
