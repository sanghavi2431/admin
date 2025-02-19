import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBlogs_byId, updateBlog } from "@/services/blogService";

export const getActiveBlogById = createAsyncThunk(
  "getActiveBlogById/Edit",
  async (data) => {
    const response = await getBlogs_byId(data);
    return response.data;
  }
);

export const updateActiveblog = async (data) => {
  const response = await updateBlog(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "ActiveBlog/edit",
  initialState: {
    loading: false,
    activeBlogData: [],
  },
  reducers: {},
  extraReducers: {
    [getActiveBlogById.fulfilled]: (state, action) => {
      state.activeBlogData = action.payload.results;
      state.loading = false;
    },
    [getActiveBlogById.pending]: (state) => {
      state.loading = true;
    },
    [getActiveBlogById.rejected]: (state) => {
      state.activeBlogData = [];
      state.loading = false;
    },
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
