import express from "express";
import {
  createMessage,
  getMessages,
} from "../controllers/messages.controller.js";
import authVerify from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:chatId", authVerify, createMessage);

router.get("/:chatId", authVerify, getMessages);

export default router;
