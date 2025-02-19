import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { insertBlogCategory } from "@/services/blogService";

export const add_blogCategory = async (data) => {
  const response = await insertBlogCategory(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "blogCategory/Add",
  initialState: {
    loading: false,
  },
  reducers: {},
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
