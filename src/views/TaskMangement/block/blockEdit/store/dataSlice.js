import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBlocksById,updateBlocks } from "@/services/taskManagement/blockService";

export const getBlock = createAsyncThunk("getBlock/Edit", async (data) => {
  const response = await getBlocksById(data);
  return response.data;
});

export const update_Block = async (data) => {
  const response = await updateBlocks(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "block/edit",
  initialState: {
    loading: false,
    blockData: [],
  },
  reducers: {},
  extraReducers: {
    [getBlock.fulfilled]: (state, action) => {
      state.blockData = action.payload.results;
      state.loading = false;
    },
    [getBlock.pending]: (state) => {
      state.loading = true;
    },
    [getBlock.rejected]: (state) => {
      state.blockData = [];
      state.loading = false;
    },
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
