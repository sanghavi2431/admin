import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addTemplateMap } from "@/services/taskManagement/templateMapService";

export const insert_tempMaping = async (data) => {
  const response = await addTemplateMap(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "tempMap/add",
  initialState: {
    loading: false
  },
  reducers: {},
  extraReducers: {
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
