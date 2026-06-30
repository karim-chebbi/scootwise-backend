import Ride from "../models/Ride.model.js";
import Scooter from "../models/Scooter.model.js";
import { calculateRideCost } from "../utils/pricing.js";
import { emitRideStarted } from "../socket/ride.socket.js";
import { emitScooterStatus } from "../socket/scooter.socket.js";
import { emitRideEnded } from "../socket/ride.socket.js";

export const getRides = async (req, res) => {
  try {
    const rides = await Ride.find()
      .populate("user", "name email")
      .populate("scooter", "name")
      .sort({ createdAt: -1 });

    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const [activeRides, scooters, completedRides] = await Promise.all([
      Ride.countDocuments({ status: "ACTIVE" }),
      Scooter.find(),
      Ride.find({ status: "COMPLETED" }),
    ]);

    const fleetHealth = scooters.length
      ? Math.round(
          scooters.reduce(
            (sum, scooter) => sum + Number(scooter.battery || 0),
            0,
          ) / scooters.length,
        )
      : 0;

    const revenue = completedRides.reduce(
      (sum, ride) => sum + Number(ride.cost || 0),
      0,
    );

    res.json({
      activeRides,
      fleetHealth,
      revenue,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// START RIDE
export const startRide = async (req, res) => {
  try {
    const { scooterId } = req.body;

    const scooter = await Scooter.findById(scooterId);

    if (!scooter || scooter.status !== "AVAILABLE") {
      return res.status(400).json({ message: "Scooter not available" });
    }

    scooter.status = "IN_RIDE";
    scooter.isLocked = false;
    await scooter.save();

    const ride = await Ride.create({
      user: req.user.id,
      scooter: scooterId,
      startTime: new Date(),
      status: "ACTIVE",
    });

    emitRideStarted(ride);

    emitScooterStatus({
      _id: scooter._id,
      status: "IN_RIDE",
      isLocked: false,
    });

    res.status(201).json(ride);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// END RIDE
export const endRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        message: "Ride not found",
      });
    }

    const endTime = new Date();

    ride.endTime = endTime;

    ride.cost = calculateRideCost(ride.startTime, endTime);

    ride.status = "COMPLETED";

    await ride.save();

    const scooter = await Scooter.findById(ride.scooter);

    scooter.status = "AVAILABLE";
    scooter.isLocked = true;

    await scooter.save();

    emitRideEnded(ride);

    emitScooterStatus({
      _id: scooter._id,
      status: "AVAILABLE",
      isLocked: true,
    });

    res.json(ride);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
