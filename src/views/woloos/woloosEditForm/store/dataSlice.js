import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addWoloo } from "@/services/wolooService";

export const createWoloo = createAsyncThunk("wolooEdits/edit", async (data) => {
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
  name: "editWoloos",
  initialState: {
    loading: false,
    wolooData: [],
  },
  reducers: {},
  extraReducers: {
    [createWoloo.fulfilled]: (state) => {
      state.loading = false;
    },
    [createWoloo.pending]: (state) => {
      state.loading = true;
    },
    [createWoloo.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default dataSlice.reducer;
