import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import menuRoutes from "./routes/menu.js";
import orderRoutes from "./routes/orders.js";

// Load environment variables first
dotenv.config();

// Log MONGODB_URI with masked password for debugging
const rawUri = process.env.MONGODB_URI || "";
const maskedUri = rawUri.replace(/\/\/[^:]+:[^@]+@/, "//***:***@");
console.log(`MONGODB_URI loaded: ${maskedUri}`);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI!;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/**
 * Connect to MongoDB with retry logic.
 * Does NOT start the server unless the database connection succeeds.
 */
async function connectWithRetry(maxRetries = 3, delayMs = 5000): Promise<void> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`MongoDB connection attempt ${attempt}/${maxRetries}...`);
      await mongoose.connect(MONGODB_URI, {
        tls: true,
        tlsInsecure: true,
        serverSelectionTimeoutMS: 10000,
      });
      console.log("MongoDB Connected Successfully");
      return;
    } catch (err) {
      console.error(`MongoDB connection error (attempt ${attempt}/${maxRetries}):`, err);
      if (attempt < maxRetries) {
        console.log(`Retrying in ${delayMs / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } else {
        console.error("All MongoDB connection attempts failed. Exiting.");
        process.exit(1);
      }
      console.log("MONGODB_URI : " , MONGODB_URI)
    }
    
  }
}

// Start server only after successful DB connection
connectWithRetry().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

export default app;
