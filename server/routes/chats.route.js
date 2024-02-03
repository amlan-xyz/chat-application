import express from "express";
import {
  createChat,
  findAllChats,
  findSpecificChat,
} from "../controllers/chats.controller.js";
import authVerify from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authVerify, findAllChats);

router.get("/:recieverId", authVerify, findSpecificChat);

router.post("/:recieverId", authVerify, createChat);

export default router;
