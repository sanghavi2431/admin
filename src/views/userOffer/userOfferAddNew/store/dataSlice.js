import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { addCorporate } from "@/services/corporateService";
import { addUserOffer } from "@/services/userOffers";

export const newUserOffer = async (data) => {
  const response = await addUserOffer(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "userOffer/Add",
  initialState: {
    loading: false,
  },
  reducers: {},
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
