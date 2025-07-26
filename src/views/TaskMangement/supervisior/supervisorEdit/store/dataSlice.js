import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { getBlocksById,updateBlocks } from "@/services/taskManagement/blockService";
import { getSupervisorById, updateSupervisor } from "@/services/taskManagement/supervisorService";

export const getSupervisor = createAsyncThunk("getSupervisor/Edit", async (data) => {
  const response = await getSupervisorById(data);
  return response.data;
});

export const update_supervisor = async (data) => {
  const response = await updateSupervisor(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "supervisor/edit",
  initialState: {
    loading: false,
    supervisorData: [],
  },
  reducers: {},
  extraReducers: {
    [getSupervisor.fulfilled]: (state, action) => {
      let newSupervisorData=cloneDeep(action?.payload?.results)
      newSupervisorData.start_time=new Date(newSupervisorData.start_time)
      newSupervisorData.end_time=new Date(newSupervisorData.end_time)

      state.supervisorData = newSupervisorData;
      state.loading = false;
    },
    [getSupervisor.pending]: (state) => {
      state.loading = true;
    },
    [getSupervisor.rejected]: (state) => {
      state.supervisorData = [];
      state.loading = false;
    },
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
