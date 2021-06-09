import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import accountApi from "../../api/acountApi";
import { saveAs } from "file-saver";

export const getAccountList = createAsyncThunk(
  "account/getAccountList",
  async () => {
    const res = await accountApi.getAccountList();
    return res;
  }
);
export const exportAccountList = createAsyncThunk(
  "account/exportAccountList",
  async () => {
    const res = await accountApi.exportAccountList();
    saveAs(res, "account_list.xlsx");
    return res;
  }
);
const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: {
    [getAccountList.pending]: (state) => {
      state.isLoading = true;
    },
    [getAccountList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [getAccountList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [exportAccountList.pending]: (state) => {
      state.isLoading = true;
    },
    [exportAccountList.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [exportAccountList.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default accountSlice.reducer;
