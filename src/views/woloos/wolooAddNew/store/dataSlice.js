import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addWoloo, getWolooById } from "@/services/wolooService";

export const getWoloo = createAsyncThunk("getWolooss/List", async (data) => {
  const response = await getWolooById(data);
  return response.data;
});

export const updateWoloo = async (data) => {
  const response = await addWoloo(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "wolooss/list",
  initialState: {
    loading: false,
    woloosList: [],
  },
  reducers: {},
  extraReducers: {
    [getWoloo.fulfilled]: (state, action) => {
      state.woloosList = action.payload.results;
      state.loading = false;
    },
    [getWoloo.pending]: (state) => {
      state.loading = true;
    },
    [getWoloo.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
