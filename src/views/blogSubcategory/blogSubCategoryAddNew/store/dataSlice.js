import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllCategories, insert_blog_Subcategory } from "@/services/blogService";

export const addBlogCategory = async (data) => {
  const response = await insert_blog_Subcategory(data);
  return response.data;
};
const dataSlice = createSlice({
  name: "blogSubCategory/Add",
  initialState: {
    loading: false
  },
  reducers: {},
  extraReducers:{

  }
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
