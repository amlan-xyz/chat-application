import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessageAsync,
  sendMessageAsync,
  setMessages,
} from "../../features/message/messageSlice";
import { BASE_URL } from "../../utils/baseUrl";
import { convertTime } from "../../utils/convertTime";
import { NoMessages } from "../Empty/NoMessages";
import "./ChatBox.css";

export const ChatBox = () => {
  const { currentChat } = useSelector((state) => state.chat);
  const { messages } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const [newText, setNewText] = useState("");
  const [receiver, setReceiver] = useState(null);
  const messageRef = useRef(null);

  const handleSubmit = () => {
    dispatch(sendMessageAsync({ chatId: currentChat?._id, text: newText }));
    const date = new Date();
    const message = {
      chatId: currentChat?._id,
      sender_id: user?._id,
      text: newText,
      createdAt: date.toISOString(),
    };
    if (socket === null) return;
    const recipientId = currentChat?.members?.find((id) => id !== user._id);
    socket.emit("sendMessage", { ...message, recipientId });
    setNewText("");
  };

  useEffect(() => {
    dispatch(getMessageAsync(currentChat?._id));
  }, [currentChat._id, dispatch]);

  useEffect(() => {
    const recipientId = currentChat?.members.find((id) => id !== user?._id);
    const fetchUser = async () => {
      if (!recipientId) return null;
      try {
        const { data } = await axios.get(`${BASE_URL}/users/${recipientId}`);
        setReceiver(data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [currentChat, user]);

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

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className="chatbox">
      <div className="chatbox__body">
        <div className="chatbox__header">
          <div className="chatbox__user">
            <img src={receiver?.avatar} alt="user profile" />
            <p>{receiver?.username}</p>
          </div>
        </div>
        <div className="chatbox__messages">
          {messages.length === 0 ? (
            <NoMessages />
          ) : (
            <>
              {messages?.map((message) => (
                <>
                  {message.sender_id === user._id ? (
                    <div key={message._id} className="message message__right">
                      <div className="text">
                        <span>{message?.text} </span>
                        <small>{convertTime(message.createdAt)}</small>
                      </div>

                      <img
                        className="message__user-img"
                        src={user?.avatar}
                        alt="profile pic"
                      />
                    </div>
                  ) : (
                    <div key={message._id} className="message message__left">
                      <img
                        className="message__user-img"
                        src={receiver?.avatar}
                        alt="profile pic"
                      />
                      <div className="text">
                        <span>{message?.text} </span>
                        <small>{convertTime(message.createdAt)}</small>
                      </div>
                    </div>
                  )}
                </>
              ))}
              <div ref={messageRef}></div>
            </>
          )}
        </div>
        <div className="chatbox__footer">
          <input
            type="text"
            onChange={(e) => setNewText(e.target.value)}
            value={newText}
          />
          <button onClick={handleSubmit}>
            <IoIosSend />
          </button>
        </div>
      </div>
    </div>
  );
};
