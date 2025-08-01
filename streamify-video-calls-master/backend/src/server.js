import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { existsSync } from "fs";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

// CORS configuration for production
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // Specific allowed origins
      const allowedOrigins = [
        "http://localhost:5173",
        "https://lang-lerner-fb4y.vercel.app",
        "https://lingualink-backend-nohq.onrender.com"
      ];
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('CORS blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // allow frontend to send cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "LinguaLink Backend is running!" });
});

if (process.env.NODE_ENV === "production") {
  // Only serve static files if they exist
  const staticPath = path.join(__dirname, "../frontend/dist");
  if (existsSync(staticPath)) {
    app.use(express.static(staticPath));
    
    app.get("*", (req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  } else {
    // If frontend files don't exist, just serve API
    app.get("/", (req, res) => {
      res.json({ 
        message: "LinguaLink Backend API", 
        status: "running",
        endpoints: {
          health: "/api/health",
          auth: "/api/auth",
          users: "/api/users",
          chat: "/api/chat"
        }
      });
    });
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
