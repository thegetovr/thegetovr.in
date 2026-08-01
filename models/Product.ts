import { Schema, model, models } from "mongoose";
import {
  PRODUCT_CATEGORIES,
  ProductStatus,
} from "@/types/product";

const PRODUCT_STATUSES: ProductStatus[] = [
  "active",
  "draft",
  "archived",
];

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
      enum: PRODUCT_CATEGORIES,
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
  },
  {
    timestamps: true,
  },
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;