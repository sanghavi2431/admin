import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSubscriptionsById } from "@/services/subscriptionServices";

export const getSubscription = createAsyncThunk(
  "getSubscription/view",
  async (data) => {
    const response = await getSubscriptionsById(data);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "Subscription/view",
  initialState: {
    loading: false,
    subscriptionList: [],
  },
  reducers: {},
  extraReducers: {
    [getSubscription.fulfilled]: (state, action) => {
      state.subscriptionList = action.payload.results;
      state.loading = false;
    },
    [getSubscription.pending]: (state) => {
      state.loading = true;
    },
    [getSubscription.rejected]: (state) => {
      state.subscriptionList = [];
      state.loading = false;
    },
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
