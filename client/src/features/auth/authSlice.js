import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser, verifyUser } from "./authAPI";

const initialState = {
  status: "idle",
  user: null,
  loggedIn: false,
};

export const signupAsync = createAsyncThunk(
  "auth/signupUser",
  async (userDetails) => {
    const response = await signupUser(userDetails);
    return response.data;
  }
);

export const loginAsync = createAsyncThunk(
  "auth/loginUser",
  async (userDetails) => {
    const response = await loginUser(userDetails);
    return response.data;
  }
);

export const verifyUserAsync = createAsyncThunk("auth/verifyUser", async () => {
  const response = await verifyUser();
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "success";
      state.loggedIn = false;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.status = "success";
        state.user = user;
        state.loggedIn = true;
        localStorage.setItem("token", JSON.stringify(token));
      })
      .addCase(signupAsync.rejected, (state) => {
        state.status = "error";
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.status = "success";
        state.user = user;
        state.loggedIn = true;
        localStorage.setItem("token", JSON.stringify(token));
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = "error";
      })
      .addCase(verifyUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyUserAsync.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.status = "success";
        state.user = user;
        state.loggedIn = true;
      })
      .addCase(verifyUserAsync.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
