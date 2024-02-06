import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessagesAPI, sendMessageAPI } from "./messageAPI";

const initialState = {
  status: "idle",
  messages: [],
};

export const getMessageAsync = createAsyncThunk(
  "message/getMessages",
  async (chatId) => {
    const response = await getMessagesAPI(chatId);
    return response.data;
  }
);

export const sendMessageAsync = createAsyncThunk(
  "message/sendMessage",
  async ({ chatId, text }) => {
    const response = await sendMessageAPI(chatId, text);
    return response.data;
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMessageAsync.fulfilled, (state, action) => {
        const { messages } = action.payload;
        state.status = "success";
        state.messages = messages;
      })
      .addCase(getMessageAsync.rejected, (state) => {
        state.status = "error";
      })
      .addCase(sendMessageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendMessageAsync.fulfilled, (state, action) => {
        const { message } = action.payload;
        state.status = "success";
        state.messages.push(message);
        state.sentMessage = message;
      })
      .addCase(sendMessageAsync.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { setMessages } = messageSlice.actions;

export default messageSlice.reducer;
