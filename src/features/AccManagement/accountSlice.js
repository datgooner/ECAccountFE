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
export const getTechnologyList = createAsyncThunk(
  "account/getTechnologyList",
  async () => {
    const res = await accountApi.getTechnologyList();
    return res;
  }
);
export const getJobRankList = createAsyncThunk(
  "account/getJobRankList",
  async () => {
    const res = await accountApi.getJobRankList();
    return res;
  }
);
export const getStatusList = createAsyncThunk(
  "account/getStatusList",
  async () => {
    const res = await accountApi.getStatusList();
    return res;
  }
);
export const updateAccountByID = createAsyncThunk(
  "account/updateAccountByID",
  async (params) => {
    const res = await accountApi.updateAccountByID(params.id, params.payload);
    return res;
  }
);
export const deleteAccountByID = createAsyncThunk(
  "account/deleteAccountByID",
  async (id) => {
    const res = await accountApi.deleteAccountByID(id);
    return res;
  }
);


const initialState = {
  data: null,
  technology: null,
  jobrank: null,
  status: null,
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
    [getTechnologyList.pending]: (state) => {
      state.isLoading = true;
    },
    [getTechnologyList.fulfilled]: (state, action) => {
      state.technology = action.payload;
      state.isLoading = false;
    },
    [getTechnologyList.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getJobRankList.pending]: (state) => {
      state.isLoading = true;
    },
    [getJobRankList.fulfilled]: (state, action) => {
      state.jobrank = action.payload;
      state.isLoading = false;
    },
    [getJobRankList.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getStatusList.pending]: (state) => {
      state.isLoading = true;
    },
    [getStatusList.fulfilled]: (state, action) => {
      state.status = action.payload;
      state.isLoading = false;
    },
    [getStatusList.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [updateAccountByID.pending]: (state) => {
      state.isLoading = true;
    },
    [updateAccountByID.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [updateAccountByID.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [deleteAccountByID.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteAccountByID.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [deleteAccountByID.rejected]: (state, action) => {
      state.isLoading = false;
    },
    
  },
});

export default accountSlice.reducer;
