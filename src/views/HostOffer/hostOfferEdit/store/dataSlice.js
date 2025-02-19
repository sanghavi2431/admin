import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById, editUser } from "@/services/userService";
import dayjs from "dayjs";
import { getOfferbyId, updateOffer } from "@/services/hostOfferService";
import { cloneDeep } from "lodash";

export const getHostOfferById = createAsyncThunk("hostOffer/Edit", async (data) => {
  const response = await getOfferbyId(data);
  return response.data;
});

export const updateHostOffer = async (data) => {
  const response = await updateOffer(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "hostOffer/edit",
  initialState: {
    loading: false,
    hostOfferList: [],
  },
  reducers: {},
  extraReducers: {
    [getHostOfferById.fulfilled]: (state, action) => {
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
      let newData=cloneDeep(action.payload.results[0])
      newData.status=action?.payload.results?.[0]?.status?{ label: "ACTIVE", value: 1 }:{ label: "INACTIVE", value: 0 }
      state.hostOfferList = newData
      state.loading = false;
    },
    [getHostOfferById.pending]: (state) => {
      state.loading = true;
    },
    [getHostOfferById.rejected]: (state) => {
      state.hostOfferList = [];
      state.loading = false;
    },
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
