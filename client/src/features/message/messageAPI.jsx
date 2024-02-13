import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";

export const getMessagesAPI = async (chatId) => {
  const response = await axios.get(`${BASE_URL}/messages/${chatId}`, {
    headers: {
      authorization: JSON.parse(localStorage.getItem("token")),
    },
  });
  return response;
};

export const sendMessageAPI = async (chatId, text) => {
  const response = await axios.post(
    `${BASE_URL}/messages/${chatId}`,
    { text },
    {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    }
  );
  return response;
};
