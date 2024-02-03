import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat_id: String,
    sender_id: String,
    text: String,
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
