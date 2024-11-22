import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "voucher/list",
  initialState: {
    forceApplyConfirmation: false,
  },
  reducers: {
    toggleForceApplyConfirmation: (state, action) => {
      state.forceApplyConfirmation = action.payload;
    },
  },
  extraReducers: {},
});

export const { toggleForceApplyConfirmation } = stateSlice.actions;

export default stateSlice.reducer;
