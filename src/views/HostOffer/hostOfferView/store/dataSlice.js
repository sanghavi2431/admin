import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById } from "@/services/userService";
import dayjs from "dayjs";
import { getOfferbyId } from "@/services/hostOfferService";

export const getHostOffer = createAsyncThunk("getHostOffer/view", async (data) => {
  const response = await getOfferbyId(data);
  return response.data;
});

const dataSlice = createSlice({
  name: "hostOffer/view",
  initialState: {
    loading: false,
    hostOfferList: [],
  },
  reducers: {},
  extraReducers: {
    [getHostOffer.fulfilled]: (state, action) => {
      if (typeof action.payload?.results?.[0]?.start_date === "string") {
        action.payload.results[0].start_date = dayjs(
          action.payload.results[0].start_date,
          "YYYY-MM-DD"
        ).toDate();
      }
      if (typeof action.payload?.results?.[0]?.end_date === "string") {
        action.payload.results[0].end_date = dayjs(
          action.payload.results[0].end_date,
          "YYYY-MM-DD"
        ).toDate();
      }
      state.hostOfferList = action.payload?.results?.[0];
      state.loading = false;
    },
    [getHostOffer.pending]: (state) => {
      state.loading = true;
    },
    [getHostOffer.rejected]: (state) => {
      state.hostOfferList = [];
      state.loading = false;
    },
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
