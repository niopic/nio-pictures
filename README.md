# NiO Pictures — Website Project Reference

**Business:** NiO Pictures · Palanivel · Katy, Texas  
**Tech:** Static HTML + CSS + JS · Cloudflare Pages · Zero build step  
**Domain:** https://niopictures.com  
**Built:** March 2026

> This document is the single source of truth for the project. If you lose your chat history, everything you need to continue, maintain, or hand off this site is here.

---

## 📋 Table of Contents

1. [Project Status](#-project-status)
2. [File Structure](#-file-structure)
3. [Brand Design System](#-brand-design-system)
4. [Typography](#-typography)
5. [Key Integrations](#-key-integrations)
6. [Images Required](#-images-required)
7. [Deploy to Cloudflare Pages](#-deploy-to-cloudflare-pages)
8. [DNS Migration](#-dns-migration)
9. [Post-Launch Checklist](#-post-launch-checklist)
10. [SEO Summary](#-seo-summary)
11. [Security & Legal](#-security--legal)
12. [Maintenance Guide](#-maintenance-guide)
13. [Pricing Packages](#-pricing-packages)
14. [Business Details](#-business-details)
15. [AI & Claude Notes](#-ai--claude-notes)

---

## ✅ Project Status

### Done — Do Not Rebuild

| Area | Status |
|---|---|
| All 18 HTML pages built and styled | ✅ |
| Brand design system (CSS variables, fonts) | ✅ |
| Mobile-first responsive layout | ✅ |
| Sticky nav, scroll reveal, animations | ✅ |
| NiO Chat widget embedded sitewide | ✅ |
| Google Analytics GA4 on all 18 pages | ✅ |
| Formspree contact + book forms wired | ✅ |
| Honeypot spam protection on forms | ✅ |
| Event FAQ + pricing cards ($500/$700/$900) | ✅ |
| Family FAQ + pricing cards + prints/albums section | ✅ |
| 4 blog posts + blog index with category filter | ✅ |
| Privacy Policy page | ✅ |
| Terms of Service page | ✅ |
| Custom 404 page (auto-served by Cloudflare) | ✅ |
| Favicon SVG | ✅ |
| robots.txt + sitemap.xml (17 URLs) | ✅ |
| JSON-LD schemas (LocalBusiness, Service, FAQ, Person, Breadcrumb, AggregateRating) | ✅ |
| Security headers (CSP, X-Frame-Options, Permissions-Policy, etc.) | ✅ |
| 3 location pages (Katy, Sugar Land, Richmond) | ✅ |
| Skip-to-main, noreferrer, analytics disclosure — all pages | ✅ |
| Domain consistency — all pages point to niopictures.com | ✅ |

### Remaining Before Go-Live

| Task | Priority |
|---|---|
| Add photos to `assets/images/` | 🔴 Last blocker |
| Create og-home.webp (1200×630px) | 🔴 High |
| Add blog cover images | 🔴 High |
| Deploy to Cloudflare Pages (push to GitHub) | 🔴 High |
| DNS swap — unpublish Pixieset, point to Cloudflare | 🔴 High |
| Submit sitemap to Google Search Console | 🔴 High — do on go-live day |
| Update GBP website URL to niopictures.com | 🔴 High — do on go-live day |

### Post-Launch Tasks

| Task | Priority |
|---|---|
| Build Cypress TX / Bridgeland location page | 🟡 Medium |
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

```
nio-pictures/
│
├── index.html                           ← Home page
├── event-photography-katy-tx.html       ← Event Photography
├── family-photography-katy-tx.html      ← Family Photography + FAQ + Pricing
├── portfolio.html                       ← Portfolio (filterable: All/Events/Family)
├── about.html                           ← About Palanivel
├── book.html                            ← Booking inquiry form
├── contact.html                         ← Contact form
├── blog.html                            ← Blog index
├── privacy.html                         ← Privacy Policy (noindex)
├── terms.html                           ← Terms of Service (noindex)
├── 404.html                             ← Custom 404 (auto-served by Cloudflare)
│
├── katy-tx-photographer.html            ← Location: Katy TX (primary)
├── sugar-land-photographer.html         ← Location: Sugar Land TX
├── richmond-tx-photographer.html        ← Location: Richmond TX
│
├── blog/
│   ├── how-to-prepare-family-portrait-session.html   ← Feb 6, 2026 (highest SEO value)
│   ├── family-photography-journey.html               ← Feb 11, 2026 (2 image placeholders)
│   ├── blue-hour-holiday-portraits.html              ← Dec 9, 2025
│   └── editorial-portrait-photography.html           ← Jan 9, 2026 (2 image placeholders)
│
├── assets/
│   ├── css/
│   │   ├── global.css        ← CSS variables, reset, typography scale
│   │   ├── components.css    ← Nav, hero, cards, forms, footer
│   │   ├── animations.css    ← Scroll reveal, keyframes, transitions
│   │   └── blog.css          ← Blog index + blog post styles
│   ├── js/
│   │   ├── main.js           ← Nav, scroll reveal, portfolio filter, Formspree forms
│   │   └── chat-bubble.js    ← Unused legacy file (safe to delete)
│   └── images/
│       ├── favicon.svg       ← ✅ Created — gold N on dark background
│       └── (all other images need adding — see Images section below)
│
├── _headers                  ← Cloudflare security + cache headers
├── _redirects                ← Cloudflare routing (minimal)
├── robots.txt                ← Allow all crawlers, references sitemap
└── sitemap.xml               ← 17 URLs, all on niopictures.com
```

---

## 🎨 Brand Design System

### Color Palette

| Token | CSS Variable | Hex | Usage |
|---|---|---|---|
| Deep Black | `--black` | `#161412` | Page background |
| Surface | `--surface` | `#262320` | Cards, scrolled nav bg, footer |
| Surface 2 | `--surface-2` | `#302C29` | Deeper card backgrounds |
| Gold | `--gold` | `#C5A572` | Primary accent — CTAs, headings, borders |
| Gold Dark | `--gold-dark` | `#8B6A35` | Hover states, scrollbar thumb |
| Gold Glow | `--gold-glow` | `rgba(197,165,114,0.12)` | Radial glows, subtle fills |
| Violet | `--violet` | `#9B7FD4` | Subtle secondary accent (used sparingly) |
| Cream | `--cream` | `#F0E8D8` | Primary body text on dark backgrounds |
| Muted | `--muted` | `#A89880` | Secondary text, descriptions |
| Muted Dark | `--muted-dark` | `#6B5F52` | Tertiary text, captions, footer notes |
| Border | `--border` | `rgba(197,165,114,0.15)` | Card and section borders |
| Border Light | `--border-light` | `rgba(197,165,114,0.08)` | Subtle dividers |

**Browser theme-color:** `#161412`

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
| Dashboard | https://formspree.io |

### NiO Chat Widget
| Field | Value |
|---|---|
| Script URL | https://chat.niopictures.com/widget.js |
| Embedded on | All 18 pages, before `</body>` |
| Snippet | `<script src="https://chat.niopictures.com/widget.js" defer></script>` |

### Google Analytics
| Field | Value |
|---|---|
| Property | GA4 |
| Measurement ID | `G-1VZ3GPSWGH` |
| Status | Active on all 18 pages |
| Action needed | Link to Search Console after go-live (GA4 → Admin → Search Console links) |

### Google Business Profile
| Field | Value |
|---|---|
| Status | Claimed ✅ |
| Reviews | 7 × five-star ✅ |
| AggregateRating schema | Already in index.html ✅ |
| Action needed | Update website URL to niopictures.com on go-live day |

---

## 🖼️ Images Required

All images go in `assets/images/`. Use WebP format.

**Convert to WebP:** [squoosh.app](https://squoosh.app) (free, browser-based) or:
```bash
cwebp -q 85 photo.jpg -o photo.webp
```

### Hero & Page Backgrounds

| Filename | Used on | Dimensions |
|---|---|---|
| `hero-home.webp` | Home — full viewport hero | 1920×1080px |
| `events-hero.webp` | Event page hero | 1920×900px |
| `family-hero.webp` | Family page hero | 1920×900px |
| `events-panel.webp` | Home service split — left panel | 960×1200px |
| `family-panel.webp` | Home service split — right panel | 960×1200px |

### About Photos

| Filename | Used on | Dimensions |
|---|---|---|
| `about-portrait.webp` | About snippet on home page | 560×700px |
| `about-main.webp` | About page main photo | 560×700px |

### Home Gallery Grid (6 images)

| Filename | Grid position | Dimensions |
|---|---|---|
| `gallery-1.webp` | Large left (cols 1–6) | 800×600px |
| `gallery-2.webp` | Top right narrow | 400×533px |
| `gallery-3.webp` | Top right narrow | 400×533px |
| `gallery-4.webp` | Bottom left narrow | 400×533px |
| `gallery-5.webp` | Bottom centre narrow | 400×533px |
| `gallery-6.webp` | Large right (cols 7–12) | 800×600px |

### Event Page Gallery

| Filename | Dimensions |
|---|---|
| `event-1.webp` through `event-6.webp` | Same pattern as home gallery |

### Family Page (9 images)

| Filename | Usage | Dimensions |
|---|---|---|
| `family-1.webp` | Side grid — tall portrait | 400×533px |
| `family-2.webp` | Side grid — small | 400×300px |
| `family-3.webp` | Side grid — small | 400×300px |
| `family-g1.webp` through `family-g6.webp` | Family gallery grid | Same as home gallery |

### Portfolio Grid

| Filename | Category | Dimensions |
|---|---|---|
| `port-e1.webp` — `port-e5.webp` | Events | 600×450px |
| `port-f1.webp` — `port-f4.webp` | Family | 600×450px |

### Blog Cover Images

| Filename | Post | Dimensions |
|---|---|---|
| `blog-prepare.webp` | How to Prepare for Your Session | 900×506px |
| `blog-journey.webp` | Photography Journey (also: featured post card on blog index) | 900×506px |
| `blog-journey-2.webp` | Journey post — mid-article placeholder | 900×506px |
| `blog-bluehour.webp` | Blue Hour Holiday Portraits | 900×506px |
| `blog-editorial-hero.webp` | Shaping Light — hero | 900×506px |
| `blog-editorial-2.webp` | Shaping Light — mid-article placeholder | 900×506px |

### Social Sharing (OG Image)

| Filename | Usage | Dimensions |
|---|---|---|
| `og-home.webp` | All pages — WhatsApp/iMessage/LinkedIn preview | 1200×630px |

**Creating og-home.webp:**
1. Go to canva.com → New Design → Custom size → 1200 × 630
2. Background: `#161412` (deep black)
3. Add gold "NiO Pictures" text (use a serif font, gold colour `#C5A572`)
4. Add a strong portrait or event photo as a secondary element
5. Export as JPG → convert to WebP at squoosh.app
6. Save as `assets/images/og-home.webp`

### Favicon (partially done)

| Filename | Status | Notes |
|---|---|---|
| `favicon.svg` | ✅ Done | Gold "N" on dark background |
| `favicon-32.png` | Optional | Export 32×32 from favicon.svg in any image editor |
| `apple-touch-icon.png` | Optional | Export 180×180 from favicon.svg |

---

## 🚀 Deploy to Cloudflare Pages

### Step 1 — Push to GitHub

```bash
cd nio-pictures

# First time only:
git init
echo ".DS_Store\nThumbs.db\n*.zip" > .gitignore
git add .
git commit -m "Initial commit — NiO Pictures website"
gh repo create nio-pictures --public --push --source=.
# (or manually create repo on github.com and add remote)
```

### Step 2 — Connect to Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. **Create a project** → **Connect to Git**
3. Select your `nio-pictures` GitHub repo
4. Build settings:
   - Framework preset: **None**
   - Build command: *(leave blank)*
   - Build output directory: `/`
5. **Save and Deploy**

Every `git push` to `main` auto-deploys in ~30 seconds. ✓

### Ongoing update workflow

```bash
# After any file change:
git add .
git commit -m "Brief description of change"
git push
# → Cloudflare deploys automatically
```

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
[ ] Build Cypress TX / Bridgeland location page
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
| `LocalBusiness` + `ProfessionalService` | index.html |
| `AggregateRating` (7 reviews, 5 stars) | index.html |
| `Service` — Event Photography | event-photography-katy-tx.html |
| `Service` — Family Photography | family-photography-katy-tx.html |
| `FAQPage` (5 questions, pricing) | event-photography-katy-tx.html |
| `FAQPage` (8 questions, pricing, prints) | family-photography-katy-tx.html |
| `Person` (Palanivel) | about.html |
| `BlogPosting` | All 4 blog posts |
| `BreadcrumbList` | All inner pages |
| `LocalBusiness` (city-scoped) | All 3 location pages |

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
1. Copy `blog/how-to-prepare-family-portrait-session.html`
2. Update: `<title>`, `<meta description>`, canonical URL, og: tags, `<h1>`, date, body content
3. Update the `BlogPosting` JSON-LD schema at the top
4. Add cover image to `assets/images/`
5. Add a card for it in `blog.html` (copy an existing `.blog-card` block)
6. Add to `sitemap.xml` with today's date
7. `git add . && git commit -m "Blog: [post title]" && git push`

### Updating prices
- **Event prices ($500/$700/$900):** `event-photography-katy-tx.html` — search `$500`
- **Family prices ($300/$450/$600):** `family-photography-katy-tx.html` — search `$300`
- Also update the FAQ answer text on each page that mentions specific prices
- Also update the FAQ JSON-LD schema (`acceptedAnswer` text)

### Updating testimonials
- `index.html` → find `class="testimonial-card"` → edit name, role, and quote

### Swapping a portfolio image
Replace the file in `assets/images/` with the same filename. No code change needed.

### Updating Google review count
- `index.html` → find `"reviewCount"` in JSON-LD → update number
- Re-deploy: `git add . && git commit -m "Update review count" && git push`

### Adding Cypress / Bridgeland page (post-launch)
1. Copy `katy-tx-photographer.html` → save as `cypress-tx-photographer.html`
2. Update title, meta, H1, canonical, body copy
3. Mention **Bridgeland** by name in the copy — it's a distinct master-planned community in Cypress that clients search for specifically
4. Update `areaServed` in JSON-LD to feature Cypress
5. Add `<url>` entry to `sitemap.xml`
6. Add to the Locations nav in the footer of all pages
7. `git push` to deploy

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

## 🤖 AI & Claude Notes

This site was built with Claude (Anthropic) across multiple sessions. If you continue development in a new Claude chat, paste this README as context at the start. Key facts Claude needs:

| Thing | Value |
|---|---|
| Site type | Static HTML, no framework, no build step |
| Domain | `niopictures.com` — **no hyphen** (nio-pictures.com is wrong) |
| Formspree endpoint | `https://formspree.io/f/xjgpbyeb` |
| GA4 Measurement ID | `G-1VZ3GPSWGH` |
| NiO Chat widget | `<script src="https://chat.niopictures.com/widget.js" defer></script>` |
| Blog asset paths | Blog posts are in `/blog/` subfolder — use `../` for all asset paths |
| External link rel | All external links must use `rel="noopener noreferrer"` |
| Honeypot field | `id="website"` hidden in both forms — JS discards if populated |
| CSP must allow | googletagmanager.com, google-analytics.com, chat.niopictures.com, fonts.googleapis.com, fonts.gstatic.com, formspree.io, niopictures.pixieset.com |
| Favicon | SVG only — PNG versions optional |
| Copyright year | 2026 |
| 404 handling | `404.html` is auto-served by Cloudflare Pages — no `_redirects` rule needed |
