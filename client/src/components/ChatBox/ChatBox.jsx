import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessageAsync,
  sendMessageAsync,
} from "../../features/message/messageSlice";
import "./ChatBox.css";
export const ChatBox = () => {
  const { currentChat } = useSelector((state) => state.chat);
  const messageStore = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [newText, setNewText] = useState("");

  const handleSubmit = () => {
    dispatch(sendMessageAsync({ chatId: currentChat?._id, text: newText }));
    setNewText("");
  };

  useEffect(() => {
    dispatch(getMessageAsync(currentChat?._id));
  }, [currentChat._id, dispatch]);

  return (
    <div className="chat__box">
      {messageStore.messages?.map((message) => (
        <p
          key={message._id}
          className={
            message.sender_id === user._id ? "align__end" : "align__start"
          }
        >
          {message.text}
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
