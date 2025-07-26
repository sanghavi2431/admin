import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCorporateById } from "@/services/corporateService";

export const getblogSubCategory = createAsyncThunk("getblogSubCategory/view", async (data) => {
  const response = await getCorporateById(data);
  return response.data;
});

const dataSlice = createSlice({
  name: "getblogSubCategory/view",
  initialState: {
    loading: false,
    blogSubcategoryData: [],
  },
  reducers: {},
  extraReducers: {
    [getblogSubCategory.fulfilled]: (state, action) => {
      state.blogSubcategoryData = action.payload.results;
      state.loading = false;
    },
    [getblogSubCategory.pending]: (state) => {
      state.loading = true;
    },
    [getblogSubCategory.rejected]: (state) => {
      state.blogSubcategoryData = [];
      state.loading = false;
    },
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
