import { getIO } from "./index.js";

/**
 * Emit scooter location update
 */
export const emitScooterLocation = (scooter) => {
  const io = getIO();

  io.emit("scooter:locationUpdated", {
    scooterId: scooter._id,
    location: scooter.location,
  });
};

/**
 * Emit scooter status change (AVAILABLE / IN_RIDE / MAINTENANCE)
 */
export const emitScooterStatus = (scooter) => {
  const io = getIO();

  io.emit("scooter:statusUpdated", {
    scooterId: scooter._id,
    status: scooter.status,
    isLocked: scooter.isLocked,
  });
};

/**
 * Emit battery update
 */
export const emitScooterBattery = (scooter) => {
  const io = getIO();

  io.emit("scooter:batteryUpdated", {
    scooterId: scooter._id,
    battery: scooter.battery,
  });
};
