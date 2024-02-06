import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatBox } from "../../components/ChatBox/ChatBox";
import { ChatUser } from "../../components/ChatUser/ChatUser";
import { Navbar } from "../../components/Navbar/Navbar";
import { AllUsers } from "../../components/Users/Users";
import { findAllChatsAsync } from "../../features/chat/chatSlice";
export const Chat = () => {
  const { chats, status, currentChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(findAllChatsAsync());
    }
  }, [dispatch, status]);

  return (
    <>
      <Navbar />
      <h1>Chat</h1>
      <AllUsers />
      <ul>
        {chats?.map((chat) => (
          <li key={chat._id}>
            <ChatUser chat={chat} />
          </li>
        ))}
      </ul>
      <hr />
      <div>{currentChat !== null ? <ChatBox /> : "No chat to display"}</div>
    </>
  );
};
