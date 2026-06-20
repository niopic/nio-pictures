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

---

## P0 — Positioning (do first, shapes everything else)

- [ ] **Decide and commit to positioning hierarchy:** Primary = South Asian family celebrations & milestone events (housewarming, half-saree, birthdays, cultural ceremonies); Secondary = family portraits / heirloom sessions; Tertiary / supporting only = corporate events, branding
- [ ] **Rewrite homepage hero/subhead** to reflect this hierarchy
- [ ] **Reorder/adjust nav** so primary services get top billing, tertiary services don't compete for nav space

---

## P0 — Highest business impact (do first)

- [ ] **Reframe price anchoring.** Replace "from $650 / $950" hero copy with the
      package cards (`<PricingSection />`). Lead the eye with the $1,400–$1,950
      tiers, not the floor.
- [x] **Wire pricing.ts into pages.** Remove hardcoded prices from:
      `index.astro`, `book.astro`, `event-photography-katy-tx.astro`,
      `family-photography-katy-tx.astro`, `katy-tx-photographer.astro`.
- [x] **Fix schema price conflict.** Delete `priceRange: "$$"` in
      `BaseLayout.astro`; keep `"$$$"` in `index.astro` (same `@id`, can't be both).
- [x] **Add `hasOfferCatalog: buildOfferCatalog()`** to homepage LocalBusiness JSON-LD.
- [ ] **Consolidate CTAs.** One inquiry-first primary action across the site.
      Demote the external Pixieset self-booking to secondary.

## P1 — Conversion & trust

- [ ] Build a real **on-site portfolio** (stop punting "View Full Gallery" to Pixieset).
- [x] **Replace initials-only reviews.** Replaced P.G./N.M./S.B./S.S./K.P. with real named/located reviews + Google link (see Already shipped).
- [ ] Build **moment-story section on homepage** — 2-3 curated image sequences with captions, additive to existing grid (not a replacement). Images pending: housewarming set (`story-housewarming-1/2/3.webp`), portrait set (`story-portrait-1/2/3.webp`), third category TBD.
- [ ] Add an above-the-fold **trust strip** (5★ · since 2017 · 5 cities served).
- [ ] Add a **"what happens after you inquire"** process section (reduces
      high-ticket hesitation for $1,500+ bookings).
- [ ] Add a **pricing-guide lead magnet** (email capture for non-ready visitors).
- [ ] Sticky **mobile inquiry button**.

## P2 — SEO & content

- [ ] **Add Houston location page** (in title tag, biggest market, no page yet).
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

- [ ] `katy-tx-photographer.astro` maintains its own duplicate `#business` JSON-LD node instead of sharing `BaseLayout`'s — worth consolidating later so a schema field can't drift out of sync again.
- [ ] `$20/image` add-on referenced in `terms.astro` / blog but missing from `pricing.ts` `ADD_ONS` — add when ready to formalize that pricing.
- [ ] No shared `<Nav>` component — nav markup is duplicated across 21 files (`class="nav-links"`). Every future nav change requires a 21-file edit. Consider extracting to a shared `Nav.astro` component.
- [ ] `/portfolio` page funnels deeper browsing to Pixieset ("full gallery lives on Pixieset") — real fix is growing `portfolioImages` in `images.config.ts` with more local images, then removing the Pixieset link entirely. Bigger lift, separate task from the moment-story work.
- [ ] Add lightbox to `/portfolio` page (not homepage moment stories) once more images are added — click thumbnail, view large, arrow through set, no page navigation.

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
