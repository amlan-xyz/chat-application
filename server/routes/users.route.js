import express from "express";
import {
  findUserByUsername,
  getAllUsers,
  loginUser,
  registerUser,
} from "../controllers/users.controller.js";
const router = express.Router();

router.get("", getAllUsers);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/:username", findUserByUsername);

export default router;
