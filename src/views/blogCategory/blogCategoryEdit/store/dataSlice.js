import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesbyId,update_BlogCategory } from "@/services/blogService";

export const getBlogCategorybyId = createAsyncThunk(
  "getBlogCategorybyId/Edit",
  async (data) => {
    const response = await getCategoriesbyId(data);
    return response.data;
  }
);

export const updateBlogCategory = async (data) => {
  const response = await update_BlogCategory(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "blogCategory/edit",
  initialState: {
    loading: false,
    blogcategoryData: [],
  },
  reducers: {},
  extraReducers: {
    [getBlogCategorybyId.fulfilled]: (state, action) => {
      state.blogcategoryData = action.payload.results;
      state.loading = false;
    },
    [getBlogCategorybyId.pending]: (state) => {
      state.loading = true;
    },
    [getBlogCategorybyId.rejected]: (state) => {
      state.blogcategoryData = [];
      state.loading = false;
    },
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
