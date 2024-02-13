import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createChatAsync,
  getAllUsersAsync,
} from "../../features/chat/chatSlice";
import "./NewChats.css";

export const NewChats = () => {
  const { allUsers, chats } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const removeLoggedInUser = allUsers?.filter(({ _id }) => _id !== user._id);

  const possibleChats = removeLoggedInUser?.filter(
    ({ _id }) =>
      !chats?.some((chat) => {
        return chat.members[0] === _id || chat.members[1] === _id;
      })
  );

  const createChat = (recipientId) => {
    dispatch(createChatAsync(recipientId));
  };

  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, [dispatch]);

  return (
    <>
      {possibleChats.length === 0 ? (
        <div className="no__user">No new users available</div>
      ) : (
        <ul className="new__chats">
          {possibleChats?.map((user) => (
            <li
              key={user._id}
              onClick={() => createChat(user._id)}
              className="new__chats-li"
            >
              <img className="new__chats-img" src={user?.avatar} alt="dp" />
              <div>
                <p>{user?.name}</p>
                <small>{user?.username}</small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
