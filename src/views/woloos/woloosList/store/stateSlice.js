import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "woloosList/state",
  initialState: {
    deleteConfirmation: false,
    bulkUploadConfirmation: false,
    sortedColumn: () => {},
    selectedWoloo: "",
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    toggleBulkUploadConfirmation: (state, action) => {
      state.bulkUploadConfirmation = action.payload;
    },
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    },

    setSelectedWoloo: (state, action) => {
      state.selectedWoloo = action.payload;
    },
  },
});

export const {
  toggleDeleteConfirmation,
  setSortedColumn,
  setSelectedWoloo,
  toggleBulkUploadConfirmation,
} = stateSlice.actions;

export default stateSlice.reducer;
