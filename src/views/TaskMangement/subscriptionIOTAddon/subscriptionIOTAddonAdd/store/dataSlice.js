import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { insertAddonIOT } from "@/services/taskManagement/addOnService";

export const insert_iotdevice = async (data) => {
  const response = await insertAddonIOT(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "addOnIOT/add",
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
