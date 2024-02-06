import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessageAsync,
  sendMessageAsync,
  setMessages,
} from "../../features/message/messageSlice";
import "./ChatBox.css";
export const ChatBox = () => {
  const { currentChat } = useSelector((state) => state.chat);
  const { messages } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const [newText, setNewText] = useState("");

  const handleSubmit = () => {
    dispatch(sendMessageAsync({ chatId: currentChat?._id, text: newText }));

    const message = {
      chatId: currentChat?._id,
      sender_id: user?._id,
      text: newText,
    };

    if (socket === null) return;
    const recipientId = currentChat?.members?.find((id) => id !== user._id);
    socket.emit("sendMessage", { ...message, recipientId });
    setNewText("");
  };

  useEffect(() => {
    dispatch(getMessageAsync(currentChat?._id));
  }, [currentChat._id, dispatch]);

  //recieve Message

  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;
      dispatch(setMessages(res));
    });

    return () => {
      socket.off("getMessage");
    };
  }, [currentChat, socket, dispatch]);

  return (
    <div className="chat__box">
      {messages?.map((message) => (
        <p
          key={message._id}
          className={
            message.sender_id === user._id ? "align__end" : "align__start"
          }
        >
          {message?.text}
        </p>
      ))}
      <div className="text__box">
        <input
          type="text"
          onChange={(e) => setNewText(e.target.value)}
          value={newText}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};
