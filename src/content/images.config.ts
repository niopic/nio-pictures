import type { ImageMetadata } from "astro";

import portfolioEvents1 from "../assets/images/portfolio-events-1.webp";
import portfolioEvents2 from "../assets/images/portfolio-events-2.webp";
import portfolioFamily1 from "../assets/images/portfolio-family-1.webp";
import portfolioFamily2 from "../assets/images/portfolio-family-2.webp";
import portfolioEditorial1 from "../assets/images/portfolio-editorial-1.webp";

import homeAboutPortrait from "../assets/images/home-about-portrait.webp";
import homeAboutMain from "../assets/images/home-about-main.webp";
import homeEventsPanel from "../assets/images/home-events-panel.webp";
import homeFamilyPanel from "../assets/images/home-family-panel.webp";
import homeEventsHero from "../assets/images/home-events-hero.webp";
import homeFamilyHero from "../assets/images/home-family-hero.webp";
import homeGridEvents from "../assets/images/home-grid-events.webp";
import homeGridFamily from "../assets/images/home-grid-family.webp";
import homeGridPortrait from "../assets/images/home-grid-portrait.webp";

import eventsHero from "../assets/images/events-hero.webp";
import eventsPanel from "../assets/images/events-panel.webp";
import eventsAboutPortrait from "../assets/images/events-about-portrait.webp";
import eventsAboutMain from "../assets/images/events-about-main.webp";
import eventsFamilyHero from "../assets/images/events-family-hero.webp";
import eventsFamilyPanel from "../assets/images/events-family-panel.webp";

import familyHero from "../assets/images/family-hero.webp";
import familyPanel from "../assets/images/family-panel.webp";
import familyAboutPortrait from "../assets/images/family-about-portrait.webp";
import familyAboutMain from "../assets/images/family-about-main.webp";
import familyEventsHero from "../assets/images/family-events-hero.webp";
import familyEventsPanel from "../assets/images/family-events-panel.webp";

import aboutMain from "../assets/images/about-main.webp";

import storyHousewarming1 from "../assets/images/story-housewarming-1.webp";
import storyHousewarming2 from "../assets/images/story-housewarming-2.webp";
import storyHousewarming3 from "../assets/images/story-housewarming-3.webp";
import storyPortrait1 from "../assets/images/story-portrait-1.webp";
import storyPortrait2 from "../assets/images/story-portrait-2.webp";
import storyPortrait3 from "../assets/images/story-portrait-3.webp";
import storyBirthday1 from "../assets/images/story-birthday-1.webp";
import storyBirthday2 from "../assets/images/story-birthday-2.webp";
import storyBirthday3 from "../assets/images/story-birthday-3.webp";

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

type MomentStory = {
  category: "housewarming" | "portrait" | "birthday";
  title: string;
  images: [SlotImage, SlotImage, SlotImage];
  testimonial?: {
    quote: string;
    name: string;
    role: string;
    avatarInitials: string;
  };
  caption?: string;
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
  servicePanelEvents: withDimensions(
    homeEventsPanel,
    "Katy TX event photography panel image featuring polished celebration coverage"
  ),
  servicePanelFamily: withDimensions(
    homeFamilyPanel,
    "Katy TX family photography panel image with warm connection and movement"
  ),
  gridSlot1: withDimensions(
    homeGridEvents,
    "Katy TX event photography grid image from a Houston-area celebration"
  ),
  gridSlot2: withDimensions(
    homeGridFamily,
    "Houston area family photography grid image featuring a connected portrait moment"
  ),
  gridSlot3: withDimensions(
    homeEventsHero,
    "Houston TX event photography hero image highlighting cinematic celebration coverage"
  ),
  gridSlot4: withDimensions(
    homeAboutMain,
    "Houston TX photographer portrait for NiO Pictures home page introduction"
  ),
  gridSlot5: withDimensions(
    homeFamilyHero,
    "Katy TX family photography hero image with heirloom portrait warmth"
  ),
  gridSlot6: withDimensions(
    homeGridPortrait,
    "Editorial portrait photography grid image by a Katy TX photographer"
  ),
};

export const eventsImages = {
  pageHero: withDimensions(
    eventsHero,
    "Katy TX event photography hero image showing cinematic celebration coverage"
  ),
  gridSlot1: withDimensions(
    eventsPanel,
    "Houston TX event photography panel image with candid guest interaction"
  ),
  gridSlot2: withDimensions(
    eventsFamilyPanel,
    "Houston area family photography panel image referenced from the events page"
  ),
  gridSlot3: withDimensions(
    eventsAboutPortrait,
    "Katy TX event photographer portrait detail for Houston celebration coverage"
  ),
  gridSlot4: withDimensions(
    eventsAboutMain,
    "Houston TX event photography about image with editorial portrait styling"
  ),
  gridSlot5: withDimensions(
    eventsFamilyHero,
    "Katy TX family photography crossover image used on the events page"
  ),
  gridSlot6: withDimensions(
    eventsAboutMain,
    "Houston TX event photography about image with editorial portrait styling"
  ),
};

export const familyImages = {
  pageHero: withDimensions(
    familyHero,
    "Katy TX family photography hero portrait in warm evening light"
  ),
  gridSlot1: withDimensions(
    familyPanel,
    "Houston TX family photography panel image with natural connection and movement"
  ),
  gridSlot2: withDimensions(
    familyAboutPortrait,
    "Katy TX family photographer portrait detail for heirloom family sessions"
  ),
  gridSlot3: withDimensions(
    familyAboutMain,
    "Houston area family photography about image with refined portrait styling"
  ),
  gridSlot4: withDimensions(
    familyEventsPanel,
    "Houston TX event photography panel image referenced from the family page"
  ),
  gridSlot5: withDimensions(
    familyEventsHero,
    "Katy TX event photography crossover image featured on the family page"
  ),
  gridSlot6: withDimensions(
    familyAboutMain,
    "Houston area family photography about image with refined portrait styling"
  ),
};

export const aboutImages = {
  main: withDimensions(
    aboutMain,
    "Palanivel of NiO Pictures photographed in Katy TX for the Houston-area about page"
  ),
};

export const momentStories: MomentStory[] = [
  {
    category: "housewarming",
    title: "A Housewarming to Remember",
    images: [
      withDimensions(
        storyHousewarming1,
        "Guests gathering in a newly decorated Fulshear TX home during a housewarming party photographed by NiO Pictures"
      ),
      withDimensions(
        storyHousewarming2,
        "Candid celebration moment from a Houston-area housewarming party covered by NiO Pictures near Katy TX"
      ),
      withDimensions(
        storyHousewarming3,
        "Warm connection and room detail from a Fulshear TX housewarming session photographed by NiO Pictures"
      ),
    ],
    testimonial: {
      quote:
        "We had a great experience with Palani at our housewarming party. We truly appreciate his work, he was very gentle, professional, and made everyone feel comfortable. The photos turned out beautiful and captured all the special moments perfectly. Highly recommend!",
      name: "Venkatesh K.",
      role: "Housewarming Party · Fulshear, TX",
      avatarInitials: "VK",
    },
  },
  {
    category: "portrait",
    title: "Before the Dance",
    images: [
      withDimensions(
        storyPortrait1,
        "Katy TX pre-dance portrait session for 8th grade students photographed with NiO Pictures near Houston"
      ),
      withDimensions(
        storyPortrait2,
        "Teen group portrait photography at a Katy TX graduation dance event captured by NiO Pictures"
      ),
      withDimensions(
        storyPortrait3,
        "Editorial-style pre-dance portrait with natural energy and connection in Katy TX by NiO Pictures"
      ),
    ],
    testimonial: {
      quote:
        "Palani from Nio Pictures covered photoshoot for our son's 8th grade graduation dance party. What an amazing experience he delivered to him and his friends. Patient, creative and very diligent is what the experience was. Super happy with all the pictures and would highly recommend Nio Pictures!",
      name: "Malav S.",
      role: "Pre-Dance Portrait Session · Katy, TX",
      avatarInitials: "MS",
    },
  },
  {
    category: "birthday",
    title: "Forty and Celebrated",
    images: [
      withDimensions(
        storyBirthday1,
        "Houston-area 40th birthday celebration photography capturing milestone moments in Katy TX"
      ),
      withDimensions(
        storyBirthday2,
        "Candid 40th birthday party photography with warm atmosphere photographed by NiO Pictures near Houston"
      ),
      withDimensions(
        storyBirthday3,
        "Guest connection and celebratory detail from a Katy TX area 40th birthday party by NiO Pictures"
      ),
    ],
    caption:
      "The milestone speaks for itself — unscripted laughter and gathered faces from a 40th birthday celebration in the Houston-Katy area.",
  },
];