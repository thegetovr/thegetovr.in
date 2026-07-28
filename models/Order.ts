import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {},
  {
    strict: false,
    timestamps: true,
  }
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);