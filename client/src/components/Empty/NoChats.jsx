import "./Empty.css";
export const NoChats = () => {
  return (
    <div className="no__chats">
      <img
        className="no__chat-img"
        src="/images/no_chat.png"
        alt="No Chats to display"
      />
      <h2>
        Use <span>Chatter</span> to send and recive messages in real time.
      </h2>
    </div>
  );
};
