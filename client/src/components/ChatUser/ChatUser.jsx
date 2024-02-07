import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findChatAsync } from "../../features/chat/chatSlice";
import { BASE_URL } from "../../utils/baseUrl";
import "./ChatUser.css";

export const ChatUser = ({ chat }) => {
  const { user } = useSelector((state) => state.auth);
  const { currentChat, onlineUsers } = useSelector((state) => state.chat);
  const [recipientUser, setRecipientUser] = useState(null);
  const recipientId = chat?.members.find((id) => id !== user?._id);
  const dispatch = useDispatch();

  const setCurrentChat = () => {
    dispatch(findChatAsync(recipientId));
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!recipientId) return null;
      try {
        const { data } = await axios.get(`${BASE_URL}/users/${recipientId}`);
        setRecipientUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [recipientId]);

  return (
    <div
      onClick={setCurrentChat}
      id={currentChat?._id === chat?._id ? "active" : ""}
      className="chat__user"
    >
      <img src="/profile.png" alt="dp" />
      <div className="chat__user-body">
        <div className="chat__user-header">
          <p className="chat__user-p">
            {recipientUser?.username}{" "}
            <div
              id={
                onlineUsers.some((u) => u.userId === recipientUser?._id)
                  ? "online"
                  : ""
              }
            ></div>
          </p>
          <span>2/04/2024</span>{" "}
        </div>

        <small>Lorem ipsum dolor sit amet.</small>
      </div>
    </div>
  );
};
