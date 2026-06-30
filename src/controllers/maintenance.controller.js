import Maintenance from "../models/Maintenance.model.js";
import Scooter from "../models/Scooter.model.js";

// REPORT ISSUE
export const reportIssue = async (req, res) => {
  try {
    const { scooterId, issue } = req.body;

    const report = await Maintenance.create({
      scooter: scooterId,
      issue,
      reportedBy: req.user.id,
    });

    await Scooter.findByIdAndUpdate(scooterId, {
      status: "MAINTENANCE",
    });

    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL REPORTS (ADMIN)
export const getReports = async (req, res) => {
  const reports = await Maintenance.find().populate("scooter reportedBy");
  res.json(reports);
};

// RESOLVE MAINTENANCE
export const resolveMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id);

    if (!maintenance) {
      return res.status(404).json({ message: "Report not found" });
    }

    // 1. update maintenance status
    maintenance.status = "RESOLVED";
    await maintenance.save();

    // 2. bring scooter back to AVAILABLE
    await Scooter.findByIdAndUpdate(maintenance.scooter, {
      status: "AVAILABLE",
    });

    res.json({
      message: "Scooter fixed successfully",
      maintenance,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

