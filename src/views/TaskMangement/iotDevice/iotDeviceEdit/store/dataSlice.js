import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBlocksById,updateBlocks } from "@/services/taskManagement/blockService";

export const getIOTDevice = createAsyncThunk("getIOTDevice/Edit", async (data) => {
  // const response = await getBlocksById(data);
  // return response.data;
  return []
});

export const update_IOTDevice = async (data) => {
  const response = await updateBlocks(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "iotDevice/edit",
  initialState: {
    loading: false,
    iotDeviceData: [],
  },
  reducers: {},
  extraReducers: {
    [getIOTDevice.fulfilled]: (state, action) => {
      state.iotDeviceData = action.payload.results;
      state.loading = false;
    },
    [getIOTDevice.pending]: (state) => {
      state.loading = true;
    },
    [getIOTDevice.rejected]: (state) => {
      state.iotDeviceData = [];
      state.loading = false;
    },
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
