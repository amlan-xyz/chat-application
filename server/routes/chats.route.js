import express from "express";
import {
  createChat,
  findAllChats,
  findSpecificChat,
} from "../controllers/chats.controller.js";
import authVerify from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authVerify, createChat);

router.get("/", authVerify, findAllChats);

router.get("/:recieverId", authVerify, findSpecificChat);

export default router;
