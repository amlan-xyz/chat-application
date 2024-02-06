import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createChatAPI,
  findAllChatsAPI,
  findChatAPI,
  getAllUsersAPI,
} from "./chatAPI";

const initialState = {
  status: "idle",
  chats: [],
  currentChat: null,
  onlineUsers: [],
  allUsers: [],
};

export const createChatAsync = createAsyncThunk(
  "chat/createChat",
  async (recieverId) => {
    console.log(recieverId);
    const response = await createChatAPI(recieverId);
    return response.data;
  }
);

export const findAllChatsAsync = createAsyncThunk(
  "chat/findAllChats",
  async () => {
    const response = await findAllChatsAPI();
    return response.data;
  }
);

export const findChatAsync = createAsyncThunk(
  "chat/findChat",
  async (recieverId) => {
    const response = await findChatAPI(recieverId);
    return response.data;
  }
);

export const getAllUsersAsync = createAsyncThunk(
  "chat/getAllUsers",
  async () => {
    const { data } = await getAllUsersAPI();

    return data;
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getOnlineUser: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChatAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createChatAsync.fulfilled, (state, action) => {
        const { chat } = action.payload;
        state.status = "success";
        state.chats.push(chat);
        state.currentChat = chat;
      })
      .addCase(createChatAsync.rejected, (state) => {
        state.status = "error";
      })
      .addCase(findAllChatsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(findAllChatsAsync.fulfilled, (state, action) => {
        const { chats } = action.payload;
        state.status = "success";
        state.chats = chats;
      })
      .addCase(findAllChatsAsync.rejected, (state) => {
        state.status = "error";
      })
      .addCase(findChatAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(findChatAsync.fulfilled, (state, action) => {
        const { chat } = action.payload;
        state.status = "success";
        state.currentChat = chat;
      })
      .addCase(findChatAsync.rejected, (state) => {
        state.status = "error";
      })
      .addCase(getAllUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        const { users } = action.payload;
        state.status = "success";
        state.allUsers = users;
      })
      .addCase(getAllUsersAsync.rejected, (state) => {
        state.status = "error";
      });
  },
});
export const { getOnlineUser } = chatSlice.actions;

export default chatSlice.reducer;
