import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLocationById,updateLocation } from "@/services/taskManagement/locationService";
import { getTaskbyId, updateTask } from "@/services/taskManagement/taskChecklist";

export const getTask_checklist = createAsyncThunk("getTask_checklist/Edit", async (data) => {
  const response = await getTaskbyId(data);
  return response.data;
});

export const update_task_checklist = async (data) => {
  const response = await updateTask(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "task_checklist/edit",
  initialState: {
    loading: false,
    task_checklistData: [],
  },
  reducers: {},
  extraReducers: {
    [getTask_checklist.fulfilled]: (state, action) => {
      state.task_checklistData = action.payload.results;
      state.loading = false;
    },
    [getTask_checklist.pending]: (state) => {
      state.loading = true;
    },
    [getTask_checklist.rejected]: (state) => {
      state.task_checklistData = [];
      state.loading = false;
    },
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
