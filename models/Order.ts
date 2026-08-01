import mongoose, { Schema } from "mongoose";

const CustomerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
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
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const OrderItemSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },

    product: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    printSide: {
      type: String,
      required: true,
    },

    frontElements: {
      type: [Schema.Types.Mixed],
      default: [],
    },

    backElements: {
      type: [Schema.Types.Mixed],
      default: [],
    },

    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    createdAt: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const OrderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    customer: {
      type: CustomerSchema,
      required: true,
    },

    items: {
      type: [OrderItemSchema],
      required: true,
      default: [],
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    coupon: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      required: true,
      enum: [
        "pending",
        "paid",
        "processing",
        "printing",
        "quality-check",
        "packaging",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
      index: true,
    },
    adminNotes: {
      type: String,
      default: "",
      trim: true,
    },
    
  },
  {
    timestamps: true,
  },
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);
