import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCorporateById } from "@/services/corporateService";

export const getCorporates = createAsyncThunk("getuser/view", async (data) => {
  const response = await getCorporateById(data);
  return response.data;
});

const dataSlice = createSlice({
  name: "users/view",
  initialState: {
    loading: false,
    corporatesList: [],
  },
  reducers: {},
  extraReducers: {
    [getCorporates.fulfilled]: (state, action) => {
      state.corporatesList = action.payload.results;
      state.loading = false;
    },
    [getCorporates.pending]: (state) => {
      state.loading = true;
    },
    [getCorporates.rejected]: (state) => {
      state.corporatesList = [];
      state.loading = false;
    },
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
