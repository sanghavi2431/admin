import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSubscriptionsById,
  editSubscription,
} from "@/services/subscriptionServices";

export const getEditSubscription = createAsyncThunk(
  "getSubscription/Edit",
  async (data) => {
    const response = await getSubscriptionsById(data);
    return response.data;
  }
);

export const updateSubscription = async (data) => {
  const response = await editSubscription(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "subscription/edit",
  initialState: {
    loading: false,
    subscriptionList: [],
  },
  reducers: {},
  extraReducers: {
    [getEditSubscription.fulfilled]: (state, action) => {
      state.subscriptionList = action.payload.results;
      state.loading = false;
    },
    [getEditSubscription.pending]: (state) => {
      state.loading = true;
    },
    [getEditSubscription.rejected]: (state) => {
      state.subscriptionList = [];
      state.loading = false;
    },
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
