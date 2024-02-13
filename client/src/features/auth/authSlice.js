import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { loginUser, signupUser, updateAvatarAPI, verifyUser } from "./authAPI";
const initialState = {
  status: "idle",
  user: null,
  loggedIn: false,
};

export const signupAsync = createAsyncThunk(
  "auth/signupUser",
  async (userDetails) => {
    const response = await signupUser(userDetails);
    return response;
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

export const updateAvatarAsync = createAsyncThunk(
  "auth/updateAvatar",
  async (avatar) => {
    const response = await updateAvatarAPI(avatar);
    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "success";
      state.loggedIn = false;
      state.user = null;
      localStorage.removeItem("token");
      toast.success("Logged out");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        const { user, token } = action.payload.data;
        state.status = "success";
        state.user = user;
        state.loggedIn = true;
        localStorage.setItem("token", JSON.stringify(token));
        toast.success("Signup successful");
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.status = "error";
        toast.error("Signup failed");
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        localStorage.setItem("token", JSON.stringify(token));
        state.user = user;
        state.loggedIn = true;
        state.status = "success";
        toast.success("Logged In");
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = "error";
        toast.error("Login failed");
      })
      .addCase(verifyUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyUserAsync.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.status = "success";
        state.user = user;
        state.loggedIn = true;
        toast.success("Logged In");
      })
      .addCase(verifyUserAsync.rejected, (state) => {
        state.status = "error";
        toast.error("Login failed");
      })
      .addCase(updateAvatarAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAvatarAsync.fulfilled, (state, action) => {
        const { user } = action.payload.data;
        state.user = user;
        state.status = "success";
        toast.success("Avatar changed");
      })
      .addCase(updateAvatarAsync.rejected, (state) => {
        state.status = "error";
        toast.error("Failed to change avatar");
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
