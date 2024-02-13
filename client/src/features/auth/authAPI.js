import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";

export const signupUser = async (userDetails) => {
  const response = await axios.post(`${BASE_URL}/users/signup`, userDetails);
  return response;
};

export const loginUser = async (userDetails) => {
  const response = await axios.post(`${BASE_URL}/users/login`, userDetails);
  return response;
};

export const verifyUser = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/users/verify-token`,
    {},
    {
      headers: {
        authorization: JSON.parse(token),
      },
    }
  );
  return response;
};

export const updateAvatarAPI = async (avatar) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await axios.post(
    `${BASE_URL}/users/change-avatar`,
    {
      newAvatar: avatar,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );
  return response;
};
