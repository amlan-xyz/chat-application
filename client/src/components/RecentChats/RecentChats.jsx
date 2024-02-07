import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatUser } from "../../components/ChatUser/ChatUser";
import { findAllChatsAsync } from "../../features/chat/chatSlice";
import "./RecentChat.css";
export const RecentChats = () => {
  const { chats, status } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(findAllChatsAsync());
    }
  }, [dispatch, status]);

  return (
    <ul className="recent__chats">
      {chats?.map((chat) => (
        <li key={chat._id}>
          <ChatUser chat={chat} />
        </li>
      ))}
    </ul>
  );
};
