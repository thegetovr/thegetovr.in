import { Schema, model, models } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;

  // Role
  role: "user" | "admin";

  // Consent
  consentGiven: boolean;
  consentAt?: Date;

  // Password Reset
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;

  // Profile
  dateOfBirth?: string;
  gender?: string;
}

const userSchema = new Schema<IUser>(
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
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    // =====================================================
    // ROLE
    // =====================================================

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },

    // =====================================================
    // CONSENT
    // =====================================================

    consentGiven: {
      type: Boolean,
      required: true,
      default: false,
    },

    consentAt: {
      type: Date,
      default: undefined,
    },

    // =====================================================
    // PASSWORD RESET
    // =====================================================

    resetPasswordToken: {
      type: String,
      default: undefined,
    },

    resetPasswordExpires: {
      type: Date,
      default: undefined,
    },

    // =====================================================
    // PROFILE
    // =====================================================

    dateOfBirth: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const User = models.User || model<IUser>("User", userSchema);

export default User;
