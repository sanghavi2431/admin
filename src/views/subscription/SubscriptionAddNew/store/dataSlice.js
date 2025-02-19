import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addSubscription } from "@/services/subscriptionServices";

export const newSubscription = async (data) => {
  const response = await addSubscription(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "subscription/Add",
  initialState: {
    loading: false,
  },
  reducers: {},
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
