import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getVoucherById } from "@/services/voucherService";
import { update_no_of_uses } from "@/services/voucherService";
import dayjs from "dayjs";
export const getEditVoucher = createAsyncThunk(
  "getVoucher/Edit",
  async (data) => {
    const response = await getVoucherById(data);
    return response.data;
  }
);

export const updateNoOfUses = async (data) => {
  const response = await update_no_of_uses(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "Voucher/edit",
  initialState: {
    loading: false,
    voucherList: [],
  },
  reducers: {},
  extraReducers: {
    [getEditVoucher.fulfilled]: (state, action) => {
      if (typeof action.payload.results.expiry === "string") {
        action.payload.results.expiry = dayjs(
          action.payload.results.expiry,
          "YYYY-MM-DD"
        ).toDate();
      }
      state.voucherList = action.payload.results;
      state.loading = false;
    },
    [getEditVoucher.pending]: (state) => {
      state.loading = true;
    },
    [getEditVoucher.rejected]: (state) => {
      state.voucherList = [];
      state.loading = false;
    },
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
