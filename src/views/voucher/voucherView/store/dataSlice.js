import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { getVoucherById } from "@/services/voucherService";
export const getVoucher = createAsyncThunk("getvoucher/view", async (data) => {
  const response = await getVoucherById(data);
  return response.data;
});

const dataSlice = createSlice({
  name: "voucher/view",
  initialState: {
    loading: false,
    voucherList: [],
  },
  reducers: {},
  extraReducers: {
    [getVoucher.fulfilled]: (state, action) => {
      if (typeof action.payload.results.expiry === "string") {
        action.payload.results.expiry = dayjs(
          action.payload.results.expiry,
          "YYYY-MM-DD"
        ).toDate();
      }
      state.voucherList = action.payload.results;
      state.loading = false;
    },
    [getVoucher.pending]: (state) => {
      state.loading = true;
    },
    [getVoucher.rejected]: (state) => {
      state.voucherList = [];
      state.loading = false;
    },
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
