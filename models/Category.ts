import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "hidden"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Category =
  models.Category ||
  model("Category", CategorySchema);

export default Category;