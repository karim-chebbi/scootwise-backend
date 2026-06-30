import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    scooter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scooter",
    },
    issue: String,
    status: {
      type: String,
      enum: ["PENDING", "IN_PROGRESS", "RESOLVED"],
      default: "PENDING",
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Maintenance", maintenanceSchema);
