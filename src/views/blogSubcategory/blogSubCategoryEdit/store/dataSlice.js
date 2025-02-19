import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {  getSubCategoriesbyId, updateBlogSubCategory } from "@/services/blogService";

export const getSubcategoryById = createAsyncThunk(
  "getSubcategoryById/Edit",
  async (data) => {
    const response = await getSubCategoriesbyId(data);
    return response.data;
  }
);
export const updateSubcategory = async (data) => {
  const response = await updateBlogSubCategory(data);
  return response.data;
};
const dataSlice = createSlice({
  name: "blogSubCategory/edit",
  initialState: {
    loading: false,
    blogSubcategoryList: [],
    categoryList:[]
  },
  reducers: {},
  extraReducers: {
    [getSubcategoryById.fulfilled]: (state, action) => {
      state.blogSubcategoryList = action.payload.results;
      state.loading = false;
    },
    [getSubcategoryById.pending]: (state) => {
      state.loading = true;
    },
    [getSubcategoryById.rejected]: (state) => {
      state.blogSubcategoryList = [];
      state.loading = false;
    }
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
