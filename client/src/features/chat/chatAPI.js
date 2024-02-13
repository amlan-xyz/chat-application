import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";

export const createChatAPI = async (recieverId) => {
  const response = await axios.post(
    `${BASE_URL}/chats/${recieverId}`,
    {},
    {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    }
  );
  return response;
};

export const findAllChatsAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/chats`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const findChatAPI = async (recieverId) => {
  const response = await axios.get(`${BASE_URL}/chats/${recieverId}`, {
    headers: {
      authorization: JSON.parse(localStorage.getItem("token")),
    },
  });

  return response;
};

export const getAllUsersAPI = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response;
};
