# NiO Pictures Pre-Launch Task Plan

**Last Updated:** March 28, 2026  
**Current Status:** 🟢 **PRIORITY 0, 1, 3, 4 & 5 COMPLETE — PRIORITY 2 AWAITS FINAL IMAGE EXPORTS**

---

This task list is extracted from your full launch checklist and filtered to what can be executed from this codebase.

## Scope

- Included: tasks that can be audited, validated, or fixed from source files and build output.
- Excluded from active execution: tasks requiring live production accounts, external tools with login, real-device testing, or business profile access.

## ✅ Completed Phases

### Priority 0 — Launch Blockers (9/9 ✅)

- H1 validation, canonical links, robots.txt/sitemap, 404 route, placeholder content, phone/email consistency

### Priority 1 — SEO & Schema (10/10 ✅)

- Title uniqueness/length audit
- Meta description uniqueness/length (trimmed 4 location pages to 150-160 chars)
- City keywords in location pages
- Internal linking coverage
- JSON-LD syntax validation
- LocalBusiness, Service, Person, BreadcrumbList, ImageObject/ImageGallery schema verification
- BreadcrumbList added to Blog hub page

### Priority 3 — Accessibility (7/7 ✅)

- Landmarks verified on all pages (`main`, `nav`, `footer`)
- Skip links verified and focusable
- Alt text quality verified across gallery, blog, and portfolio images
- Contact and booking forms verified for accessible labels and descriptive buttons
- Duplicate honeypot IDs fixed in forms
- Global keyboard focus-visible styles strengthened
- Contrast tokens verified at WCAG AA/AAA levels

### Priority 2 — Performance & Frontend (6/7 checked)

- Hero image loading strategy verified on homepage, portfolio, and blog posts
- Below-fold lazy loading verified across gallery and blog images
- Broken background-image asset paths fixed on homepage and service pages
- Astro Image usage verified for content and gallery images
- Webfont loading strategy verified (`preconnect`, `preload`, `display=swap`)
- Public CSS/JS assets now minified during build via post-build esbuild step
- Remaining blocker: final exported images not ready for final compression audit

### Priority 4 — Security & Privacy (5/5 ✅)

- Privacy and Terms pages verified in footer links and generated output
- `noindex, nofollow` verified on privacy, terms, and 404 pages
- Contact and booking forms verified to submit to Formspree over HTTPS in shared JS
- External links verified with `target="_blank"` plus `rel="noopener noreferrer"`
- No insecure `http://` source references found

### Priority 5 — Deployment & Ops Readiness (4/4 ✅)

- Production build verified clean with 19 generated pages
- `_headers` and `_redirects` now copied into `dist` during the post-build step
- Wrangler config verified to serve `./dist` assets for deployment
- Cache strategy verified in `_headers` for HTML, CSS/JS, images, robots, and sitemap

## Priority 0 - Launch Blockers (Automatable) — ✅ ALL PASS

- [x] ✅ Run full internal link and image path validation on built site pages in dist
- [x] ✅ Re-run Lighthouse on key pages (home, book, contact, portfolio, service pages) in mobile and desktop — **Results: Homepage 100/100/96/100 (M&D), Portfolio 100/100/100/100, Book/Contact 100/97/100/97**
- [x] ✅ Verify one H1 per page and heading order quality across all Astro pages — **All 19 pages have exactly 1 H1**
- [x] ✅ Verify canonical, OG, Twitter, and robots directives on every page in dist — **All verified in built HTML**
- [x] ✅ Verify sitemap URL list matches indexable pages only — **16 URLs, privacy/terms correctly excluded**
- [x] ✅ Verify robots.txt and sitemap reference are correct and crawl-safe — **robots.txt exists, references sitemap**
- [x] ✅ Verify 404 route is generated and internal links never target missing routes — **404.html built and available**
- [x] ✅ Verify no placeholder content remains (Lorem ipsum, Coming Soon, TODO) — **No placeholder content found**
- [x] ✅ Verify phone and email consistency across all pages — **Phone/email in BaseLayout footer (inherited by all)**

### Priority 0 Status: 🟢 READY FOR NEXT PHASE

---

## 📊 Validation Summary

| Category                       | Result           | Notes                                                                                   |
| ------------------------------ | ---------------- | --------------------------------------------------------------------------------------- |
| **Priority 0 (Blockers)**      | ✅ PASS (9/9)    | No critical issues; all blockers cleared                                                |
| **Priority 1 (SEO)**           | ✅ PASS (10/10)  | All 10 schema/SEO checks complete; descriptions trimmed                                 |
| **Priority 2 (Performance)**   | ⚠️ PARTIAL (6/7) | Minification fixed; only final image export audit remains                               |
| **Priority 3 (Accessibility)** | ✅ PASS (7/7)    | Landmarks, skip links, alt text, forms, focus, contrast verified                        |
| **Priority 4 (Security)**      | ✅ PASS (5/5)    | Privacy, noindex, form transport, external links, and HTTPS verified                    |
| **Priority 5 (Deployment)**    | ✅ PASS (4/4)    | Build, metadata files, wrangler config, and cache headers verified                      |
| **Lighthouse (Homepage)**      | ✅ PASS          | Mobile 100/100/96/100, Desktop 100/100/96/100                                           |
| **Core Web Vitals**            | ✅ PASS          | CLS 0.013–0.053, LCP 0.3–1.1s, FCP 0.2–0.9s                                             |
| **Build Status**               | ✅ PASS          | 19 pages, 0 errors                                                                      |
| **Next Phase**                 | 🔄 READY         | Finalize image exports to close the last Priority 2 item, then handle manual follow-ups |

### Priority 0 + 1 Achievements

- ✅ CLS improved from 0.388 → 0.013 (via transition fix + sync CSS)
- ✅ Accessibility improved 92 → 100 (homepage)
- ✅ All 19 pages have canonical + proper meta directives
- ✅ Schema validation complete (Person, Service, ImageGallery, LocalBusiness, BreadcrumbList)
- ✅ Image alt text upgraded across all pages
- ✅ Meta descriptions trimmed for optimal SERP display (150-160 chars)
- ✅ BreadcrumbList added to Blog hub
- ✅ All internal links functional; no orphan pages
- ✅ Unique honeypot IDs and stronger global keyboard focus indicators added
- ✅ Broken homepage and service-page background image paths corrected to shipped WebP assets
- ✅ Built public CSS and JS now minified to single-line production assets
- ✅ No insecure transport or missing noopener/noreferrer external links found
- ✅ Cloudflare deployment metadata files now ship with `dist`

---

## Priority 1 - SEO and Schema Validation (Automatable) — ✅ COMPLETE

- [x] ✅ Audit title uniqueness and target length (50-60) across all pages
- [x] ✅ Audit meta description uniqueness and target length (150-160) — **All trimmed; 155-160 range achieved**
- [x] ✅ Audit city keyword presence in target location pages
- [x] ✅ Audit internal linking coverage to avoid orphan content pages
- [x] ✅ Validate JSON-LD blocks for syntax and required fields by schema type
- [x] ✅ Verify LocalBusiness presence through base layout inheritance
- [x] ✅ Verify Service schema on service pages
- [x] ✅ Verify Person schema on About page
- [x] ✅ Verify BreadcrumbList on major pages — **Added to Blog hub**
- [x] ✅ Verify ImageObject or ImageGallery schema on portfolio assets

## Priority 2 - Performance and Frontend Quality (Automatable) — ⚠️ IN PROGRESS

- [x] ✅ Check hero image loading strategy (eager and high priority where required) — **Verified on homepage, service pages, portfolio hero, and blog post hero images**
- [x] ✅ Check below-fold image lazy loading behavior — **Verified on gallery, blog cards, and below-the-fold content images**
- [x] ✅ Check Astro image usage and output optimization paths — **Content and gallery images use Astro `Image`; broken background asset paths fixed to shipped WebP assets**
- [ ] Audit oversized images and candidate compression opportunities — **Blocked pending final exported images; current shipped WebP assets range from ~32 KB to ~142 KB**
- [x] ✅ Verify CSS and JS production minification via build artifacts — **Build now runs a post-build esbuild minification step; `dist/assets/css/global.css` and `dist/assets/js/main.js` are single-line minified assets**
- [x] ✅ Verify webfont loading strategy and render impact patterns — **`preconnect`, stylesheet preload, and `display=swap` in place**
- [x] ✅ Verify no horizontal overflow at common breakpoints by static CSS rule scan — **No obvious overflow-risk patterns beyond intentional constrained transforms**

## Priority 3 - Accessibility (Automatable + Code Fixable) — ✅ COMPLETE

- [x] ✅ Check landmarks usage page-by-page (main, nav, footer) — **All pages have main navigation, main content, and footer landmarks**
- [x] ✅ Check skip-link availability and focus behavior in markup/CSS — **Skip links present and focusable on all pages**
- [x] ✅ Check image alt quality and detect missing/empty alt misuse — **Gallery, blog, and portfolio images use descriptive alt text**
- [x] ✅ Check form control labeling and descriptive button text — **Contact and booking forms properly labeled**
- [x] ✅ Check duplicate IDs and heading-level skips — **Honeypot duplicate IDs fixed; heading order remains clean**
- [x] ✅ Check keyboard-focus visibility styles for links/buttons/inputs — **Global focus-visible outline added**
- [x] ✅ Check contrast-risk selectors from defined color tokens and usage — **Contrast remains WCAG AA/AAA compliant**

## Priority 4 - Security and Privacy (Automatable) — ✅ COMPLETE

- [x] ✅ Verify privacy and terms pages exist and are linked in footer — **Verified in BaseLayout and generated HTML**
- [x] ✅ Verify privacy and terms remain noindex where intended — **`noindex, nofollow` present on privacy, terms, and 404**
- [x] ✅ Verify contact form method and endpoint configuration in markup — **Shared JS posts contact and booking forms to Formspree over HTTPS**
- [x] ✅ Verify external links use target blank plus noopener noreferrer — **No missing rel attributes found**
- [x] ✅ Verify no insecure http asset references in source — **No `http://` references found in source**

## Priority 5 - Deployment and Ops Readiness (Repository-Level) — ✅ COMPLETE

- [x] ✅ Verify production build is clean and route generation is complete — **Build passes clean with 19 generated pages**
- [x] ✅ Verify redirects and headers files contain required rules — **`_headers` and `_redirects` now copied into `dist`; redirects intentionally minimal for Cloudflare Pages**
- [x] ✅ Verify host config files are present and aligned with deployment target — **`wrangler.jsonc` points to `./dist` and matches the static deployment output**
- [x] ✅ Verify static caching headers strategy in platform config files — **`_headers` defines cache behavior for HTML, CSS/JS, images, robots, and sitemap**

## Manual Follow-Ups (Not Executable Fully from Repo)

- [ ] Google Search Console property, sitemap submission, and coverage review
- [ ] Google Analytics real-time tracking and event conversion checks
- [ ] Google Business Profile consistency and service-area verification
- [ ] Real-device testing (iPhone, Android, iPad families)
- [ ] Browser matrix validation (Safari, Firefox, Edge on real systems)
- [ ] SSL Labs, external broken-link crawlers, and DNS propagation checks
- [ ] End-to-end user journey test in live environment (contact and booking flow)

## Execution Order

1. ✅ Run Priority 0 launch blockers — **COMPLETE (9/9)**
2. ✅ Run Priority 1 SEO and schema checks — **COMPLETE (10/10)**
3. 🔄 Run Priority 2 performance checks — **IN PROGRESS (6/7)**
4. ✅ Run Priority 3 accessibility checks — **COMPLETE (7/7)**
5. ✅ Run Priority 4 security/privacy checks — **COMPLETE (5/5)**
6. ✅ Finish with Priority 5 deployment checks — **COMPLETE (4/4)**
7. ⏭️ Hand off Manual Follow-Ups

## Progress Summary

| Priority              | Status         | Progress | Details                                                                                          |
| --------------------- | -------------- | -------- | ------------------------------------------------------------------------------------------------ |
| **0 - Blockers**      | 🟢 COMPLETE    | 9/9      | H1s, canonicals, robots, 404, phone/email                                                        |
| **1 - SEO**           | 🟢 COMPLETE    | 10/10    | Titles, descriptions, schema, city keywords, internal links                                      |
| **2 - Performance**   | 🟡 IN PROGRESS | 6/7      | Loading strategy, Astro images, fonts, overflow, and minification checked; final exports pending |
| **3 - Accessibility** | 🟢 COMPLETE    | 7/7      | Landmarks, skip links, alt text, forms, focus, contrast                                          |
| **4 - Security**      | 🟢 COMPLETE    | 5/5      | Privacy/terms, noindex, form transport, external links, HTTPS                                    |
| **5 - Deployment**    | 🟢 COMPLETE    | 4/4      | Build clean, redirects/headers shipped, host config, caching headers                             |
| **Manual Follow-Ups** | 📋 NOT STARTED | 0/7      | GSC, GA4, GBP, real devices, browsers, SSL, UX testing                                           |

## Success Criteria

- ✅ Launch blockers: all complete (9/9)
- ✅ Priority 1 SEO: all complete (10/10)
- ⚠️ Priority 2 performance: 6/7 complete; final image exports still pending
- ✅ Priority 3 accessibility: all complete (7/7)
- ✅ Priority 4 security/privacy: all complete (5/5)
- ✅ Priority 5 deployment/ops: all complete (4/4)
- ⏳ Lighthouse: 90+ on key pages (achieved; ready for Priority 2 validation)
- ⏳ No broken internal links or image paths (verified in Priority 0)
- ⏳ No missing critical metadata or schema syntax errors (verified in Priority 1)
- ✅ No unresolved accessibility blockers (verified in Priority 3)
