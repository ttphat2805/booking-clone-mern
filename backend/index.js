import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

// ROUTE

app.use("/api/auth", authRoutes);

app.use("/api/hotel", hotelRoutes);

app.use("/api/room", roomRoutes);

app.use("/api/user", userRoutes);

// MIDDLEWARE ERROR

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(` Connected to Backend in PORT "${PORT}" Successfully `.bgBlue)
);
