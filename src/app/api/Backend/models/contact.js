import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Fullname is required"],
      trim: true,
      minlength: [2, "Fullname must be at least 2 characters"],
      maxlength: [50, "Fullname must be at most 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address",
      ],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);
