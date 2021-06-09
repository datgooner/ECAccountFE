import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";

export const signIn = createAsyncThunk("auth/signIn", async (data) => {
  const res = await authApi.login(data);
  return res;
});
export const signOut = createAsyncThunk("auth/signOut", async () => {
  const res = await authApi.logout();
  return res;
});
const initialState = {
  isAuthUser: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
  loginTime: null,
  isLoading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [signIn.pending]: (state) => {
      state.isLoading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthUser = true;
      state.token = action.payload?.access_token;
      state.loginTime = Date.now()
    },
    [signIn.rejected]: (state) => {
      state.isLoading = false;
      state.isAuthUser = false;
      state.token = null;
    },
    [signOut.pending]: (state) => {
      state.isLoading = true;
    },
    [signOut.fulfilled]: (state) => {
      state.isLoading = false;
      state.isAuthUser = false;
      state.token = null;
    },
    [signOut.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
