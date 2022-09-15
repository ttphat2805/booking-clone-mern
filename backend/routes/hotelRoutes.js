import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotel,
  getHotelRoom,
  getOneHotel,
  updateHotel,
} from "../controllers/hotelController.js";

const router = express.Router();

router.post("/", createHotel);

router.get("/getOneHotel/:id", getOneHotel);

router.get("/", getAllHotel);

router.put("/:id", updateHotel);

router.delete("/:id", deleteHotel);

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

router.get("/room/:id", getHotelRoom);

export default router;
