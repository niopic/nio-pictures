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

export interface PriceTier {
  /** Stable key for analytics / anchors, e.g. "heritage-photos" */
  id: string;
  label: string;
  /** Whole-dollar USD amount */
  price: number;
  /** Optional fine print shown under the price */
  note?: string;
}

export interface Package {
  id: string;
  name: string;
  /** One-line positioning shown under the package name */
  tagline: string;
  /** Occasions this package is designed for */
  bestFor: string[];
  coverage: string;
  deliverables: string[];
  /** One or more price tiers (e.g. photos-only vs. photos + film) */
  tiers: PriceTier[];
  /** Surface this as the recommended middle option in the UI */
  featured?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
}

export const CURRENCY = "USD" as const;

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
    ],
    coverage: "Up to 3 hours, solo",
    deliverables: [
      "150+ professionally edited photos",
      "48-hour delivery",
      "Private online gallery (Pixieset)",
      "High-resolution downloads, full usage rights",
    ],
    tiers: [
      { id: "heritage-photos", label: "Photos only", price: 950 },
      {
        id: "heritage-film",
        label: "Photos + 3-minute cinematic highlight film",
        price: 1400,
        note: "Film tier includes layered sound design, 3-week delivery",
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
    ],
    coverage: "Up to 4 hours, solo",
    deliverables: [
      "250+ professionally edited photos",
      "48-hour delivery",
      "Private online gallery (Pixieset)",
      "High-resolution downloads, full usage rights",
    ],
    tiers: [
      { id: "gala-photos", label: "Photos only", price: 1400 },
      {
        id: "gala-film",
        label: "Photos + 4-minute cinematic highlight film",
        price: 1950,
        note: "Film tier includes layered sound design, 3-week delivery",
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
    coverage: "90-minute on-location session",
    deliverables: [
      "30+ professionally edited images",
      "7-day delivery",
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
