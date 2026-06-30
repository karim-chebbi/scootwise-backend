import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    scooter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scooter",
    },
    startTime: Date,
    endTime: Date,
    distance: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "COMPLETED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Ride", rideSchema);
