import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import scooterRoutes from "./routes/scooter.routes.js";
import rideRoutes from "./routes/ride.routes.js";
import maintenanceRoutes from "./routes/maintenance.routes.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://scootwise-frontend-1ysnkc9gh-karims-projects-9029cce5.vercel.app/login",
    ],
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "ScootWise API is running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/scooters", scooterRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/maintenance", maintenanceRoutes);

export default app;
