import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { insertOffer } from "@/services/hostOfferService";
import { addUser } from "@/services/userService";

export const newHostOffer = async (data) => {
  const response = await insertOffer(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "hostOffer/Add",
  initialState: {
    loading: false,
  },
  reducers: {},
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
