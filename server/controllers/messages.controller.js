import Message from "../models/messages.model.js";

export const createMessage = async (req, res) => {
  const senderId = req.user.userId;
  const { chatId, text } = req.body;

  const message = new Message({
    sender_id: senderId,
    chat_id: chatId,
    text,
  });

  try {
    const savedMessage = await message.save();
    res.status(200).json({ message: "Message Saved", message: savedMessage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({ chat_id: chatId });
    res.status(200).json({ message: "Messages found", messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
