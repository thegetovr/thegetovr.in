import { Schema, model, models } from "mongoose";

const COUPON_TYPES = ["percentage", "flat"] as const;
const COUPON_STATUSES = ["active", "inactive"] as const;

const CouponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    type: {
      type: String,
      enum: COUPON_TYPES,
      required: true,
    },

    value: {
      type: Number,
      required: true,
      min: 0,
    },

    minimumOrderValue: {
      type: Number,
      default: 0,
      min: 0,
    },

    usageLimit: {
      type: Number,
      default: 0,
      min: 0,
    },

    timesUsed: {
      type: Number,
      default: 0,
      min: 0,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: COUPON_STATUSES,
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

const Coupon = models.Coupon || model("Coupon", CouponSchema);

export default Coupon;