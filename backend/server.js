// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Connect to the database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", transactionRoutes);

app.get("/", (req, res) => {
  res.send("💼 Finance App Backend Started 🚀");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
