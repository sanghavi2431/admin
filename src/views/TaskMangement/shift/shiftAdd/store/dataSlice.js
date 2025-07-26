import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addShift } from "@/services/taskManagement/shiftService";

export const insert_Shift = async (data) => {
  const response = await addShift(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "shift/add",
  initialState: {
    loading: false,
    buttonType: "",
  },
  reducers: {
    setButtonType: (state, action) => {
      state.buttonType = action.payload;
    },
  },
  extraReducers: {
  },
});

export const { setButtonType } = dataSlice.actions;

export default dataSlice.reducer;
