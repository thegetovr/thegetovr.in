import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAnnouncement extends Document {
  text: string;
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const announcementSchema = new Schema<IAnnouncement>(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    active: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Announcement =
  (mongoose.models.Announcement as Model<IAnnouncement>) ||
  mongoose.model<IAnnouncement>("Announcement", announcementSchema);

export default Announcement;
