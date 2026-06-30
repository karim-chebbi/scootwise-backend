import { getIO } from "./index.js";

/**
 * Ride started
 */
export const emitRideStarted = (ride) => {
  const io = getIO();

  io.emit("ride:started", {
    rideId: ride._id,
    user: ride.user,
    scooter: ride.scooter,
    startTime: ride.startTime,
  });
};

/**
 * Ride ended
 */
export const emitRideEnded = (ride) => {
  const io = getIO();

  io.emit("ride:ended", {
    rideId: ride._id,
    user: ride.user,
    scooter: ride.scooter,
    cost: ride.cost,
    duration: {
      start: ride.startTime,
      end: ride.endTime,
    },
  });
};

/**
 * Live ride update (optional future feature)
 */
export const emitRideUpdate = (ride) => {
  const io = getIO();

  io.emit("ride:updated", {
    rideId: ride._id,
    status: ride.status,
  });
};
