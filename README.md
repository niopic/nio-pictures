# NiO Pictures — Website Project Reference

**Business:** NiO Pictures · Palanivel · Katy, Texas  
**Tech:** Astro 5 · SSG · Cloudflare Pages · Git-based deployment
**Domain:** https://niopictures.com  
**Last Updated:** March 27, 2026

> This document is the single source of truth for the project. If you lose your chat history, everything you need to continue, maintain, or hand off this site is here. **Someone should be able to recreate this entire website from this README.**

---

## ⚡ Quick Start (New Developer)

### Prerequisites
- Node.js 18+ (check: `node --version`)
- Git (check: `git --version`)
- GitHub account (for deployments)
- Cloudflare account (for hosting)

### Clone & Run Locally
```bash
# Clone the repository
git clone https://github.com/YOUR_ORG/nio-pictures.git
cd nio-pictures

# Install dependencies (includes Sharp for image optimization)
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Test Build Output
```bash
# After running 'npm run build', verify:
ls -la dist/index.html          # Pages built ✓
ls -la dist/_astro/             # Images optimized ✓
du -sh dist/                    # Check total size
```

---

## 🏗️ Architecture & Tech Stack

### Technology Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | Astro | 5.5.0 | Static site generation (SSG) |
| **Language** | JavaScript/TypeScript | ES modules | Page logic & components |
| **Styling** | Vanilla CSS | (no framework) | 4 CSS files, CSS variables, responsive |
| **Image Optimization** | Sharp | 0.33.0 | Convert JPEG source → WebP/AVIF formats at build time |
| **Fonts** | Google Fonts | (CDT) | Cormorant Garamond, DM Sans, Cinzel (non-blocking load) |
| **Forms** | Formspree | `xjgpbyeb` endpoint | Contact + booking form submissions |
| **Hosting** | Cloudflare Pages | — | Git-connected deployment, auto-builds on push |
| **Analytics** | Google Analytics 4 | `G-1VZ3GPSWGH` | Conversion tracking on all 19 pages |
| **Chat** | NiO Chat Widget | external JS | Real-time customer messaging |
| **SEO** | JSON-LD Schema Markup | (embedded in HTML) | LocalBusiness, Service, FAQ, BlogPosting, etc. |

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     DEVELOPMENT WORKFLOW                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  1. LOCAL DEVELOPMENT                                            │
│     ├─ Edit .astro files (src/pages/, src/layouts/)             │
│     ├─ Edit CSS (public/assets/css/)                            │
│     ├─ Replace images in src/assets/images/                     │
│     └─ npm run dev → Live refresh (http://localhost:3000)       │
│                                                                   │
│  2. BUILD PROCESS                                                │
│     ├─ Astro parses all .astro pages                            │
│     ├─ Sharp optimizes JPEG/PNG → WebP/AVIF                    │
│     ├─ CSS + JS bundled & minified                             │
│     ├─ JSON-LD schemas embedded                                 │
│     └─ Output: dist/ folder (ready for hosting)                │
│                                                                   │
│  3. GIT WORKFLOW                                                 │
│     ├─ git add .                                                │
│     ├─ git commit -m "descriptive message"                      │
│     └─ git push origin main                                     │
│                                                                   │
│  4. CLOUDFLARE DEPLOYMENT (AUTOMATIC)                           │
│     ├─ GitHub webhook triggers Cloudflare build                 │
│     ├─ Cloudflare runs: npm install && npm run build            │
│     ├─ dist/ contents deployed to CDN                           │
│     ├─ Security headers (_headers) applied                      │
│     ├─ Routing rules (_redirects) applied                       │
│     └─ Live at https://niopictures.com (~60 seconds)           │
│                                                                   │
│  5. BROWSER DELIVERY                                             │
│     ├─ HTML pages served globally from Cloudflare edge          │
│     ├─ Images served with caching headers                       │
│     ├─ GA4 tracks user behavior                                 │
│     ├─ Chat widget loads on all pages                           │
│     └─ Forms post to Formspree endpoint                         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Image Optimization Pipeline

**Before (Manual):**
- Upload WebP files manually
- No responsive variants
- Slow on mobile

**Now (Automatic with Sharp):**
{% raw %}
```
Source (JPEG/PNG)          Sharp Processor           Browser Display
┌──────────────┐           ┌──────────────┐         ┌──────────────┐
│ photo.jpg    │ ────→    │ • Resize     │────→    │ <picture>    │
│ (2400px)     │ (build   │ • Convert    │         │ <source>     │
│              │  time)   │ • Optimize   │         │ (srcset)     │
└──────────────┘           │ • Densities  │         └──────────────┘
                           └──────────────┘
Output formats (auto-generated):
├─ WebP @ 400, 800, 1200, 1600px (2x density)
├─ AVIF @ 400, 800, 1200, 1600px (2x density)
└─ Original JPEG as fallback
```
{% endraw %}

**Sharp Configuration (astro.config.mjs):**
```javascript
image: {
  service: {
    entrypoint: "astro/assets/services/sharp",
    config: {
      formats: ["avif", "webp"],
      densities: [1, 2],                    // 1x & 2x for Retina
    },
  },
}
```

**Current Image Props (added to all Image components):**
```astro
<Image 
  src={heroImage}
  alt="Descriptive alt text"
  widths={[400, 800, 1200]}              // Breakpoints
  sizes="(max-width: 768px) 100vw, 50vw"  // Media query
  quality={90}                             // 85–90 for photography
  loading="eager|lazy"                    // Hero = eager, rest = lazy
/>
```

---

## 🎯 Deployment Workflow

### Step 1: Initialize Git & GitHub (First Time Only)

```bash
cd nio-pictures

# Create local git repo
git init
git config user.name "Your Name"
git config user.email "your.email@gmail.com"

# Add all files
git add .
git commit -m "Initial commit — NiO Pictures website"

# Create repo on GitHub.com, then link:
git remote add origin https://github.com/YOUR_ORG/nio-pictures.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Click **Create a project** → **Connect to Git**
3. Authorize GitHub & select `nio-pictures` repo
4. **Framework preset:** Astro
5. **Build command:** `npm run build`
6. **Build output directory:** `dist`
7. **Node.js version:** 18 or 20
8. Click **Save and Deploy**

### Step 3: Add Custom Domain

1. In Cloudflare Pages → your project → **Custom domains**
2. Add `niopictures.com`
3. Cloudflare shows nameserver records → add to domain registrar
4. Wait for DNS propagation (5 min – 2 hours)
5. Verify at `https://niopictures.com` ✓

### Step 4: Ongoing Workflow

**Every change follows this flow:**

```bash
# 1. Make edits (pages, styles, images, config)
# 2. Test locally
npm run dev           # Test at http://localhost:3000

# 3. Commit & push
git add .
git commit -m "Describe what changed"
git push origin main

# 4. Cloudflare auto-deploys (watch https://pages.cloudflare.com)
# → Logs show build progress
# → ~60 seconds later, site is live
```

**IMPORTANT:** Before first deploy, move these files to `public/`:
- `_headers` → `public/_headers` (security headers)
- `_redirects` → `public/_redirects` (routing rules)

---

## 🎨 Color Palette — Complete Reference

### Primary Colors

| Name | CSS Var | Hex | RGB | Usage |
|---|---|---|---|---|
| **Deep Black** | `--black` | `#161412` | 22, 20, 18 | Page background |
| **Gold** | `--gold` | `#C5A572` | 197, 165, 114 | Primary actions, headings |
| **Gold Dark** | `--gold-dark` | `#8B6A35` | 139, 106, 53 | Hover states, scrollbar |
| **Cream** | `--cream` | `#F0E8D8` | 240, 232, 216 | Body text (on dark bg) |

### Surface & Secondary Colors

| Name | CSS Var | Hex | RGB | Usage |
|---|---|---|---|---|
| **Surface** | `--surface` | `#262320` | 38, 35, 32 | Cards, nav on scroll |
| **Surface 2** | `--surface-2` | `#302C29` | 48, 44, 41 | Deeper cards |
| **Muted** | `--muted` | `#A89880` | 168, 152, 128 | Secondary text |
| **Muted Dark** | `--muted-dark` | `#6B5F52` | 107, 95, 82 | Tertiary text, captions |
| **Violet** | `--violet` | `#9B7FD4` | 155, 127, 212 | Accent (sparingly) |

### Borders & Utilities

| Name | CSS Var | Hex | RGB | Usage |
|---|---|---|---|---|
| **Border** | `--border` | rgba(197,165,114,0.15) | 15% alpha | Card edges |
| **Border Light** | `--border-light` | rgba(197,165,114,0.08) | 8% alpha | Dividers |
| **Gold Glow** | `--gold-glow` | rgba(197,165,114,0.12) | 12% alpha | Radial glows |

### Theme Color (Browser UI)
```html
<meta name="theme-color" content="#161412" />
```

---

1. [Quick Start](#-quick-start-new-developer)
2. [Architecture & Tech Stack](#-architecture--tech-stack)
3. [Deployment Workflow](#-deployment-workflow)
4. [Color Palette](#-color-palette--complete-reference)
5. [Project Status](#-project-status)
6. [File Structure](#-file-structure)
7. [Brand Design System](#-brand-design-system)
8. [Typography](#-typography)
9. [Key Integrations](#-key-integrations)
10. [Images Required](#-images-required)
11. [DNS Migration](#-dns-migration)
12. [Post-Launch Checklist](#-post-launch-checklist)
13. [SEO Summary](#-seo-summary)
14. [Security & Legal](#-security--legal)
15. [Maintenance Guide](#-maintenance-guide)
16. [Pricing Packages](#-pricing-packages)
17. [Business Details](#-business-details)
18. [Known Limitations](#-known-limitations)
19. [AI & Claude Notes](#-ai--claude-notes)

---

## ✅ Project Status

### Done — Do Not Rebuild

| Area | Status |
|---|---|
| All 19 Astro pages built and styled | ✅ |
| Brand design system (CSS variables, fonts) | ✅ |
| Mobile-first responsive layout | ✅ |
| Sticky nav, scroll reveal, animations | ✅ |
| NiO Chat widget embedded sitewide | ✅ |
| Google Analytics GA4 on all 19 pages | ✅ |
| Formspree contact + book forms wired | ✅ |
| Honeypot spam protection on forms | ✅ |
| Event FAQ + pricing cards ($500/$700/$900) | ✅ |
| Family FAQ + pricing cards + prints/albums section | ✅ |
| 4 blog posts + blog index with category filter | ✅ |
| Privacy Policy page | ✅ |
| Terms of Service page | ✅ |
| Custom 404 page (auto-served by Cloudflare) | ✅ |
| Favicon SVG | ✅ |
| robots.txt + sitemap.xml (18 URLs) | ✅ |
| JSON-LD schemas (LocalBusiness, Service, FAQ, Person, Breadcrumb, AggregateRating) | ✅ |
| Security headers (CSP, X-Frame-Options, Permissions-Policy, etc.) | ✅ |
| 4 location pages (Katy, Sugar Land, Richmond, Cypress/Bridgeland) | ✅ |
| Skip-to-main, noreferrer, analytics disclosure — all pages | ✅ |
| Domain consistency — all pages point to niopictures.com | ✅ |

### Remaining Before Go-Live

| Task | Priority |
|---|---|
| Add gallery images (home, event, family, portfolio) — see Images section | 🔴 Last blocker |
| Move `_headers` and `_redirects` to `public/` so Astro includes them in `dist/` | 🔴 High |
| Deploy to Cloudflare Pages (push to GitHub) | 🔴 High |
| DNS swap — unpublish Pixieset, point to Cloudflare | 🔴 High |
| Submit sitemap to Google Search Console | 🔴 High — do on go-live day |
| Update GBP website URL to niopictures.com | 🔴 High — do on go-live day |

### Post-Launch Tasks

| Task | Priority |
|---|---|
| Verify GA4 Realtime data after launch | 🟡 Medium |
| Link GA4 to Google Search Console | 🟡 Medium |
| Submit sitemap to Bing Webmaster Tools | 🟡 Medium |
| Update GBP business description to new site copy | 🟡 Medium |
| Add srcset to images (400w + 800w, mobile performance) | 🟡 Medium |
| PageSpeed Insights test — target LCP < 2.5s | 🟡 Medium |
| Update AggregateRating reviewCount as reviews grow (currently 7) | 🟢 Low |
| Delete unused `chat-bubble.js` from `assets/js/` | 🟢 Low |
| Update sitemap.xml lastmod dates to match go-live date | 🟢 Low |

---

## 📁 File Structure

This is an **Astro 5** project. Source files are in `src/`, static assets in `public/`. The build output (`dist/`) is what Cloudflare Pages serves — do not edit `dist/` directly.

```
nio-pictures/
│
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro   ← Main layout (head, nav, footer, scripts)
│   │   └── Layout.astro       ← Alternate layout variant
│   └── pages/
│       ├── index.astro                        ← Home page
│       ├── event-photography-katy-tx.astro    ← Event Photography + FAQ + Pricing
│       ├── family-photography-katy-tx.astro   ← Family Photography + FAQ + Pricing
│       ├── portfolio.astro                    ← Portfolio (filterable: All/Events/Family)
│       ├── about.astro                        ← About Palanivel
│       ├── book.astro                         ← Booking inquiry form
│       ├── contact.astro                      ← Contact form
│       ├── blog.astro                         ← Blog index
│       ├── privacy.astro                      ← Privacy Policy (noindex)
│       ├── terms.astro                        ← Terms of Service (noindex)
│       ├── 404.astro                          ← Custom 404 (auto-served by Cloudflare)
│       ├── katy-tx-photographer.astro         ← Location: Katy TX (primary)
│       ├── sugar-land-photographer.astro      ← Location: Sugar Land TX
│       ├── richmond-tx-photographer.astro     ← Location: Richmond TX
│       ├── cypress-tx-photographer.astro      ← Location: Cypress / Bridgeland TX
│       └── blog/
│           ├── how-to-prepare-family-portrait-session.astro   ← Feb 6, 2026 (highest SEO value)
│           ├── family-photography-journey.astro               ← Feb 11, 2026
│           ├── blue-hour-holiday-portraits.astro              ← Dec 9, 2025
│           └── editorial-portrait-photography.astro           ← Jan 9, 2026
│
├── public/                    ← Static files copied as-is into dist/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── global.css        ← CSS variables, reset, typography scale
│   │   │   ├── components.css    ← Nav, hero, cards, forms, footer
│   │   │   ├── animations.css    ← Scroll reveal, keyframes, transitions
│   │   │   └── blog.css          ← Blog index + blog post styles
│   │   ├── js/
│   │   │   ├── main.js           ← Nav, scroll reveal, portfolio filter, Formspree forms
│   │   │   └── chat-bubble.js    ← Unused legacy file (safe to delete)
│   │   └── images/
│   │       ├── favicon.svg       ← ✅ Gold N on dark background
│   │       ├── heroes/
│   │       │   ├── home.jpg     ← ✅ Home page hero
│   │       │   ├── events.jpg   ← ✅ Event page hero
│   │       │   └── family.jpg   ← ✅ Family page hero
│   │       ├── panels/
│   │       │   ├── events.jpg   ← ✅ Home — events panel
│   │       │   └── family.jpg   ← ✅ Home — family panel
│   │       ├── about/
│   │       │   ├── portrait.jpg ← ✅ About snippet (home)
│   │       │   └── main.jpg     ← ✅ About page main photo
│   │       ├── blog/
│   │       │   ├── prepare-hero.jpg
│   │       │   ├── journey-1.jpg
│   │       │   ├── journey-2.jpg
│   │       │   ├── bluehour.jpg
│   │       │   ├── editorial-hero.jpg
│   │       │   └── editorial-2.jpg
│   │       ├── portfolio/
│   │       │   ├── events/      ← Event portfolio images (still needed)
│   │       │   │   ├── 1.jpg through 5.jpg
│   │       │   │   └── ...
│   │       │   ├── family/      ← Family portfolio images (still needed)
│   │       │   │   ├── 1.jpg through 4.jpg
│   │       │   │   └── ...
│   │       │   └── gallery/     ← Gallery grid images (still needed)
│   │       │       ├── 1.jpg through 6.jpg
│   │       │       └── ...
│   │       └── social/
│   │           └── og-home.jpg  ← ✅ Social sharing card
│   ├── robots.txt                ← Allow all crawlers, references sitemap
│   └── sitemap.xml               ← 18 URLs, all on niopictures.com
│
├── _headers                  ← ⚠️ Cloudflare security + cache headers
│                                   MUST move to public/ so Astro includes it in dist/
├── _redirects                ← ⚠️ Cloudflare routing — same: must move to public/
├── astro.config.mjs          ← Astro config (site URL, build format: file, trailingSlash: never)
└── package.json              ← Scripts: dev, build, preview
```

### 🔗 Navigation Behavior

**Logo as Home Link:**
- The **NiO Pictures logo** (top-left) is the primary way to navigate to the homepage
- Clicking the logo from any page returns to `/` 
- This provides a consistent, familiar pattern that users expect
- No redundant "Home" menu item needed

---

## 🎨 Brand Design System

> **See [Color Palette](#-color-palette--complete-reference) section above for complete hex codes, RGB values, and CSS variable reference.**

### Design Rationale

The palette started from the brief (Charcoal Black + Antique Gold) but was refined:
- The two near-identical golds in the original spec were replaced with a proper light/dark pair (`--gold` + `--gold-dark`)
- The warm Deep Purple (#5C3A6B) was replaced with cool Violet (#9B7FD4) — warm purple competes with gold; cool violet complements it
- Warm Cream body text (#F0E8D8) replaces pure white — avoids the clinical feel of #FFFFFF on warm dark backgrounds
- Surface layers (#262320, #302C29) give depth without relying on shadows

---

## 📝 Typography

### Font Stack

| Role | Font Family | Weights | Source |
|---|---|---|---|
| Display / Headlines | Cormorant Garamond | 300, 400 (+ italic variants) | Google Fonts |
| Body / UI Text | DM Sans | 300, 400, 500 | Google Fonts |
| Accent / Labels / Nav | Cinzel | 400, 500 | Google Fonts |

**Google Fonts load URL:**
```
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Cinzel:wght@400;500&display=swap
```

**Loading strategy:** Non-blocking via `media="print" onload="this.media='all'"` — eliminates render-blocking font requests.

### Type Scale

| CSS Class | Font | Size | Weight | Usage |
|---|---|---|---|---|
| `.display-xl` | Cormorant Garamond | clamp(2.8rem → 5.5rem) | 300 | Page hero headlines |
| `.display-lg` | Cormorant Garamond | clamp(2.2rem → 3.8rem) | 300 | Section hero headlines |
| `.display-md` | Cormorant Garamond | clamp(1.6rem → 2.6rem) | 400 | Section headings |
| `.eyebrow` | Cinzel | 0.62–0.75rem | 400 | Category labels, uppercase tags |
| `.body-lg` | DM Sans | clamp(1rem → 1.15rem) | 300 | Lead paragraphs |
| `.body-sm` | DM Sans | 0.875rem | 300 | Secondary copy, captions |

### Reasoning

- **Cormorant Garamond** — editorial, cinematic, premium. Sits in the same visual family as luxury brands and film festival identities. The 300 weight gives lightness and elegance.
- **DM Sans** — clean, modern, highly readable at small sizes. Pairs well with serif display fonts without feeling clinical.
- **Cinzel** — architectural and timeless. Used sparingly on nav links, eyebrow labels, and package names. Creates hierarchy without competing with the display face.

---

## 🔗 Key Integrations

### Booking
| Field | Value |
|---|---|
| URL | https://niopictures.pixieset.com/booking/ |
| Used on | Every "Book Now" button sitewide (39+ occurrences) |
| Book form behaviour | Submits to Formspree first (sends email to you), then opens Pixieset in new tab |

### Gallery
| Field | Value |
|---|---|
| URL | https://niopictures.pixieset.com/ |
| Used on | Portfolio page, "View Gallery" buttons, blog posts |

### Formspree (Contact Forms)
| Field | Value |
|---|---|
| Endpoint | `https://formspree.io/f/xjgpbyeb` |
| Email destination | niopictureskaty@gmail.com |
| Pages | `contact.html` + `book.html` |
| Spam protection | Hidden honeypot field `id="website"` — bots fill it, humans don't |
| Validation | Required fields highlight gold if empty |
| Error handling | Network errors show retry message; server errors show fallback message |
| Dashboard | [https://formspree.io](https://formspree.io) — monitor form submissions and manage endpoint |

### NiO Chat Widget
| Field | Value |
|---|---|
| Script URL | https://chat.niopictures.com/widget.js |
| Embedded on | **All 19 pages** — global via `src/layouts/BaseLayout.astro` line 242 (before `</body>`) |
| Status | ✅ Active — loads on every page without condition |
| Snippet | `<script src="https://chat.niopictures.com/widget.js" defer></script>` |

### Google Analytics
| Field | Value |
|---|---|
| Property | GA4 |
| Measurement ID | `G-1VZ3GPSWGH` |
| Status | Active on all 19 pages |
| Dashboard | [https://analytics.google.com](https://analytics.google.com) — check Realtime and traffic sources |
| Action needed | Link to Search Console after go-live (GA4 → Admin → Search Console links) |

### Google Business Profile
| Field | Value |
|---|---|
| Status | Claimed ✅ |
| Reviews | 7 × five-star ✅ (current) |
| AggregateRating schema | Already in [src/pages/index.astro](src/pages/index.astro) ✅ |
| Dashboard | [https://business.google.com](https://business.google.com) — update website URL and description on go-live day |
| Action needed | Update website URL to niopictures.com on go-live day; update after review count changes |

---

## 🖼️ Images Required

All images go in `public/assets/images/` in organized subfolders. **Use JPEG source files** — Astro will automatically optimize them during the build.

**Quality settings for JPEGs:** Use 85–90% quality for best balance of file size and visual fidelity.

### Hero & Page Backgrounds ✅ All added

**Folder:** `public/assets/images/heroes/` and `public/assets/images/panels/`

| Filename | Used on | Dimensions |
|---|---|---|
| `heroes/home.jpg` | Home — full viewport hero | 1920×1080px |
| `heroes/events.jpg` | Event page hero | 1920×900px |
| `heroes/family.jpg` | Family page hero | 1920×900px |
| `panels/events.jpg` | Home service split — events panel | 960×1200px |
| `panels/family.jpg` | Home service split — family panel | 960×1200px |

### About Photos ✅ All added

**Folder:** `public/assets/images/about/`

| Filename | Used on | Dimensions |
|---|---|---|
| `portrait.jpg` | About snippet on home page | 560×700px |
| `main.jpg` | About page main photo | 560×700px |

### Portfolio & Gallery Images — 🔴 Still needed

**Folder structure:** `public/assets/images/portfolio/`

#### Gallery Grid (home page + filterable pages)
**Subfolder:** `portfolio/gallery/` — 6 images

| Filename | Grid position | Dimensions |
|---|---|---|
| `1.jpg` | Large left (cols 1–6) | 800×600px |
| `2.jpg` | Top right narrow | 400×533px |
| `3.jpg` | Top right narrow | 400×533px |
| `4.jpg` | Bottom left narrow | 400×533px |
| `5.jpg` | Bottom centre narrow | 400×533px |
| `6.jpg` | Large right (cols 7–12) | 800×600px |

#### Event Portfolio Images
**Subfolder:** `portfolio/events/` — 5 images

| Filename | Usage | Dimensions |
|---|---|---|
| `1.jpg` through `5.jpg` | Portfolio grid (Events filter) | 600×450px each |

#### Family Portfolio Images
**Subfolder:** `portfolio/family/` — 4–9 images

| Filename | Usage | Dimensions |
|---|---|---|
| `1.jpg` through `4.jpg` | Portfolio grid (Family filter) | 600×450px each |
| (Plus up to 9 for family page side grid if needed) | Family page side gallery | 400×533px or 400×300px |


### Blog Cover Images ✅ All added

**Folder:** `public/assets/images/blog/`

| Filename | Post | Dimensions |
|---|---|---|
| `prepare-hero.jpg` | How to Prepare for Your Session | 900×506px |
| `journey-1.jpg` | Photography Journey (featured post card) | 900×506px |
| `journey-2.jpg` | Journey post — mid-article | 900×506px |
| `bluehour.jpg` | Blue Hour Holiday Portraits | 900×506px |
| `editorial-hero.jpg` | Shaping Light — hero | 900×506px |
| `editorial-2.jpg` | Shaping Light — mid-article | 900×506px |

### Social Sharing (OG Image) ✅ Added

**Folder:** `public/assets/images/social/`

| Filename | Usage | Dimensions |
|---|---|---|
| `og-home.jpg` | All pages — WhatsApp/iMessage/LinkedIn preview | 1200×630px |

### Favicon (partially done)

| Filename | Status | Notes |
|---|---|---|
| `favicon.svg` | ✅ Done | Gold "N" on dark background |
| `favicon-32.png` | Optional | Export 32×32 from favicon.svg in any image editor |
| `apple-touch-icon.png` | Optional | Export 180×180 from favicon.svg |

---

## 🌐 DNS Migration

**Do this only when:** images are added, forms tested, and site fully reviewed.

**Steps:**
1. In Cloudflare Pages → your project → **Custom Domains** → Add `niopictures.com`
2. Cloudflare shows you DNS records to add — follow their instructions exactly
3. In Pixieset → Settings → disconnect or unpublish `niopictures.com`
4. Wait for DNS propagation (minutes to a few hours)
5. Test the site loads correctly at `https://niopictures.com`

**Go-live day actions:**
- Google Business Profile → Edit → Website → change to `https://niopictures.com`
- Google Search Console → Add property → Verify ownership → Submit sitemap: `https://niopictures.com/sitemap.xml`

---

## 📋 Post-Launch Checklist

```
Day 1 — Verify everything works
[ ] Site loads at https://niopictures.com
[ ] Submit contact form — confirm email arrives at niopictureskaty@gmail.com
[ ] Submit book form — confirm email arrives + Pixieset opens in new tab
[ ] Update GBP website URL to niopictures.com
[ ] Submit sitemap to Google Search Console
[ ] Open GA4 → Realtime — confirm tracking is live
[ ] Test on iPhone (Safari) and Android (Chrome)
[ ] Visit niopictures.com/anything-random — confirm branded 404 appears
[ ] Check all nav links work correctly

Week 1
[ ] Submit sitemap to Bing Webmaster Tools (bing.com/webmasters)
[ ] Link GA4 to Search Console (GA4 → Admin → Search Console links)
[ ] Update GBP business description to match new site copy
[ ] Run PageSpeed Insights on home page + event page
[ ] Run on mobile — target LCP < 2.5s, CLS < 0.1

Month 1
[ ] Check Search Console for first keyword impressions
[ ] Check GA4 for top traffic sources
[ ] Add srcset to images for mobile optimisation
```

---

## 🔍 SEO Summary

### What's on every page
- Unique `<title>` and `<meta description>`
- Single `<h1>` with proper H2/H3 hierarchy
- `<link rel="canonical">` pointing to niopictures.com
- Open Graph + Twitter Card meta tags
- Geo meta tags (geo.region, geo.placename, geo.position, ICBM)
- Hero image preloaded with `fetchpriority="high"`
- Google Fonts loaded non-blocking (no render-blocking)
- GA4 tracking snippet
- Skip-to-main-content link (accessibility)
- Analytics disclosure + Privacy/Terms in footer

### Schema markup

| Schema type | Location |
|---|---|
| `LocalBusiness` + `ProfessionalService` | `src/pages/index.astro` |
| `AggregateRating` (7 reviews, 5 stars) | `src/pages/index.astro` |
| `Service` — Event Photography | `src/pages/event-photography-katy-tx.astro` |
| `Service` — Family Photography | `src/pages/family-photography-katy-tx.astro` |
| `FAQPage` (5 questions, pricing) | `src/pages/event-photography-katy-tx.astro` |
| `FAQPage` (8 questions, pricing, prints) | `src/pages/family-photography-katy-tx.astro` |
| `Person` (Palanivel) | `src/pages/about.astro` |
| `BlogPosting` | All 4 blog post `.astro` files |
| `BreadcrumbList` | All inner pages |
| `LocalBusiness` (city-scoped) | All 4 location pages |

### Target keywords by page

| Page | Primary keywords |
|---|---|
| Home | NiO Pictures, photographer Katy TX |
| Events | event photographer Katy TX, corporate event photographer Houston, Indian event photographer Katy |
| Family | family photographer Katy TX, heirloom portraits, lifestyle family photography Houston |
| Portfolio | photography portfolio Katy TX |
| About | Palanivel photographer Katy TX |
| Blog posts | family photos what to wear Katy TX, family photography process Houston, blue hour portraits |
| Katy location | Katy TX photographer |
| Sugar Land location | Sugar Land photographer TX |
| Richmond location | Richmond TX photographer |

### Service area in schema
Katy · Houston · Sugar Land · Richmond · Cypress

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

**CSP allows:** `self`, `googletagmanager.com`, `google-analytics.com`, `chat.niopictures.com`, `fonts.googleapis.com`, `fonts.gstatic.com`, `formspree.io`, `niopictures.pixieset.com`

### Spam Protection
Both forms have a hidden honeypot field (`id="website"`, `tabindex="-1"`). If it's filled in (bots do this automatically), the submission is silently discarded in JS before any fetch is made.

### Legal Pages
| Page | Coverage |
|---|---|
| `privacy.html` | GA4 cookies, Formspree data handling, Pixieset, data rights, Texas jurisdiction, 30-day response commitment |
| `terms.html` | Image copyright, personal use license, session terms, cancellation, liability limitation, governing law (Texas) |

### Image Copyright
All photographs © NiO Pictures / Palanivel. All rights reserved.  
Clients receive a **personal use license** — not commercial rights.  
NiO Pictures may use session photos for portfolio/social unless client opts out in writing at booking.

---

## 🛠️ Maintenance Guide

### Adding a new blog post
1. Copy `src/pages/blog/how-to-prepare-family-portrait-session.astro`
2. Update: `<title>`, `<meta description>`, canonical URL, og: tags, `<h1>`, date, body content
3. Update the `BlogPosting` JSON-LD schema at the top of the file
4. Add cover image to `public/assets/images/`
5. Add a card for it in `src/pages/blog.astro` (copy an existing `.blog-card` block)
6. Add a `<url>` entry to `public/sitemap.xml` with today's date
7. `git add . && git commit -m "Blog: [post title]" && git push`

### Updating prices
- **Event prices ($500/$700/$900):** `src/pages/event-photography-katy-tx.astro` — search `$500`
- **Family prices ($300/$450/$600):** `src/pages/family-photography-katy-tx.astro` — search `$300`
- Also update the FAQ answer text on each page that mentions specific prices
- Also update the FAQ JSON-LD schema (`acceptedAnswer` text)

### Updating testimonials
- `src/pages/index.astro` → find `class="testimonial-card"` → edit name, role, and quote

### Swapping a portfolio image
Replace the file in `public/assets/images/` with the same filename. No code change needed.

### Updating Google review count
- `src/pages/index.astro` → find `"reviewCount"` in JSON-LD → update number
- Re-deploy: `git add . && git commit -m "Update review count" && git push`

---

## 💰 Pricing Packages

### Event Photography (all packages = 2-hour coverage)

| Package | Price | Images | Delivery | Extras |
|---|---|---|---|---|
| Essential | $500 | 50 edited | 10 days | — |
| Signature | $700 | 80+ edited | 10 days priority | Optional highlight video clip |
| Premium | $900 | 100+ edited | 7 days priority | Highlight video included · Optional album +$250 |

### Family Photography

| Package | Price | Duration | Images | Delivery |
|---|---|---|---|---|
| Essential | $300 | 1 hour | 30 edited | 10 days |
| Signature | $450 | 90 mins | 50+ edited | 10 days priority |
| Premium | $600 | 2 hours | 80+ edited | 7 days priority · Optional album +$250 |

**Both services:**
- Extra images: $20 each
- Rush delivery: available on request
- Prints, wall art, keepsake albums: ordered via niopictures.pixieset.com (archival quality)

---

## 📞 Business Details

| Field | Value |
|---|---|
| Business name | NiO Pictures |
| Photographer | Palanivel |
| Location | Katy, Texas 77449 |
| Phone | 281-409-3585 |
| Email | niopictureskaty@gmail.com |
| Website | https://niopictures.com |
| Booking | https://niopictures.pixieset.com/booking/ |
| Gallery / Print store | https://niopictures.pixieset.com/ |
| Instagram | https://www.instagram.com/nio_pictures |
| Facebook | https://www.facebook.com/profile.php?id=61580596898855 |
| Service area | Katy · Houston · Sugar Land · Cypress (Bridgeland) · Richmond TX |
| Hours | Weekends: 9am–7pm · Weeknights: 6pm–9pm |
| Shooting since | 2017 |

---

## ⚠️ Known Limitations

| Limitation | Impact | Workaround |
|---|---|---|
| No dynamic image import system | Gallery images use hardcoded paths in Astro Image components; swapping galleries requires manual file replacement | This is by design — improves performance and SEO. To update, replace files with same names in `public/assets/images/` |
| `_headers` and `_redirects` in project root | Files won't be deployed unless moved to `public/` folder | Move both files to `public/` before any Cloudflare Pages deployment |
| Hero images preloaded on every page | Slight performance hit on slower connections | Intentional for visual priority; consider adding `fetchpriority="low"` on non-critical pages in future |
| Formspree honeypot field | Spambots may still probe the endpoint, creating noise in logs | Monitor dashboard; extremely low false positive rate with current validation |

---

## 🤖 AI & Claude Notes

This site was built with Claude (Anthropic) across multiple sessions. If you continue development in a new Claude chat, paste this README as context at the start. Key facts Claude needs:

| Thing | Value |
|---|---|
| Site type | Astro 5 SSG — requires build step (`npm run build`), output in `dist/` |
| Domain | `niopictures.com` — **no hyphen** (nio-pictures.com is wrong) |
| Formspree endpoint | `https://formspree.io/f/xjgpbyeb` |
| GA4 Measurement ID | `G-1VZ3GPSWGH` |
| NiO Chat widget | `<script src="https://chat.niopictures.com/widget.js" defer></script>` |
| Blog source files | Blog posts are in `src/pages/blog/` — Astro resolves asset paths; static assets served from `public/` at root |
| External link rel | All external links must use `rel="noopener noreferrer"` |
| Honeypot field | `id="website"` hidden in both forms — JS discards if populated |
| CSP must allow | googletagmanager.com, google-analytics.com, chat.niopictures.com, fonts.googleapis.com, fonts.gstatic.com, formspree.io, niopictures.pixieset.com |
| Favicon | SVG only — PNG versions optional |
| Copyright year | 2026 |
| 404 handling | `404.html` is auto-served by Cloudflare Pages — no `_redirects` rule needed |
