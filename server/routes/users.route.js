import express from "express";
import {
  findUserByUsername,
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
} from "../controllers/users.controller.js";
import authVerify from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("", getAllUsers);

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.post("/verify-token", authVerify, getUserById);

router.get("/:username", findUserByUsername);

export default router;
