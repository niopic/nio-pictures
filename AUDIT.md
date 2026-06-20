# NiO Pictures — Site Audit & Action Tracker

Overall score at audit time: **63 / 100**. Strong technical chassis (Astro,
WebP, deferred CSS, rich schema) held back by positioning leaks, low price
anchoring, and unpackaged revenue. The gap to ~85 is mostly editing decisions,
not a rebuild.

Legend: `[ ]` todo · `[~]` in progress · `[x]` done

---

## ✅ Already shipped (this pass)
- [x] `src/data/pricing.ts` — single source of truth for all pricing
- [x] `src/components/PricingSection.astro` — branded pricing UI reading from pricing.ts
- [x] `public/robots.txt` — keeps training-bot blocks, explicitly allows AI **search** bots
- [x] Wired `pricing.ts` into `index.astro`, `book.astro`, `event-photography-katy-tx.astro`, `family-photography-katy-tx.astro`, `katy-tx-photographer.astro`
- [x] Fixed `priceRange` conflict in `BaseLayout.astro` and `katy-tx-photographer.astro` (both now `$$$`)
- [x] Added `hasOfferCatalog: buildOfferCatalog()` to homepage JSON-LD (validated clean in Google Rich Results Test — 2 only-optional notices: duplicate `url` field across separate schema blocks, no `streetAddress`; both expected/fine to leave)
- [x] Replaced 5 anonymized testimonials (P.G./N.M./S.B./S.S./K.P., duplicated across index/about/event-photography pages) with 2 real named/located testimonials (Venkatesh K. — Fulshear TX, Malav S. — Katy TX) + "Read more reviews on Google" link
- [x] Fixed homepage `aggregateRating` schema to match real GBP (5.0 / 16 reviews, was placeholder 5/7)
- [x] Added click-to-play film showcase section + `VideoObject` schema (placeholder video: Pongal/Tamil Sangam, to be swapped for 40th birthday film when delivered)
- [x] Fixed postal code mismatch: website schema had 77449, but the real Google Business Profile listing (and actual business location) is 77494. Found by manually cross-checking GBP against the site during a live review - same class of NAP inconsistency as other schema bugs fixed tonight, just caught in the one place that required checking outside the codebase.

---

## P0 — Positioning (do first, shapes everything else)

- [x] **Decide and commit to positioning hierarchy:** Hierarchy = South Asian celebrations (housewarming, half-saree, Diwali, milestone birthdays) primary; family portraits secondary; corporate tertiary. Applied to `event-photography-katy-tx.astro` (title, meta, JSON-LD, feature cards) and homepage service-split panel.
- [x] **Rewrite homepage hero/subhead** to reflect this hierarchy — no hero change was needed; `index.astro` hero already leads with "Photography & Film for South Asian Milestones" (h1) and eyebrow "Photography for South Asian milestones". Only the events page and service-split panel had the positioning leak.
- [x] **Reorder/adjust nav** so primary services get top billing, tertiary services don't compete for nav space — verified across 4 files (`index.astro`, `event-photography-katy-tx.astro`, `family-photography-katy-tx.astro`, `about.astro`): both `.nav-links` and `.nav-mobile` already read Celebrations → Family → Portfolio → About → Blog → Contact on every page; no corporate nav item exists on any page.

---

## P0 — Highest business impact (do first)

- [x] **Reframe price anchoring.** Relocated `<PricingSection />` to immediately after the Hybrid Photo + Film section on `index.astro` (homepage hero now showcases packages instead of floor pricing). Removed "$650 / $950" hero copy that was anchoring low; pricing cards now lead with $1,400–$1,950 tiers.
- [x] **Wire pricing.ts into pages.** Remove hardcoded prices from:
      `index.astro`, `book.astro`, `event-photography-katy-tx.astro`,
      `family-photography-katy-tx.astro`, `katy-tx-photographer.astro`.
- [x] **Fix schema price conflict.** Delete `priceRange: "$$"` in
      `BaseLayout.astro`; keep `"$$$"` in `index.astro` (same `@id`, can't be both).
- [x] **Add `hasOfferCatalog: buildOfferCatalog()`** to homepage LocalBusiness JSON-LD.
- [x] **Consolidate CTAs.** Extracted shared `<Nav.astro>` component (eliminates 21-file duplication). Primary CTA across site: "Start a Conversation" inquiry button. Pixieset self-booking demoted to secondary text link ("Prefer to self-book? →") in desktop nav and mobile nav drawer in `Nav.astro`, and to secondary call-to-action in footer. Fixed `main.js` to match `/blog/*` paths for active nav state, not just exact path match (fixes "Blog" active state on individual blog post URLs).

## P1 — Conversion & trust

- [ ] Build a real **on-site portfolio** (stop punting "View Full Gallery" to Pixieset).
- [x] **Replace initials-only reviews.** Replaced P.G./N.M./S.B./S.S./K.P. with real named/located reviews + Google link (see Already shipped).
- [x] Build **moment-story section on homepage** — 3 sequences live: housewarming (Venkatesh K. testimonial, sourced from the former standalone "Client testimonials" section, which was removed and folded into story context), pre-dance portrait (Malav S. testimonial, same origin), and 40th birthday (editorial caption only — no client testimonial exists yet for that session). All 9 images delivered, converted to WebP via `scripts/convert-to-webp.mjs`, and building clean.
- [ ] Add an above-the-fold **trust strip** (5★ · since 2017 · 5 cities served).
- [x] Add a **"what happens after you inquire"** process section (reduces high-ticket hesitation for $1,500+ bookings). A fully-built process section ("How It Works" / "Simple. Seamless. Stunning." / 4 steps: Consultation, Day-Of Coverage, Culling and Edit, Gallery Delivery) already existed on event-photography-katy-tx.astro only. Added an adapted version to the homepage, positioned between the Hybrid Photo + Film section and PricingSection — matching the events page's proven sequence (process → price → objection-handling). Copy generalized slightly ("your event" → "your celebration") since the homepage serves both events and family clients. Events page left unchanged. Follow-up flagged but not done: family-photography-katy-tx.astro still lacks this section — worth a consistency pass later.
- [x] Add a **pricing-guide lead magnet** (email capture for non-ready visitors). Built a 5-page branded PDF guide (real pricing.ts package data + process-section copy, brand colors/typography) at public/downloads/nio-pictures-pricing-guide.pdf. Added an email-capture section to the homepage (positioned after PricingSection), wired to the existing Formspree endpoint with distinguishing hidden fields (_subject, form_type) so submissions are filterable from regular contact inquiries. On success, triggers an actual file download via a programmatic <a download> click (not window.open, which would have been blocked by popup blockers and wouldn't have forced a real download anyway).
- [x] Sticky **mobile inquiry button**. A sticky mobile CTA bar already existed but was homepage-only (scoped markup + CSS inside index.astro). Relocated into BaseLayout.astro so it renders site-wide on every page. Second button changed from "Ask About Film" (homepage-specific) to a tap-to-call "Call Now" button (tel:+12814093585), appropriate across all pages. CSS moved from index.astro's local `<style>` block into the shared components.css at the existing 768px breakpoint.

## P2 — SEO & content

- [x] **Add Houston location page** (in title tag, biggest market, no page yet). Created src/pages/houston-tx-photographer.astro, following the existing location-page template but with corrected patterns: South Asian celebrations leads feature cards (not corporate-first), 'Start a Conversation' -> /contact as primary CTA throughout (not Pixieset), 4-question FAQ including the Mahatma Gandhi District/Hillcroft corridor (real South Asian cultural hub in Houston). Verified via built dist/ output: BreadcrumbList + FAQPage schema present, exactly one canonical #business definition (correctly inherited from BaseLayout).
- [ ] **Add Fulshear location page** (stated service area, no page; fast-growing/affluent).
- [ ] Add **dedicated service pages**: housewarming, half-saree, corporate,
      and a **videography / highlight-film** page.
- [ ] Strengthen **internal linking** between location pages ↔ service pages.
- [ ] Add **pricing/process FAQ** (FAQPage schema) to key pages.

## P3 — AI search (real levers, post robots.txt)

> Note: blocking training bots costs little — recommendations run on the search
> bots, which are now allowed. These are the levers that actually move AI visibility.

- [ ] **Add `VideoObject` schema** for highlight films (currently zero, despite
      "Hybrid Photo + Film" being the headline differentiator).
- [ ] Add **entity-clear copy** near the top of key pages
      ("NiO Pictures is a [X] serving [Y]").
- [ ] Expand **FAQ coverage** (pricing, ritual-specific, turnaround).
- [ ] Add a distinct **`Organization`** node + consistent `founder`.
- [ ] Verify NAP (name/address/phone) is **identical** across every schema block.

## P4 — Revenue (highest untapped margin)

- [ ] Surface **album / print / wall-art** upsells (Legacy already includes one print —
      productize it).
- [ ] **Package & price the hybrid film offer** prominently (it's the moat).
- [ ] Build a **corporate package** for Energy Corridor / local firms.
- [ ] Community-specific positioning (Tamil / Telugu / Gujarati / Punjabi) for
      deeper trust and referrals — without alienating non-Indian clients.

---

## Backlog — Tech debt

- [x] **Resolved.** BaseLayout.astro now renders the single canonical #business JSON-LD node (upgraded to the complete version - aggregateRating, priceRange, geo, founder, hasOfferCatalog, openingHoursSpecification - using the existing description prop so it's correct per-page automatically). Removed duplicate competing #business definitions from index.astro and the 4 location pages (katy-tx, sugar-land, richmond, cypress), which previously had stale reviewCount, leaked corporate-first wording, and a different @type than the homepage's version - same #id, conflicting data, served simultaneously. Verified via built dist/ output, not just source: exactly one full #business definition per page now, with correct {"@id": ...} reference pointers elsewhere (offer catalog providers, BlogPosting publishers, etc.) left intact.
- [ ] `$20/image` add-on referenced in `terms.astro` / blog but missing from `pricing.ts` `ADD_ONS` — add when ready to formalize that pricing.
- [x] **No shared `<Nav>` component.** Extracted `Nav.astro` component (renders both desktop nav and mobile drawer); now used across all pages. Eliminates 21-file duplication — future nav changes are single-point edits.
- [ ] `/portfolio` page funnels deeper browsing to Pixieset ("full gallery lives on Pixieset") — real fix is growing `portfolioImages` in `images.config.ts` with more local images, then removing the Pixieset link entirely. Bigger lift, separate task from the moment-story work.
- [ ] Add lightbox to `/portfolio` page (not homepage moment stories) once more images are added — click thumbnail, view large, arrow through set, no page navigation.
- [ ] **40th birthday client — one testimonial, two places:** When a real testimonial arrives for the 40th birthday session, use it to (1) replace the editorial caption in the homepage moment-story birthday slot and (2) feed the film showcase section, whose placeholder video (Pongal/Tamil Sangam) is already flagged for swap to the 40th birthday film — see "Already shipped". Same client; handle both in one pass, don't write two separate captions independently.
- [x] **Sweep existing location pages for stale CTA/ordering patterns.** Done. All 4 files (richmond, sugar-land, cypress, katy-tx-photographer.astro) swapped to 'Start a Conversation' -> /contact as primary CTA (Pixieset demoted to outline, not removed) and reordered feature-card text to lead with South Asian celebrations instead of corporate. katy-tx-photographer.astro also had a disabled Houston <span> placeholder in its city-switcher row, converted to a live link now that houston-tx-photographer.astro exists. Richmond/Sugar Land/Cypress don't have a city-switcher grid (just loose related-page links), so no Houston placeholder existed there - confirmed, not an oversight. Verified: build clean (22 pages), 'Start a Conversation' is btn-primary on all 4 pages, no Pixieset primaries remain.

---

## Needs live tooling (can't be verified from code)
- [ ] **Core Web Vitals** — run `npx unlighthouse --site niopictures.com`; fix hero LCP if needed.
- [ ] **Google Business Profile** alignment — confirm NAP + categories match the site.
- [ ] **Indexation** — check Search Console coverage once the new pages ship.
- [ ] After deploy, validate JSON-LD in Google's **Rich Results Test**.

---

## Verify-before-commit
```bash
npm run build      # confirm nothing broke
# then paste rendered homepage JSON-LD into search.google.com/test/rich-results
```
