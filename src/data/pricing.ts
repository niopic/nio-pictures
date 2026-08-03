/**
 * NiO Pictures — Canonical Pricing Source of Truth
 * --------------------------------------------------
 * This is the ONLY place pricing should be edited. Both the rendered pricing
 * UI and the JSON-LD schema (Offer / OfferCatalog) read from here, so a price
 * change in this file propagates everywhere automatically.
 *
 * Usage in an .astro page:
 *   import { PACKAGES, ADD_ONS, priceFrom, formatUSD, buildOfferCatalog } from "../data/pricing";
 *
 * Usage in schema:
 *   "hasOfferCatalog": buildOfferCatalog()
 */

export type Turnaround = {
  value: number;
  unit: "hours" | "days" | "weeks";
};

export interface PriceTier {
  /** Stable key for analytics / anchors, e.g. "heritage-photos" */
  id: string;
  label: string;
  /** Whole-dollar USD amount */
  price: number;
  /** Optional fine print shown under the price */
  note?: string;
  /** Optional turnaround time (e.g. for film tiers) */
  turnaround?: Turnaround;
  /** Optional prose-friendly description for sentence contexts (separate from label) */
  proseLabel?: string;
}

export interface Package {
  id: string;
  name: string;
  /** One-line positioning shown under the package name */
  tagline: string;
  /** Occasions this package is designed for */
  bestFor: string[];
  /** Coverage hours (in decimal form; e.g., 1.5 for 90 minutes) */
  coverageHours: number;
  coverage: string;
  deliverables: string[];
  /** One or more price tiers (e.g. photos-only vs. photos + film) */
  tiers: PriceTier[];
  /** Surface this as the recommended middle option in the UI */
  featured?: boolean;
  /** Photo turnaround time */
  photoTurnaround: Turnaround;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
}

export const CURRENCY = "USD" as const;

const HERITAGE_PHOTO_TURNAROUND = { value: 7, unit: "days" } as const;
const HERITAGE_FILM_TURNAROUND = { value: 3, unit: "weeks" } as const;
const HERITAGE_COVERAGE_HOURS = 3 as const;

const GALA_PHOTO_TURNAROUND = { value: 7, unit: "days" } as const;
const GALA_FILM_TURNAROUND = { value: 3, unit: "weeks" } as const;
const GALA_COVERAGE_HOURS = 4 as const;

const LEGACY_PHOTO_TURNAROUND = { value: 7, unit: "days" } as const;
const LEGACY_COVERAGE_HOURS = 1.5 as const;

export const CORPORATE_PHOTO_TURNAROUND = { value: 7, unit: "days" } as const;

export const PACKAGES: Package[] = [
  {
    id: "heritage-session",
    name: "The Heritage Session",
    tagline: "Cultural milestones, captured with calm and care.",
    bestFor: [
      "Half-saree ceremonies",
      "Annaprashan",
      "Griha Pravesham",
      "Milestone birthdays",
      "Seemantham",
      "Namkaran ceremonies",
    ],
    coverageHours: HERITAGE_COVERAGE_HOURS,
    coverage: `Up to ${formatCoverageHours(HERITAGE_COVERAGE_HOURS)}, solo`,
    photoTurnaround: HERITAGE_PHOTO_TURNAROUND,
    deliverables: [
      "150+ professionally edited photos",
      `${formatTurnaroundAdj(HERITAGE_PHOTO_TURNAROUND)} delivery`,
      "Private online gallery (Pixieset)",
      "High-resolution downloads, full usage rights",
    ],
    tiers: [
      { id: "heritage-photos", label: "Photos only", price: 950 },
      {
        id: "heritage-film",
        label: "Photos + 3-minute cinematic highlight film",
        proseLabel: "a 3-minute cinematic highlight film",
        price: 1400,
        note: `Film tier includes layered sound design, ${formatTurnaroundAdj(HERITAGE_FILM_TURNAROUND)} delivery`,
        turnaround: HERITAGE_FILM_TURNAROUND,
      },
    ],
  },
  {
    id: "signature-gala",
    name: "The Signature Gala",
    tagline: "Full coverage for your largest celebrations.",
    bestFor: [
      "Large milestone birthdays",
      "Cultural galas",
      "Diwali celebrations",
      "Graduation events",
      "Upanayanam (Thread Ceremony)",
    ],
    coverageHours: GALA_COVERAGE_HOURS,
    coverage: `Up to ${formatCoverageHours(GALA_COVERAGE_HOURS)}, solo`,
    photoTurnaround: GALA_PHOTO_TURNAROUND,
    deliverables: [
      "250+ professionally edited photos",
      `${formatTurnaroundAdj(GALA_PHOTO_TURNAROUND)} delivery`,
      "Private online gallery (Pixieset)",
      "High-resolution downloads, full usage rights",
    ],
    tiers: [
      { id: "gala-photos", label: "Photos only", price: 1400 },
      {
        id: "gala-film",
        label: "Photos + 4-minute cinematic highlight film",
        proseLabel: "a 4-minute cinematic highlight film",
        price: 1950,
        note: `Film tier includes layered sound design, ${formatTurnaroundAdj(GALA_FILM_TURNAROUND)} delivery`,
        turnaround: GALA_FILM_TURNAROUND,
      },
    ],
    featured: true,
  },
  {
    id: "legacy-collection",
    name: "The Legacy Collection",
    tagline: "Timeless portraits, made to be passed down.",
    bestFor: [
      "Multi-generational family portraits",
      "Grandparents visiting",
      "Family milestones",
    ],
    coverageHours: LEGACY_COVERAGE_HOURS,
    coverage: `${formatCoverageHours(LEGACY_COVERAGE_HOURS)} on-location session`,
    photoTurnaround: LEGACY_PHOTO_TURNAROUND,
    deliverables: [
      "30+ professionally edited images",
      `${formatTurnaroundAdj(LEGACY_PHOTO_TURNAROUND)} delivery`,
      "One 8×10 fine art print included",
      "Private online gallery (Pixieset)",
    ],
    tiers: [
      { id: "legacy", label: "Session", price: 650 },
      {
        id: "legacy-album",
        label: "Session + Legacy Album",
        price: 1150
      },
      {
        id: "legacy-complete",
        label: "Session + Legacy Album + Wall Art",
        price: 1950,
        note: "Includes premium leather-cover album and large wall art piece"
      },
    ],
  },
];

export const ADD_ONS: AddOn[] = [
  {
    id: "social-reel",
    name: "Next-Day Social Reel",
    description: "60-sec vertical, Instagram/WhatsApp ready",
    price: 175,
  },
  {
    id: "raw-archive",
    name: "Raw Footage Archive",
    description: "Full unedited footage delivered on request",
    price: 200,
  },
  {
    id: "extra-hour",
    name: "Extra Hour of Coverage",
    description: "Additional hour of solo coverage on the day",
    price: 300,
  },
  {
    id: "rush-delivery",
    name: "Rush Photo Delivery",
    description: "24 hrs instead of 48",
    price: 150,
  },
  {
    id: "extra-images",
    name: "Additional Images",
    description: "Beyond your package allowance, purchased individually",
    price: 20,
  },
  {
    id: "heritage-album",
    name: "Heritage Album",
    description: "Premium leather-cover album, available with the Heritage Session",
    price: 450,
  },
  {
    id: "gala-album",
    name: "Gala Album",
    description: "Premium leather-cover album, available with the Signature Gala",
    price: 550,
  },
];

/* ----------------------------- Helpers ----------------------------- */

/** Format coverage hours as human-readable string, e.g. "3 hours", "90 minutes" */
export function formatCoverageHours(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)} minutes`;
  }
  if (hours % 1 === 0) {
    return `${hours} hour${hours === 1 ? "" : "s"}`;
  }
  return `${Math.round(hours * 60)} minutes`;
}

/** Format turnaround as adjective, e.g. "48-hour", "7-day", "3-week" */
export function formatTurnaroundAdj(t: Turnaround): string {
  const singularUnit = t.unit.slice(0, -1);
  return `${t.value}-${singularUnit}`;
}

/** Format turnaround in full, e.g. "48 hours", "7 days", "3 weeks" */
export function formatTurnaroundFull(t: Turnaround): string {
  const pluralUnit = t.value === 1 ? t.unit.slice(0, -1) : t.unit;
  return `${t.value} ${pluralUnit}`;
}

/** Format a whole-dollar amount as "$1,400". */
export function formatUSD(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

/** Lowest price within a single package (across its tiers). */
export function packageFrom(pkg: Package): number {
  return Math.min(...pkg.tiers.map((t) => t.price));
}

/** Lowest price across ALL packages — use for "Sessions from $X" anchors. */
export function priceFrom(): number {
  return Math.min(...PACKAGES.map(packageFrom));
}

/** Highest tier across all packages — useful for "$X–$Y" range copy. */
export function priceTo(): number {
  return Math.max(...PACKAGES.flatMap((p) => p.tiers.map((t) => t.price)));
}

/**
 * Build a schema.org OfferCatalog from the packages above.
 * Drop the return value straight into your LocalBusiness JSON-LD as
 * "hasOfferCatalog": buildOfferCatalog().
 */
export function buildOfferCatalog() {
  return {
    "@type": "OfferCatalog",
    name: "Photography & Film Packages",
    itemListElement: PACKAGES.flatMap((pkg) =>
      pkg.tiers.map((tier) => ({
        "@type": "Offer",
        name: `${pkg.name} — ${tier.label}`,
        description: pkg.tagline,
        price: tier.price.toString(),
        priceCurrency: CURRENCY,
        category: "Photography",
        itemOffered: {
          "@type": "Service",
          name: pkg.name,
          serviceType: pkg.bestFor.join(", "),
          areaServed: "Katy, TX",
          provider: { "@id": "https://niopictures.com/#business" },
        },
      })),
    ),
  };
}
