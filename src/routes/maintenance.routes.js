import express from "express";
import {
  reportIssue,
  getReports,
  resolveMaintenance,
} from "../controllers/maintenance.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, reportIssue);
router.get("/", authMiddleware, roleMiddleware("ADMIN"), getReports);
router.put(
  "/resolve/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  resolveMaintenance,
);

export default router;
