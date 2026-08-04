import { Schema, model, models } from "mongoose";
import { ProductStatus } from "@/types/product";

const PRODUCT_STATUSES: ProductStatus[] = ["active", "draft", "archived"];

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
