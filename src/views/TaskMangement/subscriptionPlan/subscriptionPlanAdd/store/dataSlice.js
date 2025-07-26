import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { insertPlan } from "@/services/taskManagement/plansService";

export const insert_plan = async (data) => {
  const response = await insertPlan(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "plan/add",
  initialState: {
    loading: false

  },
  reducers: {
  },
  extraReducers: {
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
