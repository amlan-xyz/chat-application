import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findChatAsync } from "../../features/chat/chatSlice";
import { BASE_URL } from "../../utils/baseUrl";
export const ChatUser = ({ chat }) => {
  const { user } = useSelector((state) => state.auth);
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
    <div className="chat__user">
      <p>{recipientUser?.username}</p>
      <button onClick={setCurrentChat}>Send Message</button>
    </div>
  );
};
