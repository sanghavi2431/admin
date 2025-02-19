import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserOfferById } from "@/services/userOffers";
import { editUserOffer } from "@/services/userOffers";
import dayjs from "dayjs";

export const getUserOfferbyId = createAsyncThunk(
  "getUserOfferbyId/Edit",
  async (data) => {
    const response = await getUserOfferById(data);
    return response.data;
  }
);

export const updateUserOffer = async (data) => {
  const response = await editUserOffer(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "userOffer/edit",
  initialState: {
    loading: false,
    userOfferList: [],
  },
  reducers: {},
  extraReducers: {
    [getUserOfferbyId.fulfilled]: (state, action) => {
      if (typeof action.payload.results.expiry_date === "string") {
        action.payload.results.expiry_date = dayjs(
          action.payload.results.expiry_date,
          "YYYY-MM-DD"
        ).toDate();
      }
      state.userOfferList = action.payload.results;
      state.loading = false;
    },
    [getUserOfferbyId.pending]: (state) => {
      state.loading = true;
    },
    [getUserOfferbyId.rejected]: (state) => {
      state.userOfferList = [];
      state.loading = false;
    },
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
