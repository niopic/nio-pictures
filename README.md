# NiO Pictures — Website Project Reference

**Business:** NiO Pictures · Palanivel · Katy, Texas
**Tech:** Astro 5 · SSG · Cloudflare Pages · Git-based deployment
**Domain:** https://niopictures.com
**Last Updated:** June 28, 2026

> This document covers architecture, integrations, and reference info for the
> live site. **For current task status, open items, and decisions already
> made, see `AUDIT.md` at the repo root — read that first in any new session,
> it's the up-to-date single source of truth for "what's done and what's
> next."** This README is for "how the site is built and how to work on it."

---

## ⚡ Quick Start (New Developer)

### Prerequisites

- Node.js 18+ (check: `node --version`)
- Git (check: `git --version`)
- GitHub account (for deployments)

### Clone & Run Locally

```bash
git clone https://github.com/niopic/nio-pictures.git
cd nio-pictures

# Install dependencies (includes Sharp for image optimization)
npm install

# Start development server (http://localhost:4321 by default for Astro 5)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Test Build Output

```bash
# After 'npm run build', verify:
ls dist/*.html | wc -l          # Should be 27 (21 top-level pages + 6 blog posts)
ls dist/_astro/ | head          # Optimized images/CSS/JS with content hashes
ls dist/_headers dist/_redirects # Confirm these got copied in (see Build Scripts below)
du -sh dist/                    # Check total size
```

---

## 🏗️ Architecture & Tech Stack

| Layer                  | Technology             | Purpose                                                            |
| ----------------------- | ----------------------- | ------------------------------------------------------------------- |
| **Framework**          | Astro 5                | Static site generation (SSG)                                       |
| **Language**           | TypeScript/JavaScript  | Page logic & components                                            |
| **Styling**            | Vanilla CSS            | `public/assets/css/` — global, components, animations, blog       |
| **Image pipeline**     | Sharp + `astro:assets` | Typed image imports, automatic WebP/AVIF + responsive variants     |
| **Fonts**              | Google Fonts           | Cormorant Garamond, DM Sans, Cinzel (non-blocking load)            |
| **Forms**              | Formspree              | `xjgpbyeb` endpoint — contact + booking submissions                |
| **Hosting**            | Cloudflare Pages        | Git-connected, auto-builds on push to `main`                       |
| **Analytics**          | Google Analytics 4     | `G-1VZ3GPSWGH`                                                      |
| **Chat**               | NiO Chat Widget         | `chat.niopictures.com/widget.js`, loaded site-wide via BaseLayout  |
| **SEO**                | JSON-LD Schema Markup   | LocalBusiness, Organization, FAQPage, VideoObject, BreadcrumbList  |

### Single sources of truth (important — don't duplicate these)

| Data                          | Lives in                          | Used by                                                |
| ------------------------------ | ---------------------------------- | -------------------------------------------------------- |
| **All pricing**               | `src/data/pricing.ts`             | `PricingSection.astro`, FAQ text on service pages, homepage |
| **All portfolio/page images** | `src/content/images.config.ts`    | Every page that displays a real photo (typed `astro:assets` imports) |
| **Business schema (NAP, etc.)** | `src/layouts/BaseLayout.astro`   | Every page — single canonical `#business` JSON-LD node |
| **Shared nav**                | `src/components/Nav.astro`        | Every page (desktop nav + mobile drawer) |

If you find pricing, image paths, or NAP info hardcoded anywhere else, that's
a regression — route it through the source of truth instead.

### Image workflow (replaces any older instructions you may see elsewhere)

1. Real client photos live in `src/assets/images/` (flat) and
   `src/assets/images/portfolio/` (the 32-image curated portfolio set, 5
   categories).
2. Every image used on a page is imported in `src/content/images.config.ts`
   and exported as a named object (e.g. `eventsImages`, `housewarmingImages`)
   with `{ img, alt }` per slot.
3. Pages import that object and render via Astro's `<Image>` component
   (`astro:assets`), which generates responsive WebP variants at build time.
4. **To swap an image on a page:** copy the new file over the existing
   filename in `src/assets/images/` (convention: copy the file, don't import
   the same path from two different pages — keeps pages decoupled for future
   swaps), update the `alt` text in `images.config.ts` to match, rebuild, and
   verify the change actually appears in the built `dist/*.html` (don't trust
   the build succeeding alone — grep the output).
5. Minimum 2000px long-edge resolution is needed for the portfolio lightbox
   to generate its larger variants.

### Build scripts (`scripts/`)

| Script                       | Purpose                                                              |
| ------------------------------ | ----------------------------------------------------------------------- |
| `minify-public-assets.mjs`   | Runs after `astro build` — minifies CSS/JS in `dist/assets`, and copies `_headers`/`_redirects` from the repo root into `dist/` (this is how Cloudflare Pages picks them up — they do **not** need to live in `public/`) |
| `consolidate-images.mjs`     | Helper for moving/renaming image batches into `src/assets/images/`     |
| `convert-to-webp.mjs`        | Batch-converts source images to WebP                                  |
| `gen-touch-icon.mjs`         | Generates the apple-touch-icon from the SVG favicon                   |
| `image-intake.mjs` (`npm run image:intake`) | Intake helper for new image batches                    |

---

## 🎯 Deployment Workflow

The repo is already connected to Cloudflare Pages and the domain is live —
this is the day-to-day flow, not first-time setup:

```bash
# 1. Make edits (pages, styles, images, config)
npm run dev              # Test locally

# 2. Build and verify BEFORE committing
npm run build
# grep the relevant dist/*.html to confirm your change actually rendered —
# don't trust "build succeeded" alone, see AUDIT.md's "Process lessons"

# 3. Commit & push
git add .
git commit -m "Describe what changed"
git push origin main

# 4. Cloudflare auto-deploys — usually live within ~60 seconds
```

**Build command:** `npm run build` · **Output directory:** `dist`

---

## 🎨 Color Palette — Complete Reference

### Primary Colors

| Name           | CSS Var       | Hex       | Usage                     |
| -------------- | ------------- | --------- | -------------------------- |
| **Deep Black** | `--black`     | `#161412` | Page background            |
| **Gold**       | `--gold`      | `#C5A572` | Primary actions, headings  |
| **Gold Dark**  | `--gold-dark` | `#8B6A35` | Hover states, scrollbar    |
| **Cream**      | `--cream`     | `#F0E8D8` | Body text (on dark bg)     |

### Surface & Secondary Colors

| Name           | CSS Var        | Hex       | Usage                    |
| -------------- | --------------- | --------- | --------------------------- |
| **Surface**    | `--surface`     | `#262320` | Cards, nav on scroll        |
| **Surface 2**  | `--surface-2`   | `#302C29` | Deeper cards                |
| **Muted**      | `--muted`       | `#A89880` | Secondary text              |
| **Muted Dark** | `--muted-dark`  | `#6B5F52` | Tertiary text, captions      |
| **Violet**     | `--violet`      | `#9B7FD4` | Accent (sparingly)           |

### Borders & Utilities

| Name             | CSS Var          | Value                    | Usage        |
| ----------------- | ------------------ | -------------------------- | -------------- |
| **Border**       | `--border`        | `rgba(197,165,114,0.15)`  | Card edges     |
| **Border Light** | `--border-light`  | `rgba(197,165,114,0.08)`  | Dividers       |
| **Gold Glow**    | `--gold-glow`     | `rgba(197,165,114,0.12)`  | Radial glows   |

```html
<meta name="theme-color" content="#161412" />
```

### Design rationale

The palette is Charcoal Black + Antique Gold, refined: a proper light/dark
gold pair instead of two near-identical golds; cool Violet instead of warm
purple (complements gold rather than competing with it); warm Cream body
text instead of pure white (avoids a clinical feel on warm dark
backgrounds); surface layers give depth without relying on shadows.

---

## 📝 Typography

| Role                  | Font Family        | Weights                       | Source       |
| ----------------------- | --------------------- | -------------------------------- | -------------- |
| Display / Headlines   | Cormorant Garamond  | 300, 400 (+ italic variants)    | Google Fonts  |
| Body / UI Text        | DM Sans             | 300, 400, 500                    | Google Fonts  |
| Accent / Labels / Nav | Cinzel              | 400, 500                         | Google Fonts  |

**Loading strategy:** non-blocking via `media="print" onload="this.media='all'"`.

### Type Scale

| CSS Class     | Font               | Size                     | Weight | Usage                            |
| -------------- | ------------------- | -------------------------- | -------- | ----------------------------------- |
| `.display-xl` | Cormorant Garamond  | clamp(2.8rem → 5.5rem)    | 300    | Page hero headlines                |
| `.display-lg` | Cormorant Garamond  | clamp(2.2rem → 3.8rem)    | 300    | Section hero headlines             |
| `.display-md` | Cormorant Garamond  | clamp(1.6rem → 2.6rem)    | 400    | Section headings                   |
| `.eyebrow`    | Cinzel              | 0.62–0.75rem               | 400    | Category labels, uppercase tags    |
| `.body-lg`    | DM Sans             | clamp(1rem → 1.15rem)      | 300    | Lead paragraphs                    |
| `.body-sm`    | DM Sans             | 0.875rem                   | 300    | Secondary copy, captions           |

Cormorant Garamond carries the editorial/cinematic premium feel; DM Sans
stays clean and readable at small sizes; Cinzel is used sparingly for nav
links, eyebrow labels, and package names.

---

## 📁 Current Page Structure

27 pages total. Source in `src/`, static assets in `public/`. Build output
(`dist/`) is what Cloudflare Pages serves — never edit `dist/` directly.

```
src/pages/
├── index.astro                              Home
├── about.astro                              About Palanivel
├── portfolio.astro                          32-image categorized portfolio + lightbox
├── book.astro / contact.astro               Forms (Formspree)
├── blog.astro                               Blog index
├── blog/ (6 posts)
├── privacy.astro / terms.astro              Legal (noindex)
├── 404.astro
│
├── event-photography-katy-tx.astro          Primary service: South Asian celebrations
├── family-photography-katy-tx.astro         Primary service: family portraits
├── housewarming-photography-katy-tx.astro   Dedicated service page
├── half-saree-photography-katy-tx.astro     Dedicated service page
├── videography-katy-tx.astro                Hybrid photo+film offer
├── corporate-photography-katy-tx.astro      Tertiary — deliberately minimal, not nav-linked
│
├── katy-tx-photographer.astro               Location (primary)
├── houston-tx-photographer.astro
├── fulshear-tx-photographer.astro
├── sugar-land-photographer.astro
├── richmond-tx-photographer.astro
└── cypress-tx-photographer.astro

src/
├── layouts/BaseLayout.astro    Head, nav, footer, canonical #business JSON-LD schema
├── components/
│   ├── Nav.astro               Shared desktop nav + mobile drawer
│   └── PricingSection.astro    Renders PACKAGES from pricing.ts generically
├── data/pricing.ts             ⭐ Single source of truth for all pricing
└── content/images.config.ts    ⭐ Single source of truth for all page images

public/assets/
├── css/   global.css · components.css · animations.css · blog.css
└── js/    main.js (nav, scroll reveal, Formspree forms)

public/robots.txt        Blocks training bots, allows AI search bots (deliberate)
public/sitemap-index.xml Auto-generated by @astrojs/sitemap

_headers / _redirects    Cloudflare config — live at repo root, copied into
                          dist/ by scripts/minify-public-assets.mjs at build
                          time (see Build Scripts above)
astro.config.mjs         Astro + sitemap + image service config
package.json              Scripts: dev, build, preview, image:intake
```

### Navigation behavior

The NiO Pictures logo (top-left) is the home link on every page — no
separate "Home" nav item.

---

## 🔗 Key Integrations

### Booking & Gallery (Pixieset)

| Field   | Value                                       | Note                              |
| -------- | --------------------------------------------- | ------------------------------------ |
| Booking | https://niopictures.pixieset.com/booking/    | Always a **secondary** CTA — "Start a Conversation" → `/contact` is primary site-wide |
| Gallery | https://niopictures.pixieset.com/            | Homepage's "View Full Gallery" still points here — should point to `/portfolio` instead, see `AUDIT.md` |

### Formspree (Contact Forms)

| Field             | Value                                |
| ------------------- | --------------------------------------- |
| Endpoint          | `https://formspree.io/f/xjgpbyeb`     |
| Email destination | niopictureskaty@gmail.com              |
| Spam protection   | Hidden honeypot field `id="website"`  |

### NiO Chat Widget

`<script src="https://chat.niopictures.com/widget.js" defer></script>` —
loaded site-wide via `BaseLayout.astro`.

### Google Analytics

GA4, Measurement ID `G-1VZ3GPSWGH`, active site-wide. Form-conversion
tracking is deprioritized — Formspree email notifications already cover
lead capture.

### Google Business Profile

Claimed, 16 reviews × 5★ (matches the homepage `AggregateRating` schema).
Profile URL: `https://share.google/8ODqUDxsuIFcxecMo`

---

## 💰 Pricing

**Source of truth is `src/data/pricing.ts` — never hardcode a price anywhere
else.** Current packages (as of this writing; check `pricing.ts` directly for
the live numbers, since this table will drift):

| Package                | Coverage      | Photos only | + Cinematic film |
| ------------------------ | --------------- | ------------- | ------------------- |
| **Heritage Session**   | Up to 3 hrs   | $950        | $1,400              |
| **Signature Gala**     | Up to 4 hrs   | $1,400      | $1,950               |
| **Legacy Collection**  | 90 min session | $650        | +$500 album / +$1,300 album+wall art |

Add-ons (social reel, raw footage, extra hour, rush delivery, extra images,
Heritage/Gala albums) are also defined in `pricing.ts` — see the `ADD_ONS`
export. **Legacy/Heritage/Gala album pricing is currently a placeholder**
pending real WHCC wholesale cost confirmation — see `AUDIT.md`.

---

## 📞 Business Details

| Field                 | Value                                                            |
| ----------------------- | ------------------------------------------------------------------- |
| Business name         | NiO Pictures                                                       |
| Photographer           | Palanivel                                                           |
| Location               | Katy, Texas **77494**                                              |
| Phone                  | 281-409-3585                                                        |
| Email                  | niopictureskaty@gmail.com                                            |
| Website                | https://niopictures.com                                              |
| Service area           | Katy · Fulshear · Houston · Sugar Land · Cypress · Richmond, TX     |
| Founded                | 2017                                                                  |
| Instagram              | https://www.instagram.com/nio_pictures                               |

---

## 🛠️ Maintenance Guide

### Adding a new blog post

1. Copy an existing post in `src/pages/blog/`
2. Update `<title>`, meta description, canonical URL, og: tags, `<h1>`, date, body
3. Update the `BlogPosting` JSON-LD schema at the top of the file
4. Add a card for it in `src/pages/blog.astro`
5. Rebuild — `@astrojs/sitemap` regenerates the sitemap automatically, no manual XML editing needed

### Updating prices

Edit `src/data/pricing.ts` only. `PricingSection.astro` and every FAQ that
quotes a price/turnaround pull from there dynamically — there should be no
hardcoded price left to find anywhere else. If you find one, that's a
regression to fix, not a second place to update.

### Updating testimonials

Homepage moment-stories live in `src/pages/index.astro` — search for the
testimonial author names to find the relevant block.

### Swapping an image on any page

See "Image workflow" under Architecture above. Short version: copy the new
file over the existing filename in `src/assets/images/`, update the alt text
in `src/content/images.config.ts`, rebuild, and verify against the actual
`dist/*.html` output.

### Updating Google review count

Find `aggregateRating` in `src/layouts/BaseLayout.astro` and update
`reviewCount`/`ratingValue` to match the real GBP listing.

---

## ⚠️ Known Limitations

| Limitation                                  | Workaround                                                                |
| ---------------------------------------------- | ----------------------------------------------------------------------------- |
| `_headers`/`_redirects` live at repo root, not `public/` | Handled automatically — `scripts/minify-public-assets.mjs` copies them into `dist/` at build time. Don't "fix" this by moving the files; the build script depends on their current location. |
| Hero images preloaded on every page          | Intentional for visual priority/LCP; acceptable trade-off given the photography-quality bar |
| Formspree honeypot field                    | Spambots may still probe the endpoint; low false-positive rate observed |
| Git history bloat (~272MB `.git`)            | 216MB of raw JPGs were committed then removed early on; would need `git filter-repo` to clean up — deferred, not urgent |

---

## 🔒 Security & Legal

### Security Headers (`_headers`)

```
Content-Security-Policy   Controls which domains can run scripts/load resources
X-Frame-Options           SAMEORIGIN — prevents clickjacking
X-Content-Type-Options    nosniff
Referrer-Policy           strict-origin-when-cross-origin
Permissions-Policy        camera=(), microphone=(), geolocation=(), payment=()
Cache-Control (HTML)      public, max-age=3600, must-revalidate
Cache-Control (CSS/JS)    public, max-age=31536000, immutable
Cache-Control (Images)    public, max-age=31536000, immutable
```

**CSP allows:** `self`, `googletagmanager.com`, `google-analytics.com`, `chat.niopictures.com`, `fonts.googleapis.com`, `fonts.gstatic.com`, `formspree.io`, `niopictures.pixieset.com`, `youtube.com`, `img.youtube.com`, `i.ytimg.com`

### Spam Protection

Both forms have a hidden honeypot field (`id="website"`, `tabindex="-1"`).
Bots fill it in automatically; the submission is silently discarded in JS
before any fetch is made.

### Legal Pages

| Page           | Coverage                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| `privacy.astro` | GA4 cookies, Formspree data handling, Pixieset, data rights, Texas jurisdiction, 30-day response commitment      |
| `terms.astro`   | Image copyright, personal use license, session terms, cancellation, liability limitation, governing law (Texas) |

### Image Copyright

All photographs © NiO Pictures / Palanivel. All rights reserved. Clients
receive a **personal use license** — not commercial rights. NiO Pictures may
use session photos for portfolio/social unless the client opts out in
writing at booking.

---

## 🤖 AI & Claude Notes

This site is developed with Claude across multiple sessions (chat sessions
drafting prompts, Claude Code executing them in VS Code). If you're starting
a new session: **read `AUDIT.md` first** for current status — don't accept
a re-explanation of context, and don't assume this README's absence of a
mention means something doesn't exist yet.

| Thing                  | Value                                                                       |
| ------------------------ | -------------------------------------------------------------------------------- |
| Site type              | Astro 5 SSG — requires build step (`npm run build`), output in `dist/`        |
| Domain                 | `niopictures.com` — no hyphen                                                |
| Page count             | 27 (21 top-level + 6 blog posts)                                              |
| Formspree endpoint     | `https://formspree.io/f/xjgpbyeb`                                            |
| GA4 Measurement ID     | `G-1VZ3GPSWGH`                                                                |
| Pricing source         | `src/data/pricing.ts` — never hardcode a price elsewhere                     |
| Image source           | `src/content/images.config.ts` + `src/assets/images/` — never hardcode an image path elsewhere |
| External link rel      | All external links use `rel="noopener noreferrer"`                           |
| Honeypot field         | `id="website"`, hidden, both forms                                            |
| Copyright year         | 2026                                                                           |
| Verification discipline | Always grep `dist/*.html` after building to confirm a change actually rendered — never trust a build-succeeded message alone. See `AUDIT.md`'s "Process lessons" section for why this matters specifically with Claude Code. |
