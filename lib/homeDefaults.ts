import type { HomeContent } from "@/types/home";

export const homeDefaults: Omit<
  HomeContent,
  "id" | "createdAt" | "updatedAt"
> = {
  hero: {
    eyebrow: "Light Canvas. Dark Attitude.",
    heading: "Wear What Hits Different.",
    description:
      "Premium streetwear. Custom designs. Made for the ones who create their own vibe.",
    primaryCtaLabel: "Shop Now",
    primaryCtaLink: "/shop",
    secondaryCtaLabel: "Explore Studio",
    secondaryCtaLink: "/studio",
    image: null,
    trustPoints: [
      {
        icon: "check",
        title: "Premium Quality",
        subtitle: "Built to last",
      },
      {
        icon: "sparkles",
        title: "Custom Designs",
        subtitle: "Make it yours",
      },
      {
        icon: "truck",
        title: "Fast & Reliable",
        subtitle: "Pan India",
      },
      {
        icon: "star",
        title: "Loved by Thousands",
        subtitle: "4.5+ ratings",
      },
    ],
  },

  categories: [
    {
      id: "tshirts",
      title: "T-Shirts",
      subtitle: "Everyday essentials",
      image: null,
      link: "/shop",
      order: 1,
      enabled: true,
    },
    {
      id: "hoodies",
      title: "Hoodies",
      subtitle: "Built for expression",
      image: null,
      link: "/shop",
      order: 2,
      enabled: true,
    },
    {
      id: "oversized",
      title: "Oversized",
      subtitle: "Bigger statements",
      image: null,
      link: "/shop",
      order: 3,
      enabled: true,
    },
    {
      id: "collections",
      title: "Collections",
      subtitle: "Curated drops",
      image: null,
      link: "/shop",
      order: 4,
      enabled: true,
    },
  ],

  featuredProducts: {
    heading: "Featured Products",
    subheading: "Made to be noticed.",
    productIds: [],
    enabled: true,
  },

  studio: {
    eyebrow: "YOUR DESIGN. YOUR RULES.",
    heading: "Create Something That Is Yours.",
    description:
      "Turn your ideas into custom streetwear with the Getovr Design Studio.",
    ctaLabel: "Explore Studio",
    ctaLink: "/studio",
    image: null,
    enabled: true,
  },

  story: {
    eyebrow: "THE GETOVR STORY",
    heading: "Clothes for People Who Feel More.",
    description:
      "We create pieces for people who see clothing as a form of expression, not just something to wear.",
    ctaLabel: "Our Story",
    ctaLink: "/about",
    image: null,
    enabled: true,
  },

  reviews: {
    eyebrow: "REAL PEOPLE. REAL LOVE.",
    heading: "What People Are Saying.",
    subheading: "Straight from the Getovr community.",
    enabled: true,
  },

  community: {
    eyebrow: "THE COMMUNITY",
    heading: "#GETOVR",
    description:
      "Tag your Getovr fit and become part of the community.",
    socialLink: "https://www.instagram.com/thegetovr/",
    images: [],
    enabled: true,
  },

  newsletter: {
    eyebrow: "STAY IN THE LOOP",
    heading: "Be Part of Something Bigger.",
    description:
      "Get new drops, exclusive releases and updates from The Getovr.",
    buttonLabel: "Subscribe",
    enabled: true,
  },
};