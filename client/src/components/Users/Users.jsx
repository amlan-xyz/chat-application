import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createChatAsync,
  getAllUsersAsync,
} from "../../features/chat/chatSlice";

export const AllUsers = () => {
  const { allUsers, onlineUsers } = useSelector((state) => state.chat);
  const { chats } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [filteredUsers, setFilteredUsers] = useState([]);

  const createChat = (recipientId) => {
    dispatch(createChatAsync(recipientId));
  };

  const removeLoggedInUser = allUsers?.filter(({ _id }) => _id !== user._id);

  const list = removeLoggedInUser?.filter(
    ({ _id }) =>
      !chats?.some((chat) => {
        return chat.members[0] === _id || chat.members[1] === _id;
      })
  );

  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, [dispatch, onlineUsers]);

  return (
    <div className="users">
      <p>Online Users:</p>
      <ul>
        {allUsers?.map(({ _id, username }) => (
          <li key={_id}>
            {username}{" "}
            {onlineUsers.some((u) => u.userId === _id) ? "online" : "offline"}{" "}
            {chats?.some((chat) => {
              return chat.members[0] === _id || chat.members[1] === _id;
            }) ? (
              <></>
            ) : (
              <button
                onClick={() => {
                  createChat(user._id);
                }}
              >
                Chat
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
