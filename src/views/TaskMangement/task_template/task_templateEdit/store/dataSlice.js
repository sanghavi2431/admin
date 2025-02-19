import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTemplate, updateTemplate } from "@/services/taskManagement/taskTemplateService";

export const getTask_temp = createAsyncThunk("getTask_temp/Edit", async (data) => {
  const response = await getTemplate(data);
  return response.data;
});

export const update_temp = async (data) => {
  const response = await updateTemplate(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "task_temp/edit",
  initialState: {
    loading: false,
    tempData: [],
  },
  reducers: {},
  extraReducers: {
    [getTask_temp.fulfilled]: (state, action) => {
      state.tempData = action.payload.results;
      state.loading = false;
    },
    [getTask_temp.pending]: (state) => {
      state.loading = true;
    },
    [getTask_temp.rejected]: (state) => {
      state.tempData = [];
      state.loading = false;
    },
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
