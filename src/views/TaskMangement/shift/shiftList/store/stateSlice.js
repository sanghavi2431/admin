import { createSlice } from "@reduxjs/toolkit";
import { deleteShift } from "@/services/taskManagement/shiftService";

export const delete_shift = async (data) => {
  const response = await deleteShift(data);
  return response.data;
};

const stateSlice = createSlice({
  name: "shift/state",
  initialState: {
    deleteConfirmation: false,
    selectedShift: ""
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSelectedShift: (state, action) => {
      state.selectedShift = action.payload;
    }
  },
});

export const { toggleDeleteConfirmation, setSelectedShift } = stateSlice.actions;

export default stateSlice.reducer;
