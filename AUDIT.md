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
- **A build script can silently shadow a config file that looks correct
  in the repo.** `public/_redirects` had the real legacy-redirect rules
  (added across two commits) and looked like the live config — but
  `scripts/minify-public-assets.mjs` copies `_redirects`/`_headers` from
  the **repo root**, not `public/`, and runs *after* `astro build`, so it
  silently overwrote Astro's correct copy with a stale, nearly-empty
  root-level `_redirects` on every single build. The rules were never
  live despite being committed and reviewed. Found September 20, 2026 via
  a live curl showing `/services/` 404ing instead of redirecting — same
  root cause as the Cloudflare AI-bot lesson above: verify against actual
  built/deployed output, not just "the file exists in the repo." Fixed by
  moving the real rules into the root `_redirects` (the one the build
  actually reads) and deleting the dead `public/_redirects` copy.

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
- [x] **P4 revenue: packaged and priced the hybrid photo+film offer prominently** (it's the moat) — Heritage Session's photo+film tier now renders before its photos-only tier, and the "Recommended" badge sits on that tier.
- [x] **CTA hierarchy regression on the two highest-traffic pages.** Fixed — events + family closing banners now have "Start a Conversation" as `btn-primary` with Pixieset as `btn-outline` secondary. About page fixed in both mid-page and closing banner locations.
- [x] **Broken image in `Person` schema.** Fixed — created `public/assets/images/about-portrait.webp` as a stable public copy of `about-main.webp`, matching the `og-home.webp` pattern.
- [x] **Two blog posts using wrong hero images.** Fixed — `how-to-prepare` now uses `blog-prepare.webp`, `blue-hour` now uses `blog-bluehour.webp`.
- [x] `about.astro`'s "Where I Work" grid missing Fulshear + Cypress. Fixed — grid expanded to 6 columns.
- [x] `family-photography-katy-tx.astro`'s "How It Works" process section and its `ogImage`/`twitter:image` (now `family-hero-new.webp`, passed through `BaseLayout`) — confirmed already fixed in the file during the September 13 documentation review.
- [x] **Signature Gala's pricing card leads with its photos-only tier
      instead of photo+film.** Fixed in `314f973` — swapped tier order in
      `pricing.ts` so `gala-film` renders before `gala-photos`, matching
      Heritage Session's pattern. Verified against built `dist/` output:
      the rendered card and the `Offer` JSON-LD both list the $1,950
      photo+film tier first.
- [x] **Events page FAQ JSON-LD hardcoded the coverage-hours ladder and the
      Upanayanam FAQ hardcoded a specific package name.** Fixed in
      `314f973` — the FAQPage JSON-LD block in
      `event-photography-katy-tx.astro` is now built from a `faqLd`
      constant in frontmatter (`JSON.stringify`, rendered via
      `set:html`), matching the `eventHeroImageLd`/`highlightFilmLd`
      pattern already used on that page. The coverage-hours answer and
      the Upanayanam answer are both now built from `pricing.ts` via
      `formatCoverageHours()` and `signatureGala.name`, matching the
      visible FAQ text exactly. Verified against built `dist/` output:
      valid JSON, 8 questions, both answers correct.
- [x] **Homepage "View Full Gallery" button** now points to `/portfolio`. Fixed.
- [x] **`blog/blue-hour-holiday-portraits.astro` referenced an "extra
      images" add-on** that no longer exists in `pricing.ts`. Fixed in
      `314f973` — line now reads "Prints available through your private
      gallery." Verified against built `dist/` output.
- [x] **8 zero-image pages** — all fixed. `katy-tx-photographer`, `houston`, `fulshear`, `sugar-land`, `richmond`, `cypress`, `corporate-photography`, `videography` all now have full-bleed page-hero images. `object-position: top center` applied to all 10 hero pages (8 new + events + family) to prevent face-cropping on desktop.
- [x] **NiO Chat content synced** (separate repo) — occasion matching now gates on coverage duration before naming a specific package.
- [x] **All 6 blog posts were missing the `<main>` landmark, so their
      skip-links were dead** — each post has a
      `<a href="#main-content" class="skip-link">` but no element carried
      that id (one post had `id="main-content"` on a plain `<div>` that
      didn't even wrap the full page). Fixed in `ee9aba8` — every post now
      has a real `<main id="main-content">` wrapping all content.
- [x] **All 6 blog posts (plus the blog index) failed WCAG AA color
      contrast** — `.post-breadcrumb`, `.post-meta`, `.post-img-caption`,
      and `.blog-meta` all used `--muted-dark` (`#6b5f52` on `#161412`
      background, 2.96:1) instead of `--muted` (`#a89880`, ~6.5:1) — the
      same tone already used for all other de-emphasized body text
      site-wide. Fixed in `ee9aba8`. Found via `unlighthouse` audit against
      production (see "Needs live tooling" below); same class of bug as
      the PricingSection contrast fix already listed above, just never
      caught on the blog template.
- [x] **Legacy `/services/` redirect was dead — 404 in production despite
      looking correctly configured in the repo.** The real redirect rules
      lived in `public/_redirects`, but `scripts/minify-public-assets.mjs`
      overwrites `dist/_redirects` from the **repo root** `_redirects`
      after `astro build` runs — a stale, nearly-empty file — silently
      discarding Astro's correct copy on every build. `/services/`,
      `/gallery/`, `/gallery-1/`, `/gallery-2/`, `/pricing/`,
      `/portfolio/`, `/home/`, and `/blog/blue-hour/` were all affected.
      Found because `/services/` still ranks for "katy event
      photographer" in search results (confirmed via live query) but sent
      real clicks to a 404. Fixed — moved the real rules into the root
      `_redirects` (also removed the redundant `.html` hop from each
      target so they land on the final clean URL in one redirect, not
      two), deleted the dead `public/_redirects`. Verified in built
      `dist/_redirects` output. See "Process lessons" above.

---

## Open
- [ ] **Revenue —** Build a corporate package for Energy Corridor / local firms.
- [ ] **Pricing & schema —** Legacy Collection's session-only tier now sits
      below the 2-hour entry tier's price, on the same page. Reads as
      mispriced to a quick scanner even though the coverage and positioning
      differ. Tangled with the WHCC wholesale-cost item below — don't fix
      the ordering optics in isolation from that.
- [ ] **Content —** Housewarming griha pravesham highlight film added to the
      events page (`event-photography-katy-tx.astro` / `VideoFacade.astro`).
      Open question: does this change anything about the homepage's film
      choice, or do the two coexist as-is (events page ↔ homepage)? Not a
      Pongal-placeholder decision — that swap already happened, see
      "Already shipped."
- [ ] **Pricing —** Confirm real WHCC wholesale costs to finalize
      Legacy/Heritage/Gala pricing (currently placeholders, see Decisions
      above).

---

## Needs live tooling (can't be verified from code)
- [x] **Core Web Vitals** — ran `unlighthouse` against production (25 pages
      crawled, Sept 20, 2026). Performance 74-99, no page in the "poor"
      bucket for any metric. Homepage LCP is 3.6s ("needs improvement," not
      "poor") — server responds in 46ms and main-thread work is 0.3s, so
      it's simulated mobile-network latency, not a real bottleneck; only
      concrete opportunity is ~10.7KB more hero-image compression, not
      worth prioritizing alone. This run is what surfaced the two blog
      accessibility bugs now listed in "Already shipped" above.
- [x] **Google Business Profile** alignment confirmed — NAP/reviews match, ZIP mismatch found and fixed (77449 → 77494).
- [ ] **Indexation** — check Search Console coverage once new pages ship.
      Needs your login; no code-side substitute exists.
- [x] **Validated JSON-LD in Google's Rich Results Test** (Sept 20, 2026).
      No errors, three non-critical warnings, all fixed:
      - `event-photography-katy-tx`'s and `family-photography-katy-tx`'s
        hero `ImageObject` blocks were missing the optional
        `copyrightNotice` field, present on the
        homepage/portfolio/`BaseLayout`'s equivalent blocks. Added
        `copyrightNotice: "© 2026 NiO Pictures. All Rights Reserved."`
        to both, matching the existing convention.
      - Both `VideoObject` blocks (`event-photography-katy-tx` and the
        homepage) had a bare-date `uploadDate` (e.g. `"2026-07-18"`),
        flagged as invalid/missing timezone. Changed to full ISO 8601
        datetimes (`"2026-07-18T00:00:00Z"`, `"2026-08-02T00:00:00Z"`).
      All verified in built `dist/` output.
- [x] **Resubmitted sitemap in Google Search Console** (Sept 20, 2026) —
      already showed "Success," 26 discovered URLs, matching the local
      build exactly. Requested re-indexing on
      `event-photography-katy-tx` and the affected `PricingSection`
      pages (`/`, `/family-photography-katy-tx`, `/book`) to pick up the
      FAQ and Signature Gala tier-order changes sooner.
- [x] **Indexation checked (Sept 21, 2026) — significant finding.** Only
      9 of 40 known pages are indexed. Breakdown of the 31 not indexed:
      Page with redirect (5), Not found/404 (4) — both likely stale
      pre-restructure URLs, not concerning. **Discovered - currently not
      indexed (17)** and **Crawled - currently not indexed (5)** are the
      real signal: Google knows about these URLs (via the sitemap) but
      hasn't prioritized crawling/indexing them. The "Discovered" list is
      almost entirely real content — 5 of 6 blog posts,
      `corporate-photography-katy-tx`, `cypress-tx-photographer`,
      `event-photography-katy-tx`, `family-photography-katy-tx`,
      `fulshear-tx-photographer` confirmed, likely more on the unreviewed
      second page. This is **not a code/schema problem** — sitemap,
      JSON-LD, and robots.txt are all confirmed correct earlier in this
      session. "Discovered, not indexed" is a crawl-budget/site-authority
      signal: Google deprioritizes crawling on sites with limited
      backlink/authority signal. This directly reinforces "Non-repo — the
      actual constraint" below, but sharpens it: it's not just that SEO
      work has diminishing returns at the current ceiling — most pages
      aren't indexed yet, so they can't rank *at all* regardless of
      on-page quality. The fix is backlinks (decorator/temple/referral
      outreach, already listed below), not more on-page optimization.
      Tactical mitigation: manually requested indexing on
      `event-photography-katy-tx` earlier this session; worth doing the
      same for the other confirmed URLs above via URL Inspection.

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
