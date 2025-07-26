import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCorporateById } from "@/services/corporateService";
import { updateCorporates } from "@/services/corporateService";

export const getEditCorporate = createAsyncThunk(
  "getCorporates/Edit",
  async (data) => {
    const response = await getCorporateById(data);
    return response.data;
  }
);

export const updateCorporate = async (data) => {
  const response = await updateCorporates(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "Corporate/edit",
  initialState: {
    loading: false,
    corporateList: [],
  },
  reducers: {},
  extraReducers: {
    [getEditCorporate.fulfilled]: (state, action) => {
      state.corporateList = action.payload.results;
      state.loading = false;
    },
    [getEditCorporate.pending]: (state) => {
      state.loading = true;
    },
    [getEditCorporate.rejected]: (state) => {
      state.corporateList = [];
      state.loading = false;
    },
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
