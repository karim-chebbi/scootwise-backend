import express from "express";
import {
  startRide,
  endRide,
  getRides,
  getDashboardStats,
} from "../controllers/ride.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getRides);
router.get("/stats", authMiddleware, getDashboardStats);
router.post("/start", authMiddleware, startRide);
router.put("/end/:id", authMiddleware, endRide);

export default router;
