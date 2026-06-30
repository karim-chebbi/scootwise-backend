import mongoose from "mongoose";

const scooterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Scooter",
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "IN_RIDE", "MAINTENANCE", "OFFLINE"],
      default: "AVAILABLE",
    },
    battery: {
      type: Number,
      default: 100,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    location: {
      lat: Number,
      lng: Number,
    },
    isLocked: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Scooter", scooterSchema);
