import { Schema, model, models } from "mongoose";
import { ProductStatus } from "@/types/product";

const PRODUCT_STATUSES: ProductStatus[] = ["active", "draft", "archived"];
const VariantSchema = new Schema(
  {
    color: {
      type: String,
      required: true,
      trim: true,
    },

    size: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      trim: true,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    price: {
      type: Number,
      min: 0,
    },
  },
  {
    _id: false,
  },
);

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["ready-made", "customizable"],
      default: "ready-made",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    variants: {
      type: [VariantSchema],
      default: [],
    },

    status: {
      type: String,
      enum: PRODUCT_STATUSES,
      default: "draft",
    },
    media: [
      {
        url: {
          type: String,
          required: true,
        },

        publicId: {
          type: String,
          required: true,
        },

        alt: {
          type: String,
          default: "",
        },

        isCover: {
          type: Boolean,
          default: false,
        },

        order: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
