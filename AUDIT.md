# NiO Pictures — Site Audit & Action Tracker

Started at **63/100**. Running estimate as of September 13, 2026: **~84/100**
(+2 since June 28). Reasoning: the P4 revenue item — packaging and pricing
the hybrid film offer prominently — shipped this session, and the last page
still hardcoding turnaround (`videography-katy-tx.astro`) is now wired to
the shared source; both close real infrastructure gaps, not just proof
depth, so they count for more than a typical copy pass. Offsetting that,
this session's restructure also surfaced consistency debt that wasn't
visible before (Signature Gala's tier order now inconsistent with Heritage,
two hardcoded FAQ JSON-LD blocks that will drift on the next ladder change,
a Legacy/entry-tier price-ordering optics issue) — see "Open — Pricing &
schema consistency" below. Net effect is a small, deliberate bump, not a
leap. Remaining gap is still mostly proof depth (image quality/coverage
across service pages), plus this session's new findings — not core
infrastructure or schema.

Legend: `[ ]` todo · `[~]` in progress · `[x]` done

---

## Decisions to not re-litigate

Guardrails and deliberate choices that look like gaps but aren't — re-check
this list before "fixing" any of these:

- **Legacy Collection's album and wall-art tiers, and the Heritage/Gala
  album add-ons,** are placeholder numbers based on standard markup
  guidance, not real WHCC wholesale costs. Don't treat as final margin
  numbers until WHCC costs are confirmed. Separately, the per-image add-on
  that used to exist was **deliberately removed** — it read as anti-premium
  (invites à la carte thinking against the package), not a gap. Don't bring
  it back.
- **The 2-hour entry tier (Intimate Gathering) is priced above the 3-hour
  package's (Heritage Session) effective hourly rate, on purpose.** This
  keeps the pricing ladder self-enforcing — the entry tier can't be used to
  trade down from the mid package. Don't "fix" this by lowering the entry
  tier's price.
- **No pricing changes until 10-15 qualified leads are logged** against the
  new ladder. At current traffic that's 2+ quarters, not 30-60 days —
  repricing off 2-3 objections is noise, not signal.
- **Annaprashan landing page deferred.** Both confirmed Annaprashan leads to
  date came from non-Google sources, so a dedicated SEO landing page isn't
  the lever for that occasion right now.
- **Corporate page is deliberately minimal** and intentionally not linked
  from homepage or nav — tertiary positioning, not an oversight.
- **Fulshear page deliberately uses generic area language**, no named
  neighborhoods/subdivisions.
- **40th birthday moment-story has no testimonial and never will** — Palani
  was second shooter, not the primary client relationship. The editorial
  caption is permanent, not a placeholder. Usage rights are confirmed clear
  via Palani's agreement with the primary shooter.
- **`robots.txt`** blocks training bots but explicitly allows AI search bots
  — deliberate, not inconsistent.
- **Pixieset is always secondary** (`btn-outline`/text link), never the
  primary CTA. "Start a Conversation" → `/contact` is primary site-wide.
  Any page reversing this is a regression.
- **Community-specific ethnic positioning** (Punjabi/Gujarati/etc.) is
  deliberately deferred until real bookings from those communities happen
  organically — not a content gap to fill preemptively.
- **Richmond page hero reuses the Katy housewarming-family photo** —
  no Richmond-specific event photo exists yet. Same file
  (`portfolio-housewarming-family.webp` / `richmond-hero.webp`, confirmed
  byte-identical via sha1sum), two location claims (Katy TX in the
  portfolio caption, Richmond TX on the location page hero). Deliberate
  stopgap, not a duplicate-image bug — don't "fix" by touching either
  caption until a real Richmond client photo is available to replace it.
- **Don't fill the 8 zero-image pages with the Diwali studio portrait set
  one-per-page.** 6 of the 8 unused Diwali images share the identical pink
  studio backdrop from one shoot — spreading them across the 6 location
  pages would make every city page look like the same backdrop with a
  different person, undermining "we shoot all over Houston." Use 2-3 of the
  strongest ones as accents at most; lean on the proven varied portfolio set
  (family/housewarming/event moments) for location-page heroes instead.

---

## Process lessons (apply to every future session)

- **Confirm the repo is actually deployed before diagnosing stale copy.**
  Production was found serving a delivery promise and an FAQ answer that no
  longer existed anywhere in the repo. The cause was undeployed commits, not
  caching — but that wasn't obvious at first, and it cost a full discovery
  cycle chasing strings that had already been fixed locally. Check the live
  deploy against `git log`/`git status` before assuming a caching or CDN
  problem.
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
- **Edge config can silently override repo intent.** `robots.txt`
  deliberately allowed AI search bots while blocking training bots.
  Cloudflare's managed "Block AI bots" rule was 403'ing all AI
  user-agents at the edge, before Astro ran — Googlebot unaffected.
  Nothing in the repo could surface this; it survived every prior
  code-level audit. Found September 13, 2026 by curling production with
  real crawler user-agents. Fixed by setting Block AI bots to Allow
  (Security → Bots) and disabling Bot Fight Mode. Lesson: verify behavior
  against production with the actual client, not just the code — a code
  review cannot see the network edge.

---

## ✅ Already shipped
- [x] **Cloudflare was 403'ing every AI search/answer bot** (`GPTBot`,
      `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Claude-SearchBot`,
      `Claude-User`) at the edge via the managed "Block AI bots" rule,
      completely overriding `robots.txt`'s deliberate allow-list —
      Googlebot/Bingbot were unaffected, so this was invisible to normal
      testing. Confirmed via direct curl against production with real
      crawler user-agents (Sept 13, 2026). Fixed in the Cloudflare
      dashboard: Security → Bots → Block AI bots set to Allow, Bot Fight
      Mode disabled. See "Process lessons" for why this couldn't be
      caught from the repo.
- [x] `pricing.ts` single source of truth + `PricingSection.astro` reading from it, wired into all relevant pages
- [x] `robots.txt` — blocks training bots, allows AI search bots
- [x] Fixed schema `priceRange` conflict (`$$` vs `$$$`) and postal code mismatch (77449 → 77494)
- [x] Added `hasOfferCatalog` to homepage JSON-LD — validated clean in Rich Results Test
- [x] Replaced 5 anonymized testimonials with 2 real named/located reviews (Venkatesh K., Malav S.) + Google reviews link
- [x] Fixed homepage `aggregateRating` to match real GBP (5.0/16, was 5/7)
- [x] Click-to-play film showcase + `VideoObject` schema
- [x] Homepage `VideoObject`/highlight film swapped from the Pongal placeholder to the real 40th birthday highlight film — `duration`/`uploadDate` now populated
- [x] Fixed PricingSection accessibility contrast failure (WCAG AA)
- [x] `videography-katy-tx.astro` wired to dynamic pricing
- [x] Merged redundant film-showcase sections into one
- [x] Added Legacy Collection upsell tiers + Heritage/Gala album add-ons (see Decisions above re: placeholder numbers)
- [x] Added dynamic FAQ questions for housewarming, half-saree, pricing, turnaround; fixed two grammatically broken interpolated sentences
- [x] Positioning hierarchy (South Asian celebrations primary, family secondary, corporate tertiary) applied across events page, homepage, and nav
- [x] Price anchoring reframed — `PricingSection` relocated after Hybrid Photo+Film section, low-anchoring hero copy removed
- [x] Extracted shared `Nav.astro` (eliminated 21-file duplication); Pixieset demoted to secondary everywhere
- [x] Built real on-site `/portfolio` — real images across 5 categories (count has grown since this was first shipped; check `portfolioImages` in `images.config.ts` for the live count rather than trusting a number here), working lightbox; old Pixieset gallery-funnel removed. Homepage CTA now points to `/portfolio`, not Pixieset (confirmed directly in `index.astro`).
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
- [x] **P4 revenue: packaged and priced the hybrid photo+film offer prominently** (it's the moat) — Heritage Session's photo+film tier now renders before its photos-only tier, and the "Recommended" badge sits on that tier. Part of the broader pricing-ladder restructure — see "Session: September 13, 2026" below.

---

## Open — P1 Conversion & trust
- [x] **CTA hierarchy regression on the two highest-traffic pages.** Fixed — events + family closing banners now have "Start a Conversation" as `btn-primary` with Pixieset as `btn-outline` secondary. About page fixed in both mid-page and closing banner locations.
- [x] **Broken image in `Person` schema.** Fixed — created `public/assets/images/about-portrait.webp` as a stable public copy of `about-main.webp`, matching the `og-home.webp` pattern.
- [x] **Two blog posts using wrong hero images.** Fixed — `how-to-prepare` now uses `blog-prepare.webp`, `blue-hour` now uses `blog-bluehour.webp`.
- [x] `about.astro`'s "Where I Work" grid missing Fulshear + Cypress. Fixed — grid expanded to 6 columns.
- [x] `family-photography-katy-tx.astro`'s "How It Works" process section and its `ogImage`/`twitter:image` (now `family-hero-new.webp`, passed through `BaseLayout`) — both previously tracked here as open, both confirmed already fixed in the file during the September 13 documentation review. Removed rather than left open against contradicting code.

## Open — P4 Revenue
- [x] ~~Package & price the hybrid film offer prominently (it's the moat).~~ **Done — moved to "Already shipped."**
- [ ] Build a **corporate package** for Energy Corridor / local firms.

## Open — Pricing & schema consistency
- [ ] **Signature Gala's pricing card leads with its photos-only tier
      instead of photo+film**, inconsistent with how Heritage Session now
      orders its tiers (photo+film first, "Recommended" badge on it).
      One-line tier-order fix in `pricing.ts`.
- [ ] **Legacy Collection's session-only tier now sits below the 2-hour
      entry tier's price, on the same page.** Reads as mispriced to a
      quick scanner even though the coverage and positioning differ.
      Tangled with the WHCC wholesale-cost blocker below — don't fix the
      ordering optics in isolation from that.
- [ ] **Events page FAQ JSON-LD hardcodes the coverage-hours ladder** while
      the visible FAQ text pulls dynamically from `pricing.ts` — will
      silently drift out of sync the next time the ladder changes.
- [ ] **Upanayanam FAQ hardcodes a specific package recommendation by
      name** — same drift risk as the item above if the ladder changes
      again.

## Open — Backlog
- [x] **Homepage "View Full Gallery" button** now points to `/portfolio`. Fixed.
- [x] ~~40th birthday highlight film — swap placeholder video, populate
      `duration`/`uploadDate` once delivered.~~ **Done — see "Already
      shipped."** (Was stale here; corrected during the September 13
      session after independently confirming the swap in `index.astro`.)
- [ ] **Housewarming griha pravesham highlight film added to the events
      page** (`event-photography-katy-tx.astro` / `VideoFacade.astro`).
      Open question: does this change anything about the homepage's film
      choice, or do the two coexist as-is (events page ↔ homepage)? Not a
      Pongal-placeholder decision — that swap already happened, see above.
- [ ] **Confirm real WHCC wholesale costs** to finalize Legacy/Heritage/Gala
      pricing (currently placeholders, see Decisions above).
- [ ] **`blog/blue-hour-holiday-portraits.astro` still references an "extra
      images" add-on** that no longer exists in `pricing.ts` — leftover
      copy missed when the per-image add-on was removed. Found via grep
      while writing up the September 13 session, not fixed here (docs-only
      task) — needs a copy edit in that file.
- [x] **8 zero-image pages** — all fixed. `katy-tx-photographer`, `houston`, `fulshear`, `sugar-land`, `richmond`, `cypress`, `corporate-photography`, `videography` all now have full-bleed page-hero images. `object-position: top center` applied to all 10 hero pages (8 new + events + family) to prevent face-cropping on desktop.

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

**Open finding from this session:** `katy-tx-photographer`, `houston`,
`fulshear`, `sugar-land`, `richmond`, `cypress`, `corporate-photography`,
and `videography` pages have zero images — see consolidated Backlog item
above (now includes the specific unused images identified to fill them).

---

## Session: September 13, 2026 — Pricing ladder restructure

Restructured the pricing ladder to add a true entry point and to stop
special-casing package order and turnaround in individual pages.

- [x] **Added a new entry-tier package, The Intimate Gathering** — a
      2-hour package added as the first rung of the ladder, ahead of
      Heritage Session (see Decisions above re: why it's priced above
      Heritage's per-hour rate on purpose).
- [x] **Rebalanced turnaround** — photo turnaround lengthened and film
      turnaround shortened; the previous photo turnaround commitment
      wasn't sustainable in practice.
- [x] **Removed the id-based ordering special-case in
      `PricingSection.astro`**, replaced with an explicit `order` field on
      `Package`, read generically instead of switching on package id.
- [x] **Heritage Session now renders its photo+film tier before its
      photos-only tier**; the "Recommended" badge moved here from
      Signature Gala (Gala not yet updated to match — see "Open — Pricing
      & schema consistency" above).
- [x] **Rush delivery add-on re-anchored** to the new baseline turnaround.
- [x] **Removed the per-image add-on** from `pricing.ts` (deliberate — see
      Decisions above) and cleaned up the orphaned reference to it in
      `terms.astro`. **Not fully clean:** re-checking while writing this up,
      `blog/blue-hour-holiday-portraits.astro` still has a leftover line
      ("Option to add extra images or order prints through your gallery")
      that reads as the same add-on — flagged as a new Backlog item below
      rather than silently left undocumented.
- [x] **`videography-katy-tx.astro` wired to `pricing.ts` for turnaround**
      — was the last page hardcoding it, in three places, including the
      FAQ JSON-LD's delivery-time sentence.
- [x] **Event page FAQ rewritten** to reflect the full coverage ladder
      (previously written around the old 2-package structure). Note: the
      FAQ's JSON-LD twin was not part of this rewrite — see "Open —
      Pricing & schema consistency" above.
- [x] **NiO Chat content synced** (separate repo) — occasion matching now
      gates on coverage duration before naming a specific package.

---

## Needs live tooling (can't be verified from code)
- [ ] **Core Web Vitals** — run `npx unlighthouse --site niopictures.com`; fix hero LCP if needed.
- [x] **Google Business Profile** alignment confirmed — NAP/reviews match, ZIP mismatch found and fixed (77449 → 77494).
- [ ] **Indexation** — check Search Console coverage once new pages ship.
- [ ] After deploy, validate JSON-LD in Google's **Rich Results Test**.
- [ ] **Resubmit sitemap in Google Search Console** after the next deploy.

---

## Verify-before-commit
```bash
npm run build      # confirm nothing broke
# then paste rendered homepage JSON-LD into search.google.com/test/rich-results
```

---

## Non-repo — the actual constraint

Pricing was never the binding constraint here; lead volume is. SEO is
close to its ceiling for these query volumes — further on-page work has
diminishing returns without more demand entering the funnel. Real demand
routes through temples, decorators, and referrals more than organic search
alone.

Open, non-repo:
- Lead tracking sheet — event type, date, hours requested, source,
  package quoted, price objection (y/n), booked (y/n), loss reason.
- Decorator outreach in Katy/Fulshear.
- Past-client referral note/ask.
- Temple relationships.
