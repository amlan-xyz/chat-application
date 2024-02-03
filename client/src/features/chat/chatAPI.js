import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";

const token = JSON.parse(localStorage.getItem("token"));

export const createChatAPI = async (recieverId) => {
  const response = await axios.post(
    `${BASE_URL}/chats/${recieverId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
  return response;
};

export const findAllChatsAPI = async () => {
  const response = await axios.get(`${BASE_URL}/chats`, {
    headers: {
      authorization: token,
    },
  });
  return response;
};

export const findChatAPI = async (recieverId) => {
  const response = await axios.get(`${BASE_URL}/chats/${recieverId}`, {
    headers: {
      authorization: token,
    },
  });
  return response;
};
