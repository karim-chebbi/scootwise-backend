import { Server } from "socket.io";

let io;

// Fallback-safe allowed origins (VERY IMPORTANT)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://scootwise-frontend.vercel.app",
];

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    // Join ride room (for real-time tracking)
    socket.on("join:ride", (rideId) => {
      socket.join(rideId);
      console.log(`🚴 Joined ride room: ${rideId}`);
    });

    // Leave ride room (optional but good practice)
    socket.on("leave:ride", (rideId) => {
      socket.leave(rideId);
      console.log(`🚴 Left ride room: ${rideId}`);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket not initialized");
  return io;
};
