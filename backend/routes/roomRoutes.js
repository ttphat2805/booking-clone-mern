import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRoom,
  getOneRoom,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/roomController.js";

const router = express.Router();

router.post("/:hotelId", createRoom);

router.get("/:id", getOneRoom);

router.get("/", getAllRoom);

router.put("/:id", updateRoom);

router.put("/availability/:id", updateRoomAvailability);

router.delete("/:id/:hotelId", deleteRoom);

export default router;
