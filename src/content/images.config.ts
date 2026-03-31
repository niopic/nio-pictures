import type { ImageMetadata } from "astro";

import portfolioEvents1 from "../assets/images/portfolio-events-1.jpg";
import portfolioEvents2 from "../assets/images/portfolio-events-2.jpg";
import portfolioFamily1 from "../assets/images/portfolio-family-1.jpg";
import portfolioFamily2 from "../assets/images/portfolio-family-2.jpg";
import portfolioEditorial1 from "../assets/images/portfolio-editorial-1.jpg";

import homeAboutPortrait from "../assets/images/home-about-portrait.jpg";
import homeAboutMain from "../assets/images/home-about-main.jpg";
import homeEventsPanel from "../assets/images/home-events-panel.jpg";
import homeFamilyPanel from "../assets/images/home-family-panel.jpg";
import homeEventsHero from "../assets/images/home-events-hero.jpg";
import homeFamilyHero from "../assets/images/home-family-hero.jpg";
import homeGridEvents from "../assets/images/home-grid-events.jpg";
import homeGridFamily from "../assets/images/home-grid-family.jpg";
import homeGridPortrait from "../assets/images/home-grid-portrait.jpg";

import eventsHero from "../assets/images/events-hero.jpg";
import eventsPanel from "../assets/images/events-panel.jpg";
import eventsAboutPortrait from "../assets/images/events-about-portrait.jpg";
import eventsAboutMain from "../assets/images/events-about-main.jpg";
import eventsFamilyHero from "../assets/images/events-family-hero.jpg";
import eventsFamilyPanel from "../assets/images/events-family-panel.jpg";

import familyHero from "../assets/images/family-hero.jpg";
import familyPanel from "../assets/images/family-panel.jpg";
import familyAboutPortrait from "../assets/images/family-about-portrait.jpg";
import familyAboutMain from "../assets/images/family-about-main.jpg";
import familyEventsHero from "../assets/images/family-events-hero.jpg";
import familyEventsPanel from "../assets/images/family-events-panel.jpg";

import aboutMain from "../assets/images/about-main.jpg";

type PortfolioImage = {
  img: ImageMetadata;
  alt: string;
  category: string;
  label: string;
  caption: string;
  link: string;
  linkText: string;
};

type SlotImage = {
  img: ImageMetadata;
  alt: string;
  width: number;
  height: number;
};

const withDimensions = (img: ImageMetadata, alt: string): SlotImage => ({
  img,
  alt,
  width: img.width,
  height: img.height,
});

export const portfolioImages: PortfolioImage[] = [
  {
    img: portfolioEvents1,
    alt: "Cinematic Katy TX event photography showing guests and atmosphere during a Houston-area celebration",
    category: "event-photography",
    label: "Event Coverage",
    caption:
      "Cinematic event photography built for the big atmosphere and the smaller moments that give a Houston celebration its shape.",
    link: "/event-photography-katy-tx",
    linkText: "See Event Work",
  },
  {
    img: portfolioEvents2,
    alt: "Houston TX event photography capturing candid guest interaction at a polished Katy corporate event",
    category: "event-photography",
    label: "Corporate Events",
    caption:
      "Clean coverage, candid reactions, and room details that help a Katy TX event gallery feel complete instead of generic.",
    link: "/event-photography-katy-tx",
    linkText: "Event Photography",
  },
  {
    img: portfolioFamily1,
    alt: "Katy TX family photography portrait in warm evening light for a Houston-area family session",
    category: "family-photography",
    label: "Family Portraits",
    caption:
      "Family photography that keeps the warmth, movement, and calm connection families in Katy TX want to remember later.",
    link: "/family-photography-katy-tx",
    linkText: "See Family Work",
  },
  {
    img: portfolioFamily2,
    alt: "Lifestyle family photography in Katy TX with natural connection and cinematic light near Houston",
    category: "family-photography",
    label: "Lifestyle Sessions",
    caption:
      "Heirloom-minded family photography for Houston and Katy families who want images that still feel true to them.",
    link: "/family-photography-katy-tx",
    linkText: "Family Photography",
  },
  {
    img: portfolioEditorial1,
    alt: "Editorial portrait photography by a Katy TX photographer creating refined branding-style imagery near Houston",
    category: "editorial-portraiture",
    label: "Editorial Portraits",
    caption:
      "Editorial portraiture with the same restraint and presence that runs through every event and family photography session.",
    link: "/about",
    linkText: "Meet the Photographer",
  },
];

export const homeImages = {
  aboutPortrait: withDimensions(
    homeAboutPortrait,
    "Katy TX family photographer portrait detail for NiO Pictures home about section"
  ),
  aboutMain: withDimensions(
    homeAboutMain,
    "Houston TX photographer portrait for NiO Pictures home page introduction"
  ),
  eventsPanel: withDimensions(
    homeEventsPanel,
    "Katy TX event photography panel image featuring polished celebration coverage"
  ),
  familyPanel: withDimensions(
    homeFamilyPanel,
    "Katy TX family photography panel image with warm connection and movement"
  ),
  eventsHero: withDimensions(
    homeEventsHero,
    "Houston TX event photography hero image highlighting cinematic celebration coverage"
  ),
  familyHero: withDimensions(
    homeFamilyHero,
    "Katy TX family photography hero image with heirloom portrait warmth"
  ),
  gridEvents: withDimensions(
    homeGridEvents,
    "Katy TX event photography grid image from a Houston-area celebration"
  ),
  gridFamily: withDimensions(
    homeGridFamily,
    "Houston area family photography grid image featuring a connected portrait moment"
  ),
  gridPortrait: withDimensions(
    homeGridPortrait,
    "Editorial portrait photography grid image by a Katy TX photographer"
  ),
};

export const eventsImages = {
  hero: withDimensions(
    eventsHero,
    "Katy TX event photography hero image showing cinematic celebration coverage"
  ),
  panel: withDimensions(
    eventsPanel,
    "Houston TX event photography panel image with candid guest interaction"
  ),
  aboutPortrait: withDimensions(
    eventsAboutPortrait,
    "Katy TX event photographer portrait detail for Houston celebration coverage"
  ),
  aboutMain: withDimensions(
    eventsAboutMain,
    "Houston TX event photography about image with editorial portrait styling"
  ),
  familyHero: withDimensions(
    eventsFamilyHero,
    "Katy TX family photography crossover image used on the events page"
  ),
  familyPanel: withDimensions(
    eventsFamilyPanel,
    "Houston area family photography panel image referenced from the events page"
  ),
};

export const familyImages = {
  hero: withDimensions(
    familyHero,
    "Katy TX family photography hero portrait in warm evening light"
  ),
  panel: withDimensions(
    familyPanel,
    "Houston TX family photography panel image with natural connection and movement"
  ),
  aboutPortrait: withDimensions(
    familyAboutPortrait,
    "Katy TX family photographer portrait detail for heirloom family sessions"
  ),
  aboutMain: withDimensions(
    familyAboutMain,
    "Houston area family photography about image with refined portrait styling"
  ),
  eventsHero: withDimensions(
    familyEventsHero,
    "Katy TX event photography crossover image featured on the family page"
  ),
  eventsPanel: withDimensions(
    familyEventsPanel,
    "Houston TX event photography panel image referenced from the family page"
  ),
};

export const aboutImages = {
  main: withDimensions(
    aboutMain,
    "Palanivel of NiO Pictures photographed in Katy TX for the Houston-area about page"
  ),
};