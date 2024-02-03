import Chat from "../models/chats.model.js";

export const createChat = async (req, res) => {
  const senderId = req.user.userId;
  const { recieverId } = req.body;
  try {
    const chat = await Chat.findOne({
      members: { $all: [senderId, recieverId] },
    });
    if (chat) {
      return res.status(200).json({ message: "Chat found", chat });
    }

    const newChat = new Chat({
      members: [senderId, recieverId],
    });

    const savedChat = await newChat.save();
    res.status(200).json({ message: "Chat created", chat: savedChat });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const findAllChats = async (req, res) => {
  const senderId = req.user.userId;
  try {
    const chats = await Chat.find({
      members: { $in: [senderId] },
    });
    res.status(200).json({ message: "Chats found", chats });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const findSpecificChat = async (req, res) => {
  const senderId = req.user.userId;
  const { recieverId } = req.params;
  try {
    const chats = await Chat.findOne({
      members: { $all: [senderId, recieverId] },
    });
    res.status(200).json({ message: "Chats found", chats });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
