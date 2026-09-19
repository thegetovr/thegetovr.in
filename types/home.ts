export interface HomeMedia {
  url: string;
  publicId: string;
  alt: string;
}

export interface HomeTrustPoint {
  icon: string;
  title: string;
  subtitle: string;
}

export interface HomeHero {
  eyebrow: string;
  heading: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
  image: HomeMedia | null;
  trustPoints: HomeTrustPoint[];
}

export interface HomeCategory {
  id: string;
  title: string;
  subtitle: string;
  image: HomeMedia | null;
  link: string;
  order: number;
  enabled: boolean;
}

export interface HomeFeaturedProducts {
  heading: string;
  subheading: string;
  productIds: string[];
  enabled: boolean;
}

export interface HomeStudio {
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
  image: HomeMedia | null;
  enabled: boolean;
}

export interface HomeStory {
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
  image: HomeMedia | null;
  enabled: boolean;
}

export interface HomeReviews {
  eyebrow: string;
  heading: string;
  subheading: string;
  enabled: boolean;
}

export interface HomeCommunity {
  eyebrow: string;
  heading: string;
  description: string;
  socialLink: string;
  images: HomeMedia[];
  enabled: boolean;
}

export interface HomeNewsletter {
  eyebrow: string;
  heading: string;
  description: string;
  buttonLabel: string;
  enabled: boolean;
}

export interface HomeContent {
  id: string;
  hero: HomeHero;
  categories: HomeCategory[];
  featuredProducts: HomeFeaturedProducts;
  studio: HomeStudio;
  story: HomeStory;
  reviews: HomeReviews;
  community: HomeCommunity;
  newsletter: HomeNewsletter;
  updatedAt: string;
  createdAt: string;
}
