import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addWoloo } from "@/services/wolooService";

export const createWoloo = createAsyncThunk("woloonew/create", async (data) => {
  const response = await addWoloo(data);
  return response.data.result;
});

export const updateProduct = async (data) => {
  const response = await addWoloo(data);
  return response.data;
};

export const fetchProductByID = async (data) => {
  const response = await addWoloo(data);
  return response.data.result[0];
};

const dataSlice = createSlice({
  name: "createWolooNew",
  initialState: {
    loading: false,
    wolooData: [],
  },
  reducers: {},
  extraReducers: {
    [createWoloo.fulfilled]: (state, action) => {
      state.wolooData = action.payload;
      state.loading = false;
    },
    [createWoloo.pending]: (state) => {
      state.loading = true;
    },
  },
});

export default dataSlice.reducer;
