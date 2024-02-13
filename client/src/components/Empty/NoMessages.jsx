import "./Empty.css";
export const NoMessages = () => {
  return (
    <div className="no__chats">
      <img
        className="no__message-img"
        src="/images/no_message.png"
        alt="No messages to display"
      />
      <h2>
        Start your legendary conversation using <span>Chatter</span>
      </h2>
    </div>
  );
};
