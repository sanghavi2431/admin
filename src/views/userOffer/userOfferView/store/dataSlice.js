import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserOfferById } from "@/services/userOffers";
import dayjs from "dayjs";

export const getUserOffer = createAsyncThunk("getUserOffer/view", async (data) => {
  const response = await getUserOfferById(data);
  return response.data;
});

const dataSlice = createSlice({
  name: "userOffer/view",
  initialState: {
    loading: false,
    userOfferViewList: [],
  },
  reducers: {},
  extraReducers: {
    [getUserOffer.fulfilled]: (state, action) => {
      if (typeof action.payload.results.expiry_date === "string") {
        action.payload.results.expiry_date = dayjs(
          action.payload.results.expiry_date,
          "YYYY-MM-DD"
        ).toDate();
      }
      state.userOfferViewList = action.payload.results;
      state.loading = false;
    },
    [getUserOffer.pending]: (state) => {
      state.loading = true;
    },
    [getUserOffer.rejected]: (state) => {
      state.userOfferViewList = [];
      state.loading = false;
    },
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
