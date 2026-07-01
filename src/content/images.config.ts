import type { ImageMetadata } from "astro";

import portfolioEvents1 from "../assets/images/portfolio-events-1.webp";
import portfolioEvents2 from "../assets/images/portfolio-events-2.webp";
import portfolioFamily1 from "../assets/images/portfolio-family-1.webp";
import portfolioFamily2 from "../assets/images/portfolio-family-2.webp";
import portfolioEditorial1 from "../assets/images/portfolio-editorial-1.webp";

import portfolioHousewarmingRitual from "../assets/images/portfolio/portfolio-housewarming-ritual.webp";
import portfolioHousewarmingFamily from "../assets/images/portfolio/portfolio-housewarming-family.webp";
import portfolioFireceremony from "../assets/images/portfolio/portfolio-fireceremony.webp";
import portfolioIdolDetail from "../assets/images/portfolio/portfolio-idol-detail.webp";
import portfolioHalfsareeApplication from "../assets/images/portfolio/portfolio-halfsaree-application.webp";
import portfolioHalfsareeTilak from "../assets/images/portfolio/portfolio-halfsaree-tilak.webp";
import portfolioHalfsareeSisters from "../assets/images/portfolio/portfolio-halfsaree-sisters.webp";
import portfolioHalfsareeFamily from "../assets/images/portfolio/portfolio-halfsaree-family.webp";
import portfolioHalfsareeSolo from "../assets/images/portfolio/portfolio-halfsaree-solo.webp";
import portfolioFamilyGoldenhour from "../assets/images/portfolio/portfolio-family-goldenhour.webp";
import portfolioFamilyStairs from "../assets/images/portfolio/portfolio-family-stairs.webp";
import portfolioMothersEmbrace from "../assets/images/portfolio/portfolio-mothers-embrace.webp";
import portfolioCoupleEntryway from "../assets/images/portfolio/portfolio-couple-entryway.webp";
import portfolioCakecutting from "../assets/images/portfolio/portfolio-cakecutting.webp";
import portfolioFloralDetail from "../assets/images/portfolio/portfolio-floral-detail.webp";
import portfolioEditorialBokeh2 from "../assets/images/portfolio/portfolio-editorial-bokeh.webp";
import portfolioCoupleStringlights from "../assets/images/portfolio/portfolio-couple-stringlights.webp";
import portfolioGroupKurtas from "../assets/images/portfolio/portfolio-group-kurtas.webp";
import portfolioVenueNight from "../assets/images/portfolio/portfolio-venue-night.webp";
import portfolioDiwaliSherwani from "../assets/images/portfolio/portfolio-diwali-sherwani.webp";
import portfolioDiwaliRedscarf from "../assets/images/portfolio/portfolio-diwali-redscarf.webp";
import portfolioDiwaliRedsaree from "../assets/images/portfolio/portfolio-diwali-redsaree.webp";
import portfolioDiwaliBluefloral from "../assets/images/portfolio/portfolio-diwali-bluefloral.webp";
import portfolioDiwaliDancepose from "../assets/images/portfolio/portfolio-diwali-dancepose.webp";
import portfolioDiwaliMaroonblouse from "../assets/images/portfolio/portfolio-diwali-maroonblouse.webp";
import portfolioDiwaliSeafoam from "../assets/images/portfolio/portfolio-diwali-seafoam.webp";
import portfolioDiwaliCouple from "../assets/images/portfolio/portfolio-diwali-couple.webp";

import homeAboutPortrait from "../assets/images/home-about-portrait.webp";
import homeAboutMain from "../assets/images/home-about-main.webp";
import homeEventsPanel from "../assets/images/home-events-panel.webp";
import homeFamilyPanel from "../assets/images/home-family-panel.webp";
import homeEventsHero from "../assets/images/home-events-hero.webp";
import homeFamilyHero from "../assets/images/home-family-hero.webp";
import homeGridEvents from "../assets/images/home-grid-events.webp";
import homeGridFamily from "../assets/images/home-grid-family.webp";
import homeGridPortrait from "../assets/images/home-grid-portrait.webp";

import housewarmingHero from "../assets/images/housewarming-hero.webp";
import housewarmingGrid1 from "../assets/images/housewarming-grid1.webp";
import housewarmingGrid2 from "../assets/images/housewarming-grid2.webp";
import housewarmingGrid3 from "../assets/images/housewarming-grid3.webp";

import halfSareeHero from "../assets/images/halfsaree-hero.webp";
import halfSareeGrid1 from "../assets/images/halfsaree-grid1.webp";
import halfSareeGrid2 from "../assets/images/halfsaree-grid2.webp";
import halfSareeGrid3 from "../assets/images/halfsaree-grid3.webp";

import eventsHero from "../assets/images/events-hero.webp";
import eventsPanel from "../assets/images/events-panel.webp";
import eventsAboutPortrait from "../assets/images/events-about-portrait.webp";
import eventsAboutMain from "../assets/images/events-about-main.webp";
import eventsAboutMain2 from "../assets/images/events-about-main-2.webp";
import eventsFamilyHero from "../assets/images/events-family-hero.webp";
import eventsFamilyPanel from "../assets/images/events-family-panel.webp";

import familyHeroNew from "../assets/images/family-hero-new.webp";
import familyPanel from "../assets/images/family-panel.webp";
import familyAboutPortrait from "../assets/images/family-about-portrait.webp";
import familyAboutMain from "../assets/images/family-about-main.webp";
import familyGrid6 from "../assets/images/family-grid6.webp";
import familyEventsHero from "../assets/images/family-events-hero.webp";
import familyEventsPanel from "../assets/images/family-events-panel.webp";

import aboutMain from "../assets/images/about-main.webp";

import katyHero from "../assets/images/katy-hero.webp";
import houstonHero from "../assets/images/houston-hero.webp";
import fulshearHero from "../assets/images/fulshear-hero.webp";
import sugarLandHero from "../assets/images/sugar-land-hero.webp";
import richmondHero from "../assets/images/richmond-hero.webp";
import cypressHero from "../assets/images/cypress-hero.webp";
import corporateHero from "../assets/images/corporate-hero.webp";
import videographyHero from "../assets/images/videography-hero.webp";

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
  {
    img: portfolioHousewarmingRitual,
    alt: "Housewarming ritual photography in Katy TX capturing a candid traditional ceremony moment",
    category: "housewarming-photography",
    label: "Housewarming Rituals",
    caption:
      "Housewarming photography that stays close to the ritual itself — the small hands-on moments a Katy TX family will want to keep.",
    link: "/housewarming-photography-katy-tx",
    linkText: "See Housewarming Work",
  },
  {
    img: portfolioHousewarmingFamily,
    alt: "Multi-generational family portrait at a Katy TX housewarming celebration photographed by NiO Pictures",
    category: "housewarming-photography",
    label: "Housewarming Portraits",
    caption:
      "Three generations together for a housewarming portrait — the kind of group photography Houston-area families ask for first.",
    link: "/housewarming-photography-katy-tx",
    linkText: "Housewarming Photography",
  },
  {
    img: portfolioFireceremony,
    alt: "Traditional fire ceremony photography during a Houston-area housewarming ritual near Katy TX",
    category: "housewarming-photography",
    label: "Ritual Coverage",
    caption:
      "Ritual photography built for low light and real movement, so a housewarming ceremony in Katy TX reads true to how it felt.",
    link: "/housewarming-photography-katy-tx",
    linkText: "See Housewarming Work",
  },
  {
    img: portfolioIdolDetail,
    alt: "Silver Kamadhenu idol detail photography styled for a Katy TX housewarming celebration",
    category: "housewarming-photography",
    label: "Ritual Detail",
    caption:
      "Detail photography for the small symbols that carry a lot of meaning — part of how NiO Pictures covers a Houston-area housewarming.",
    link: "/housewarming-photography-katy-tx",
    linkText: "Housewarming Photography",
  },
  {
    img: portfolioHalfsareeApplication,
    alt: "Half-saree ceremony photography in Katy TX showing a traditional sandalwood application moment",
    category: "half-saree-photography",
    label: "Half-Saree Ceremony",
    caption:
      "Half-saree photography that follows the ceremony itself, not just the finished look, for families across the Houston area.",
    link: "/half-saree-photography-katy-tx",
    linkText: "See Half-Saree Work",
  },
  {
    img: portfolioHalfsareeTilak,
    alt: "Tilak ceremony photography during a Katy TX half-saree celebration with traditional blessing gesture",
    category: "half-saree-photography",
    label: "Half-Saree Blessing",
    caption:
      "A quiet blessing moment from a half-saree ceremony — the kind of detail Katy TX families remember long after the event.",
    link: "/half-saree-photography-katy-tx",
    linkText: "Half-Saree Photography",
  },
  {
    img: portfolioHalfsareeSisters,
    alt: "Sisters portrait photography at a Katy TX half-saree ceremony with traditional jewelry and silk saree styling",
    category: "half-saree-photography",
    label: "Half-Saree Portraits",
    caption:
      "Sibling connection captured during a half-saree celebration — genuine, not posed, the way Houston-area families prefer it.",
    link: "/half-saree-photography-katy-tx",
    linkText: "See Half-Saree Work",
  },
  {
    img: portfolioHalfsareeFamily,
    alt: "Family group photography at a Katy TX half-saree ceremony with traditional silk saree and gold jewelry",
    category: "half-saree-photography",
    label: "Half-Saree Family",
    caption:
      "A full family portrait from a half-saree celebration, the milestone photographed the way a Houston-area family wants to remember it.",
    link: "/half-saree-photography-katy-tx",
    linkText: "Half-Saree Photography",
  },
  {
    img: portfolioHalfsareeSolo,
    alt: "Solo portrait photography of a young woman at a Katy TX half-saree ceremony with floral backdrop styling",
    category: "half-saree-photography",
    label: "Half-Saree Solo Portrait",
    caption:
      "A solo half-saree portrait with soft floral styling — the centerpiece image most Katy TX families want from this milestone.",
    link: "/half-saree-photography-katy-tx",
    linkText: "See Half-Saree Work",
  },
  {
    img: portfolioFamilyGoldenhour,
    alt: "Outdoor family photography in golden hour light for a Katy TX family near Houston",
    category: "family-photography",
    label: "Golden Hour Portraits",
    caption:
      "Golden hour family photography with the kind of warm, unforced light Houston-area families ask for by name.",
    link: "/family-photography-katy-tx",
    linkText: "See Family Work",
  },
  {
    img: portfolioFamilyStairs,
    alt: "Family portrait photography on an indoor staircase for a Katy TX family during a celebration",
    category: "family-photography",
    label: "Family Portraits",
    caption:
      "A relaxed family portrait built into the celebration itself, rather than pulled aside as a separate posed moment.",
    link: "/family-photography-katy-tx",
    linkText: "Family Photography",
  },
  {
    img: portfolioMothersEmbrace,
    alt: "Mother and daughter portrait photography in Katy TX showing genuine warmth and connection",
    category: "family-photography",
    label: "Generational Portraits",
    caption:
      "Mother-daughter connection photographed the way it actually happened — warm, unscripted, and specific to this family.",
    link: "/family-photography-katy-tx",
    linkText: "See Family Work",
  },
  {
    img: portfolioCoupleEntryway,
    alt: "Couple portrait photography at a Houston-area home entryway during a festive celebration",
    category: "event-photography",
    label: "Couple Portraits",
    caption:
      "A welcoming entryway portrait that sets the tone for a Houston-area celebration before the night even gets going.",
    link: "/event-photography-katy-tx",
    linkText: "See Event Work",
  },
  {
    img: portfolioCakecutting,
    alt: "Candid cake-cutting photography at a Katy TX milestone birthday celebration with family gathered close",
    category: "event-photography",
    label: "Celebration Candids",
    caption:
      "Real candid energy from a milestone birthday celebration — the moment a Houston-area family actually pauses to gather around.",
    link: "/event-photography-katy-tx",
    linkText: "Event Photography",
  },
  {
    img: portfolioFloralDetail,
    alt: "Floral decor detail photography styled for a Katy TX celebration with soft bokeh lighting",
    category: "event-photography",
    label: "Decor Detail",
    caption:
      "Decor detail photography that rounds out a Houston-area event gallery beyond just portraits and group shots.",
    link: "/event-photography-katy-tx",
    linkText: "See Event Work",
  },
  {
    img: portfolioEditorialBokeh2,
    alt: "Editorial portrait photography with dramatic bokeh lighting for a Houston-area celebration",
    category: "editorial-portraiture",
    label: "Editorial Portraits",
    caption:
      "Editorial-style portraiture with the same restraint and presence that runs through every NiO Pictures session.",
    link: "/about",
    linkText: "Meet the Photographer",
  },
  {
    img: portfolioCoupleStringlights,
    alt: "Couple portrait photography under string lights at a Houston-area evening celebration",
    category: "event-photography",
    label: "Evening Portraits",
    caption:
      "String-light ambiance and a relaxed couple portrait — the kind of warm evening coverage Katy TX hosts ask for.",
    link: "/event-photography-katy-tx",
    linkText: "Event Photography",
  },
  {
    img: portfolioGroupKurtas,
    alt: "Group portrait photography of friends in colorful kurtas at a Houston-area celebration",
    category: "event-photography",
    label: "Group Portraits",
    caption:
      "Genuine group energy captured between friends at a Houston-area celebration, color and personality intact.",
    link: "/event-photography-katy-tx",
    linkText: "See Event Work",
  },
  {
    img: portfolioVenueNight,
    alt: "Wide night photography of a Houston-area home celebration with pool lighting and gathered guests",
    category: "event-photography",
    label: "Venue Atmosphere",
    caption:
      "A wide atmosphere shot that gives a Houston-area celebration its scale — the kind of image a recap gallery needs.",
    link: "/event-photography-katy-tx",
    linkText: "Event Photography",
  },
  {
    img: portfolioDiwaliSherwani,
    alt: "Diwali studio portrait photography of a man in white sherwani with pearl detailing near Katy TX",
    category: "editorial-portraiture",
    label: "Diwali Portraits",
    caption:
      "Studio-lit Diwali portraiture with clean light and real texture — part of how NiO Pictures covers the festival season.",
    link: "/about",
    linkText: "Meet the Photographer",
  },
  {
    img: portfolioDiwaliRedscarf,
    alt: "Diwali studio portrait photography of a man in blue kurta with red dupatta styling near Houston",
    category: "editorial-portraiture",
    label: "Diwali Portraits",
    caption:
      "Festival portraiture with confident color and styling, photographed for a Houston-area Diwali celebration.",
    link: "/about",
    linkText: "Meet the Photographer",
  },
  {
    img: portfolioDiwaliRedsaree,
    alt: "Diwali studio portrait photography of a woman in red silk saree with traditional gold jewelry near Katy TX",
    category: "editorial-portraiture",
    label: "Diwali Portraits",
    caption:
      "Rich color and traditional styling captured in a Diwali studio portrait session near Katy TX.",
    link: "/about",
    linkText: "Meet the Photographer",
  },
  {
    img: portfolioDiwaliBluefloral,
    alt: "Diwali studio portrait photography of a woman in blue floral outfit against a festive backdrop near Houston",
    category: "editorial-portraiture",
    label: "Diwali Portraits",
    caption:
      "Soft styling and festival color photographed against a studio backdrop for a Houston-area Diwali session.",
    link: "/about",
    linkText: "Meet the Photographer",
  },
  {
    img: portfolioDiwaliDancepose,
    alt: "Diwali studio portrait photography of a woman in a celebratory dance pose with gold jewelry near Katy TX",
    category: "editorial-portraiture",
    label: "Diwali Portraits",
    caption:
      "Movement and celebration captured mid-gesture in a Diwali studio portrait session near Katy TX.",
    link: "/about",
    linkText: "Meet the Photographer",
  },
  {
    img: portfolioDiwaliMaroonblouse,
    alt: "Diwali studio portrait photography of a woman in maroon and gold blouse with traditional jewelry near Houston",
    category: "editorial-portraiture",
    label: "Diwali Portraits",
    caption:
      "Elegant traditional styling photographed in a Diwali studio portrait session for a Houston-area family.",
    link: "/about",
    linkText: "Meet the Photographer",
  },
  {
    img: portfolioDiwaliSeafoam,
    alt: "Diwali studio portrait photography of a woman in seafoam embroidered outfit near Katy TX",
    category: "editorial-portraiture",
    label: "Diwali Portraits",
    caption:
      "Refined styling and soft color photographed in a Diwali studio portrait session near Katy TX.",
    link: "/about",
    linkText: "Meet the Photographer",
  },
  {
    img: portfolioDiwaliCouple,
    alt: "Diwali studio portrait photography of a couple in coordinated outfits against a festive backdrop near Houston",
    category: "editorial-portraiture",
    label: "Diwali Portraits",
    caption:
      "A coordinated couple portrait from a Houston-area Diwali studio session, warm light and easy connection.",
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
    "Wide night photography of a Houston-area home celebration with pool lighting and gathered guests"
  ),
  gridSlot2: withDimensions(
    homeGridFamily,
    "Housewarming ritual photography in Katy TX capturing a candid traditional ceremony moment"
  ),
  gridSlot3: withDimensions(
    homeEventsHero,
    "Solo portrait photography of a young woman at a Katy TX half-saree ceremony with floral backdrop styling"
  ),
  gridSlot4: withDimensions(
    homeAboutMain,
    "Silver Kamadhenu idol detail photography styled for a Katy TX housewarming celebration"
  ),
  gridSlot5: withDimensions(
    homeFamilyHero,
    "Mother and daughter portrait photography in Katy TX showing genuine warmth and connection"
  ),
  gridSlot6: withDimensions(
    homeGridPortrait,
    "Outdoor family photography in golden hour light for a Katy TX family near Houston"
  ),
};

export const eventsImages = {
  pageHero: withDimensions(
    eventsHero,
    "Couple portrait photography under string lights at a Houston-area evening celebration"
  ),
  gridSlot1: withDimensions(
    eventsPanel,
    "Candid cake-cutting photography at a Katy TX milestone birthday celebration with family gathered close"
  ),
  gridSlot2: withDimensions(
    eventsFamilyPanel,
    "Couple portrait photography at a Houston-area home entryway during a festive celebration"
  ),
  gridSlot3: withDimensions(
    eventsAboutPortrait,
    "Group portrait of friends in colorful kurtas at a Houston-area evening celebration"
  ),
  gridSlot4: withDimensions(
    eventsAboutMain,
    "Floral decor detail photography styled for a Katy TX celebration with soft bokeh lighting"
  ),
  gridSlot5: withDimensions(
    eventsFamilyHero,
    "Katy TX family photography crossover image used on the events page"
  ),
  gridSlot6: withDimensions(
    eventsAboutMain2,
    "Editorial portrait of a woman in traditional jewelry with warm bokeh lighting at a Houston-area evening celebration"
  ),
};

export const housewarmingImages = {
  pageHero: withDimensions(
    housewarmingHero,
    "Multi-generational family gathered around the stove as milk boils over during a Katy TX housewarming Grihapravesam ritual"
  ),
  gridSlot1: withDimensions(
    housewarmingGrid1,
    "Multi-generational family portrait at a Katy TX housewarming celebration"
  ),
  gridSlot2: withDimensions(
    housewarmingGrid2,
    "Traditional fire ceremony (homam) during a Katy TX housewarming ritual"
  ),
  gridSlot3: withDimensions(
    housewarmingGrid3,
    "Silver Kamadhenu idol detail styled for a Katy TX housewarming celebration"
  ),
};

export const halfSareeImages = {
  pageHero: withDimensions(
    halfSareeHero,
    "Tilak blessing moment during a Katy TX half-saree ceremony with traditional jewelry and floral backdrop"
  ),
  gridSlot1: withDimensions(
    halfSareeGrid1,
    "Family portrait at a Katy TX half-saree ceremony celebration"
  ),
  gridSlot2: withDimensions(
    halfSareeGrid2,
    "Solo portrait of a young woman in traditional half-saree ceremony attire with floral backdrop in Katy TX"
  ),
  gridSlot3: withDimensions(
    halfSareeGrid3,
    "Sisters portrait at a Katy TX half-saree ceremony with traditional jewelry"
  ),
};

export const familyImages = {
  pageHero: withDimensions(
    familyHeroNew,
    "South Asian family of four in traditional attire at a celebration in Katy TX — NiO Pictures family photography"
  ),
  gridSlot1: withDimensions(
    familyPanel,
    "Houston TX family photography panel image with natural connection and movement"
  ),
  gridSlot2: withDimensions(
    familyAboutPortrait,
    "Multi-generational family portrait on an indoor staircase in Katy TX, parents with teenage son and young daughter in traditional attire"
  ),
  gridSlot3: withDimensions(
    familyAboutMain,
    "Outdoor golden hour family portrait in Katy TX, parents and teenage son sharing a candid moment in natural light"
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
    familyGrid6,
    "Multi-generational family gathered for a housewarming ritual blessing in a Katy TX neighborhood, three generations in traditional dress"
  ),
};

export const aboutImages = {
  main: withDimensions(
    aboutMain,
    "Palanivel of NiO Pictures photographed in Katy TX for the Houston-area about page"
  ),
};

export const katyImages = {
  pageHero: withDimensions(katyHero,
    "Mother applying sandalwood during a half-saree ceremony in Katy TX — milestone photography by NiO Pictures"
  ),
};
export const houstonImages = {
  pageHero: withDimensions(houstonHero,
    "Couple in traditional South Asian attire at a Diwali celebration in Houston TX — NiO Pictures event photography"
  ),
};
export const fulshearImages = {
  pageHero: withDimensions(fulshearHero,
    "Multi-generational family at a housewarming celebration in Fulshear TX photographed by NiO Pictures"
  ),
};
export const sugarLandImages = {
  pageHero: withDimensions(sugarLandHero,
    "Family portrait at a half-saree ceremony celebration in Sugar Land TX — NiO Pictures"
  ),
};
export const richmondImages = {
  pageHero: withDimensions(richmondHero,
    "Family portrait at a housewarming celebration in Richmond TX — NiO Pictures"
  ),
};
export const cypressImages = {
  pageHero: withDimensions(cypressHero,
    "Sisters in traditional attire at a half-saree ceremony in Cypress TX — NiO Pictures"
  ),
};
export const corporateImages = {
  pageHero: withDimensions(corporateHero,
    "Group of professionals in formal kurtas at a corporate event in Katy TX — NiO Pictures"
  ),
};
export const videographyImages = {
  pageHero: withDimensions(videographyHero,
    "Couple in a cinematic doorway portrait during a South Asian celebration — NiO Pictures highlight films"
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