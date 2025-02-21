import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addTemplate } from "@/services/taskManagement/taskTemplateService";
import { fetchTaskCheckList } from "@/services/taskManagement/taskChecklist";
import { cloneDeep } from "lodash";
import { fetchBlocks } from "@/services/taskManagement/blockService";
import { fetchShifts } from "@/services/taskManagement/shiftService";

export const getTasks = createAsyncThunk("getTasks/List", async (data) => {
  const response = await fetchTaskCheckList(data);
  return response.data.results;
});

export const getBlocks = createAsyncThunk("getBlocksTasks/List", async (data) => {
  const response = await fetchBlocks(data);
  return response.data.results;
});
export const getShifts = createAsyncThunk("getShifts/List", async (data) => {
  const response = await fetchShifts(data);
  return response.data.results;
});

const dataSlice = createSlice({
  name: "task_template/form",
  initialState: {
    loading: false,
    tasksCheckList:"",
    blocks:"",
    shifts:"",
    exitConfirmation: false,

  },
  reducers: {
    toggleExitConfirmation: (state, action) => {
      state.exitConfirmation = action.payload;
    },
  },
  extraReducers: {
    [getTasks.fulfilled]: (state, action) => {
      let list=cloneDeep(action.payload.tasks)
       state.tasksCheckList=list.map((li)=>{return li.status && {label:li.task_name,value:li.id}}).filter((item)=>item)
    },
    [getTasks.pending]: (state) => {
    },
    [getTasks.rejected]: (state) => {
      state.tasksCheckList = ""
    },
    [getBlocks.fulfilled]: (state, action) => {
      let list=cloneDeep(action.payload.blocks)
      state.blocks=list.map((li)=>{return {label:li.name,va:li.id}})
    },
    [getBlocks.pending]: (state) => {
    },
    [getBlocks.rejected]: (state, action) => {
      state.blocks = "";
    },
    [getShifts.fulfilled]: (state, action) => {
      let list=cloneDeep(action.payload.shifts)
      state.shifts=list.map((li)=>{return {label:li.shift_name,value:li.id}})
    },
    [getShifts.pending]: (state) => {
    },
    [getShifts.rejected]: (state) => {
      state.shifts = ""
    },
  },
});

export const {  toggleExitConfirmation} = dataSlice.actions;

export default dataSlice.reducer;
