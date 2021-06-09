import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chartApi from "../../api/chartApi";

export const genChart = createAsyncThunk("chart/genChart", async () => {
  const res = await chartApi.genChart();
  return res;
});

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {},
  extraReducers: {
    [genChart.pending]: (state) => {
      state.isLoading = true;
    },
    [genChart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [genChart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default chartSlice.reducer;
