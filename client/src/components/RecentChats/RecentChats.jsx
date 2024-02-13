import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatUser } from "../../components/ChatUser/ChatUser";
import { findAllChatsAsync } from "../../features/chat/chatSlice";
import "./RecentChat.css";
export const RecentChats = () => {
  const { chats, status } = useSelector((state) => state.chat);
  const { loggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle" && loggedIn === true) {
      dispatch(findAllChatsAsync());
    }
  }, [dispatch, status, loggedIn]);

  return (
    <>
      {chats.length === 0 ? (
        <p className="no__user">No recent chats</p>
      ) : (
        <ul className="recent__chats">
          {chats?.map((chat) => (
            <li key={chat._id}>
              <ChatUser chat={chat} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
