import { Schema, model, models } from "mongoose";

const WishlistSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    productIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Wishlist =
  models.Wishlist || model("Wishlist", WishlistSchema);

export default Wishlist;