import express from "express";
import {
  deleteUser,
  getAllUser,
  getOneUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", getOneUser);

router.get("/", getAllUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
