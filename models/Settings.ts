import { Schema, model, models } from "mongoose";

const SettingsSchema = new Schema(
  {
    storeName: {
      type: String,
      required: true,
      trim: true,
    },

    supportEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    currency: {
      type: String,
      required: true,
      trim: true,
      default: "INR",
    },

    taxRate: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    shippingCharge: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    freeShippingThreshold: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    logo: {
      type: String,
      default: "",
    },

    favicon: {
      type: String,
      default: "",
    },

    defaultOrderStatus: {
      type: String,
      required: true,
      default: "pending",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Settings = models.Settings || model("Settings", SettingsSchema);

export default Settings;
