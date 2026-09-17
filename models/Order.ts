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

    kind: {
      type: String,
      required: true,
      enum: ["ready-made", "custom"],
    },

    // Ready-made product fields
    productId: {
      type: String,
      required: function () {
        return this.kind === "ready-made";
      },
    },

    name: {
      type: String,
      required: function () {
        return this.kind === "ready-made";
      },
    },

    image: {
      type: String,
      default: "",
    },

    // Custom product fields
    product: {
      type: String,
      required: function () {
        return this.kind === "custom";
      },
    },

    color: {
      type: String,
      required: function () {
        return this.kind === "custom";
      },
    },

    size: {
      type: String,
      required: function () {
        return this.kind === "custom";
      },
    },

    printSide: {
      type: String,
      required: function () {
        return this.kind === "custom";
      },
    },

    frontElements: {
      type: [Schema.Types.Mixed],
      default: [],
    },

    backElements: {
      type: [Schema.Types.Mixed],
      default: [],
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
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

    // 🔐 Links the order to the actual logged-in User account
    // Existing old orders may not have this field.
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
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
