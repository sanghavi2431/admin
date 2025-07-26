import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addCorporate } from "@/services/corporateService";

export const newCorporate = async (data) => {
  const response = await addCorporate(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "corporates/Add",
  initialState: {
    loading: false,
  },
  reducers: {},
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
