import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
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
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address.",
      ],
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxLength: [15, "Phone number cannot be longer than 15 characters"],
    },
    company: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      enum: ["website", "referral", "social_media", "email_campaign", "other"],
      default: "other",
    },
    status: {
      type: String,
      enum: [
        "new",
        "contacted",
        "qualified",
        "proposal",
        "negotiation",
        "won",
        "lost",
      ],
      default: "new",
    },
    notes: [
      {
        content: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    lastContactDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
