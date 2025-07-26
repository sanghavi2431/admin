import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "client/form",
  initialState: {
    exitConfirmation: false,
  },
  reducers: {
    toggleExitConfirmation: (state, action) => {
      state.exitConfirmation = action.payload;
    },
  },
  extraReducers: {
  },
});

export const {toggleExitConfirmation  } = dataSlice.actions;

export default dataSlice.reducer;
