import express from "express";
import {
  createScooter,
  deleteScooter,
  getScooters,
  updateLocation,
} from "../controllers/scooter.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("ADMIN"), createScooter);
router.get("/", authMiddleware, getScooters);
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), deleteScooter);
router.put("/:id/location", authMiddleware, updateLocation);

export default router;
