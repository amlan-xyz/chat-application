import cors from "cors";
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import "./db/connection.js";
//routes
import chatRoutes from "./routes/chats.route.js";
import messageRoutes from "./routes/messages.route.js";
import userRoutes from "./routes/users.route.js";

const app = express();

app.use(express.json());

app.use(cors());

const http = new createServer(app);

const io = new Server(http, {
  cors: {
    origin: "*",
  },
});

let users = [];

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("sendMessage", (message) => {
    const user = users.find((user) => user.userId === message.recipientId);
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
    }
  });

  socket.on("addNewUser", (userId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({
        userId,
        socketId: socket.id,
      });
    io.emit("getusers", users);
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("getusers", users);
  });
});

app.get("/", (req, res) => {
  res.send("Chat app using socket.io");
});

app.use("/users", userRoutes);
app.use("/chats", chatRoutes);
app.use("/messages", messageRoutes);

const PORT = process.env.PORT || 8080;

http.listen(PORT, () => {
  console.log(`Server started at PORT:${PORT}`);
});
