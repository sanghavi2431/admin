import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { getBlocksById,updateBlocks } from "@/services/taskManagement/blockService";
import { getJanitorById, updateJanitor } from "@/services/taskManagement/janitorService";

export const getJanitor = createAsyncThunk("getJanitor/Edit", async (data) => {
  const response = await getJanitorById(data);
  return response.data;
});

export const update_Janitor = async (data) => {
  const response = await updateJanitor(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "janitor/edit",
  initialState: {
    loading: false,
    janitorData: [],
  },
  reducers: {},
  extraReducers: {
    [getJanitor.fulfilled]: (state, action) => {
      let newJanitorData=cloneDeep(action?.payload?.results)
      let start_time=new Date()
      start_time.setHours(new Date(newJanitorData?.start_time)?.getHours())
      start_time.setMinutes(new Date(newJanitorData?.start_time)?.getUTCMinutes())
      let end_time=new Date()
      end_time.setHours(new Date(newJanitorData?.end_time)?.getHours())
      end_time.setMinutes(new Date(newJanitorData?.end_time)?.getUTCMinutes())
      newJanitorData.start_time=start_time
      newJanitorData.end_time=end_time

      state.janitorData = newJanitorData;
      state.loading = false;
    },
    [getJanitor.pending]: (state) => {
      state.loading = true;
    },
    [getJanitor.rejected]: (state) => {
      state.janitorData = [];
      state.loading = false;
    },
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
