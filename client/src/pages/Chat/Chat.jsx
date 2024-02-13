import { useState } from "react";
import { useSelector } from "react-redux";
import { ChatBox } from "../../components/ChatBox/ChatBox";

import { NewChats } from "../../components/NewChats/NewChats";
import { RecentChats } from "../../components/RecentChats/RecentChats";

import { NoChats } from "../../components/Empty/NoChats";
import "./Chat.css";
export const Chat = () => {
  const { currentChat } = useSelector((state) => state.chat);
  const [recentChat, setRecentChat] = useState(true);

  return (
    <div className="chat container">
      <div className="sidebar">
        <div className="sidebar__header">
          {/* <SearchBar /> */}
          <div className="sidebar__links">
            <button
              className={recentChat ? "highlight" : ""}
              onClick={() => setRecentChat(true)}
            >
              Recent
            </button>
            <button
              className={recentChat ? "" : "highlight"}
              onClick={() => setRecentChat(false)}
            >
              New Chat
            </button>
          </div>
        </div>

        {recentChat ? <RecentChats /> : <NewChats />}
      </div>
      <div className="chat__content">
        <div>{currentChat !== null ? <ChatBox /> : <NoChats />}</div>
      </div>
    </div>
  );
};
