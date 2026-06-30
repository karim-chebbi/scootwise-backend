import Scooter from "../models/Scooter.model.js";
import { getIO } from "../socket/index.js";
import { emitScooterLocation } from "../socket/scooter.socket.js";

// CREATE SCOOTER (ADMIN)
export const createScooter = async (req, res) => {
  try {
    const scooter = await Scooter.create(req.body);
    res.status(201).json(scooter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL SCOOTERS
export const getScooters = async (req, res) => {
  const scooters = await Scooter.find();
  res.json(scooters);
};

// DELETE SCOOTER (ADMIN)
export const deleteScooter = async (req, res) => {
  try {
    const scooter = await Scooter.findByIdAndDelete(req.params.id);

    if (!scooter) {
      return res.status(404).json({ message: "Scooter not found" });
    }

    res.json({ message: "Scooter deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE LOCATION (GPS SIMULATION)
export const updateLocation = async (req, res) => {
  const { lat, lng } = req.body;

  const io = getIO();

  io.emit("scooter:locationUpdated", {
    scooterId: req.params.id,
    location: { lat, lng },
  });

  const scooter = await Scooter.findByIdAndUpdate(
    req.params.id,
    { location: { lat, lng } },
    { new: true },
  );

  emitScooterLocation(scooter);

  res.json(scooter);
};
