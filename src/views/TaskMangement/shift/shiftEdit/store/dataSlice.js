import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { getShiftbyId,updateShift } from "@/services/taskManagement/shiftService";
import dayjs from "dayjs";

export const getShift = createAsyncThunk("getShift/Edit", async (data) => {
  const response = await getShiftbyId(data);
  return response.data;
});

export const update_Shift = async (data) => {
  const response = await updateShift(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "shift/edit",
  initialState: {
    loading: false,
    shiftData: [],
  },
  reducers: {},
  extraReducers: {
    [getShift.fulfilled]: (state, action) => {
      let newShiftData=cloneDeep(action.payload.results)
      newShiftData.start_time=dayjs()
      .set("hour",    newShiftData.start_time.split(":")[0])
      .set("minute",    newShiftData.start_time.split(":")[1])
      .set("second",    newShiftData.start_time.split(":")[2])
      .toDate()
      newShiftData.end_time=dayjs()
      .set("hour",    newShiftData.end_time.split(":")[0])
      .set("minute",    newShiftData.end_time.split(":")[1])
      .set("second",    newShiftData.end_time.split(":")[2])
      .toDate()
      state.shiftData = newShiftData;
      state.loading = false;
    },
    [getShift.pending]: (state) => {
      state.loading = true;
    },
    [getShift.rejected]: (state) => {
      state.shiftData = [];
      state.loading = false;
    },
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
