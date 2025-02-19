import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "voucherForm/Add",
  initialState: {
    loading: false,
 type_of_voucher: "",
 life_time_free:""
  },
  reducers: {
    settype_of_voucher: (state, action) => {
      state.type_of_voucher = action.payload;
    },
    setLife_time_free: (state, action) => {
      state.life_time_free = action.payload;
    },
  },
});

export const { settype_of_voucher, setLife_time_free} = dataSlice.actions;

export default dataSlice.reducer;
