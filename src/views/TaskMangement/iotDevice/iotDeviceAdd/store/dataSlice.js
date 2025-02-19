import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { insert_iot } from "@/services/taskManagement/iotDevice";

export const insert_iotDevice = async (data) => {
  const response = await insert_iot(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "iotDevice/add",
  initialState: {
    loading: false
  },
  reducers: {},
  extraReducers: {
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
