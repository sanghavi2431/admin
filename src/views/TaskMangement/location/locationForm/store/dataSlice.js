import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "location/form",
  initialState: {
    exitConfirmation: false,
    buttonType: "",
  },
  reducers: {
    toggleExitConfirmation: (state, action) => {
      state.exitConfirmation = action.payload;
    },
    setButtonType: (state, action) => {
      state.buttonType = action.payload;
    },
  },
  extraReducers: {},
});

export const {toggleExitConfirmation, setButtonType } = dataSlice.actions;

export default dataSlice.reducer;
