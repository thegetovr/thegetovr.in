import { Schema, model, models } from "mongoose";

const HomeMediaSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      required: true,
      trim: true,
    },
    alt: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const HomeTrustPointSchema = new Schema(
  {
    icon: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const HomeHeroSchema = new Schema(
  {
    eyebrow: {
      type: String,
      required: true,
      trim: true,
    },
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    primaryCtaLabel: {
      type: String,
      required: true,
      trim: true,
    },
    primaryCtaLink: {
      type: String,
      required: true,
      trim: true,
    },
    secondaryCtaLabel: {
      type: String,
      required: true,
      trim: true,
    },
    secondaryCtaLink: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: HomeMediaSchema,
      default: null,
    },
    trustPoints: {
      type: [HomeTrustPointSchema],
      default: [],
    },
  },
  {
    _id: false,
  },
);

const HomeCategorySchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: HomeMediaSchema,
      default: null,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  },
);

const HomeFeaturedProductsSchema = new Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    subheading: {
      type: String,
      required: true,
      trim: true,
    },
    productIds: {
      type: [String],
      default: [],
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  },
);

const HomeStudioSchema = new Schema(
  {
    eyebrow: {
      type: String,
      required: true,
      trim: true,
    },
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    ctaLabel: {
      type: String,
      required: true,
      trim: true,
    },
    ctaLink: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: HomeMediaSchema,
      default: null,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  },
);

const HomeStorySchema = new Schema(
  {
    eyebrow: {
      type: String,
      required: true,
      trim: true,
    },
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    ctaLabel: {
      type: String,
      required: true,
      trim: true,
    },
    ctaLink: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: HomeMediaSchema,
      default: null,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  },
);

const HomeReviewsSchema = new Schema(
  {
    eyebrow: {
      type: String,
      required: true,
      trim: true,
    },
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    subheading: {
      type: String,
      required: true,
      trim: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  },
);

const HomeCommunitySchema = new Schema(
  {
    eyebrow: {
      type: String,
      required: true,
      trim: true,
    },
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    socialLink: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [HomeMediaSchema],
      default: [],
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  },
);

const HomeNewsletterSchema = new Schema(
  {
    eyebrow: {
      type: String,
      required: true,
      trim: true,
    },
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    buttonLabel: {
      type: String,
      required: true,
      trim: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  },
);

const HomeContentSchema = new Schema(
  {
    hero: {
      type: HomeHeroSchema,
      required: true,
    },
    categories: {
      type: [HomeCategorySchema],
      default: [],
    },
    featuredProducts: {
      type: HomeFeaturedProductsSchema,
      required: true,
    },
    studio: {
      type: HomeStudioSchema,
      required: true,
    },
    story: {
      type: HomeStorySchema,
      required: true,
    },
    reviews: {
      type: HomeReviewsSchema,
      required: true,
    },
    community: {
      type: HomeCommunitySchema,
      required: true,
    },
    newsletter: {
      type: HomeNewsletterSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const HomeContent =
  models.HomeContent || model("HomeContent", HomeContentSchema);

export default HomeContent;
