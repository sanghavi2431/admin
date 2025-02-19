import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCorporateById } from "@/services/corporateService";

export const getBlogCategory = createAsyncThunk("getBlogCategory/view", async (data) => {
  const response = await getCorporateById(data);
  return response.data;
});

const dataSlice = createSlice({
  name: "blogCategory/view",
  initialState: {
    loading: false,
    categoryData: [],
  },
  reducers: {},
  extraReducers: {
    [getBlogCategory.fulfilled]: (state, action) => {
      state.categoryData = action.payload.results;
      state.loading = false;
    },
    [getBlogCategory.pending]: (state) => {
      state.loading = true;
    },
    [getBlogCategory.rejected]: (state) => {
      state.categoryData = [];
      state.loading = false;
    },
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
