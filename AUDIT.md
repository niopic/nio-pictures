# NiO Pictures — Site Audit & Action Tracker

Started at **63/100**. Running estimate as of June 28, 2026: **~82/100**.
Remaining gap is mostly proof depth (image quality/coverage across service
pages), not infrastructure or schema.

Legend: `[ ]` todo · `[~]` in progress · `[x]` done

---

## Decisions to not re-litigate

Guardrails and deliberate choices that look like gaps but aren't — re-check
this list before "fixing" any of these:

- **Legacy Collection pricing** ($1,150 / $1,950 tiers, $450/$550 Heritage/Gala
  album add-ons) are placeholder numbers based on standard markup guidance,
  not real WHCC wholesale costs. Don't treat as final margin numbers until
  WHCC costs are confirmed.
- **Corporate page is deliberately minimal** and intentionally not linked
  from homepage or nav — tertiary positioning, not an oversight.
- **Fulshear page deliberately uses generic area language**, no named
  neighborhoods/subdivisions.
- **40th birthday moment-story has no testimonial and never will** — Palani
  was second shooter, not the primary client relationship. The editorial
  caption is permanent, not a placeholder. Usage rights are confirmed clear
  via Palani's agreement with the primary shooter.
- **VideoObject placeholder video** (Pongal/Tamil Sangam) is intentional
  until the real 40th birthday highlight film is delivered — then swap and
  populate `duration`/`uploadDate`.
- **`robots.txt`** blocks training bots but explicitly allows AI search bots
  — deliberate, not inconsistent.
- **Pixieset is always secondary** (`btn-outline`/text link), never the
  primary CTA. "Start a Conversation" → `/contact` is primary site-wide.
  Any page reversing this is a regression.
- **Community-specific ethnic positioning** (Punjabi/Gujarati/etc.) is
  deliberately deferred until real bookings from those communities happen
  organically — not a content gap to fill preemptively.

---

## Process lessons (apply to every future session)

- **Claude Code's self-reported summaries are unverified until independently
  confirmed** against actual repo/git state or built `dist/` output. Caught
  a real instance of this June 28: a verification report cited specific
  file hashes and alt text that didn't exist anywhere in the actual repo —
  the fix had never been applied. Always re-pull and re-check directly
  (`md5sum`, `grep` on built HTML) rather than trusting a summary.
- **Parallel sessions can silently create cross-page duplicates.** Two
  sessions independently picked the same source photos for different pages
  on June 28, caught only via `md5sum` comparison after both had pushed.
  When picking a "fresh" image for any page, check it isn't already in use
  elsewhere on the site, not just unused in the current file.
- **Verify rendered output, not build success.** Always grep `dist/` HTML
  after building — this has caught broken FAQ grammar, stale AUDIT.md
  claims, incorrect schema, and silently-unapplied image fixes.
- **Single source of truth.** All pricing in `pricing.ts`. All image data in
  `images.config.ts`. All business schema in `BaseLayout.astro`. Duplicating
  these is a regression.
- **Hardcoded counts create staleness bugs** (city counts, stat numbers) —
  use non-exhaustive phrasing or derive dynamically.
- **Plan before applying multi-file changes** — show diffs first, surgical
  incremental edits over batch rewrites.

---

## ✅ Already shipped
- [x] `pricing.ts` single source of truth + `PricingSection.astro` reading from it, wired into all relevant pages
- [x] `robots.txt` — blocks training bots, allows AI search bots
- [x] Fixed schema `priceRange` conflict (`$$` vs `$$$`) and postal code mismatch (77449 → 77494)
- [x] Added `hasOfferCatalog` to homepage JSON-LD — validated clean in Rich Results Test
- [x] Replaced 5 anonymized testimonials with 2 real named/located reviews (Venkatesh K., Malav S.) + Google reviews link
- [x] Fixed homepage `aggregateRating` to match real GBP (5.0/16, was 5/7)
- [x] Click-to-play film showcase + `VideoObject` schema (placeholder video — see Decisions above)
- [x] Fixed PricingSection accessibility contrast failure (WCAG AA)
- [x] `videography-katy-tx.astro` wired to dynamic pricing
- [x] Merged redundant film-showcase sections into one
- [x] Added Legacy Collection upsell tiers + Heritage/Gala album add-ons (see Decisions above re: placeholder numbers)
- [x] Added dynamic FAQ questions for housewarming, half-saree, pricing, turnaround; fixed two grammatically broken interpolated sentences
- [x] Positioning hierarchy (South Asian celebrations primary, family secondary, corporate tertiary) applied across events page, homepage, and nav
- [x] Price anchoring reframed — `PricingSection` relocated after Hybrid Photo+Film section, low-anchoring hero copy removed
- [x] Extracted shared `Nav.astro` (eliminated 21-file duplication); Pixieset demoted to secondary everywhere
- [x] Built real on-site `/portfolio` — 32 real images, 5 categories, working lightbox; old Pixieset gallery-funnel removed (caveat: homepage CTA still points to Pixieset, see Backlog)
- [x] Homepage moment-story section — 3 sequences, 9 images, 2 real testimonials
- [x] Above-the-fold trust strip (5★ · since 2017 · cities served)
- [x] "What happens after you inquire" process section added to homepage
- [x] Pricing-guide PDF lead magnet + email capture, wired to Formspree
- [x] Sticky mobile inquiry bar moved into `BaseLayout` (site-wide, was homepage-only)
- [x] Added Houston and Fulshear location pages
- [x] Added housewarming, half-saree, corporate, and videography service pages
- [x] Strengthened internal linking between location ↔ service pages
- [x] Added FAQPage schema to homepage and all dedicated service pages
- [x] `VideoObject`, entity-clear copy, FAQ coverage, `Organization` node + founder, NAP consistency — all verified present across schema
- [x] Confirmed `PricingSection.astro` renders Legacy Collection's 3-tier structure correctly (generic `pkg.tiers` mapping, no component change needed)
- [x] Consolidated single canonical `#business` JSON-LD node in `BaseLayout.astro`, removed 4 duplicate/conflicting definitions
- [x] Swept all location pages for stale CTA/ordering patterns — all now lead with South Asian celebrations, Pixieset demoted

---

## Open — P1 Conversion & trust
- [ ] `family-photography-katy-tx.astro` still lacks the "what happens after you inquire" process section other pages have — consistency pass, not done yet.

## Open — P4 Revenue
- [ ] **Package & price the hybrid film offer** prominently (it's the moat).
- [ ] Build a **corporate package** for Energy Corridor / local firms.

## Open — Backlog
- [ ] **Homepage "View Full Gallery" button still points to Pixieset** instead of the now-real `/portfolio` page. Small fix.
- [ ] 40th birthday highlight film — swap placeholder video, populate `duration`/`uploadDate` once delivered (testimonial expectation already resolved, see Decisions above).
- [ ] **Confirm real WHCC wholesale costs** to finalize Legacy/Heritage/Gala pricing (currently placeholders, see Decisions above).
- [ ] `VideoObject` `duration` field still pending real mm:ss from YouTube (recommended, not critical).

---

## Session: June 28, 2026 — Image audit & cross-page fixes

Image-by-image audit (not just filenames) of every page meant to show
proof-of-work, continuing from the prior session's portfolio rebuild.

- [x] **family-photography-katy-tx.astro** — 3 of 6 grid slots broken: a
      floral-decor photo mislabeled as a "portrait detail," and two slots
      (`gridSlot3`/`gridSlot6`) both showing the **NiO Pictures logo
      graphic** instead of a client photo, with fabricated alt text. Fixed
      with real portraits; de-duplicated the shared import.
- [x] **housewarming + half-saree pages had zero images at all** (confirmed
      via grep, not assumption) — the two pages built around the brand's
      core positioning had no visual proof of work. Added a hero +
      3-image gallery to both, reusing the events page's proven CSS
      pattern.
- [x] **Hero text-overflow bug** on both new heroes — long-form intro
      paragraphs (written pre-image) plus CTA buttons pushed content taller
      than the fixed hero box on mobile, overflowing behind the Nav.
      Fixed by shortening hero copy to match the events page's format and
      removing the hero buttons entirely (both pages already have CTAs
      lower down).
- [x] **Half-saree hero image cropped out the subject's face** — wrong
      aspect ratio (tall portrait forced into a wide hero box). Fixed by
      reshuffling existing half-saree images into aspect-appropriate slots,
      no new images needed.
- [x] **event-photography-katy-tx.astro** — original audit found 6 of 7
      slots broken/off-brand/duplicated; all replaced with real on-brand
      portfolio images. Fixing this surfaced the two process bugs now
      captured permanently in "Process lessons" above (parallel-session
      duplicate images; a fabricated verification report).

**Open finding from this session, not yet acted on:** `katy-tx-photographer`,
`houston`, `fulshear`, `sugar-land`, `richmond`, `cypress`,
`corporate-photography`, and `videography` pages have **zero images** —
confirmed via grep, only a shared `og-home.webp` meta tag exists. Lower
priority than housewarming/half-saree were (discovery/SEO pages, not
primary conversion pages).

---

## Needs live tooling (can't be verified from code)
- [ ] **Core Web Vitals** — run `npx unlighthouse --site niopictures.com`; fix hero LCP if needed.
- [x] **Google Business Profile** alignment confirmed — NAP/reviews match, ZIP mismatch found and fixed (77449 → 77494).
- [ ] **Indexation** — check Search Console coverage once new pages ship.
- [ ] After deploy, validate JSON-LD in Google's **Rich Results Test**.

---

## Verify-before-commit
```bash
npm run build      # confirm nothing broke
# then paste rendered homepage JSON-LD into search.google.com/test/rich-results
```
