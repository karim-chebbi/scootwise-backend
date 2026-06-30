import http from "http";
import app from "./app.js";
import { initSocket } from "./socket/index.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

// 1. Connect MongoDB FIRST
connectDB();

// 2. Create HTTP server
const server = http.createServer(app);

// 3. Attach Socket.IO
initSocket(server);

// 4. Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
