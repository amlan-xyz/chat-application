import cors from "cors";
import "dotenv/config";
import express from "express";
import "./db/connection.js";

//routes
import userRoutes from "./routes/users.route.js";

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Chat app using socket.io");
});

app.use("/users", userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started at PORT:${PORT}`);
});
