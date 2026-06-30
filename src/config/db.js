import mongoose from "mongoose";

// require dns
import dns from "dns"
dns.setServers(["1.1.1.1", "8.8.8.8"])


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
