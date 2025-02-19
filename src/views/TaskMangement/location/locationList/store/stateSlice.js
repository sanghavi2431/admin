import { createSlice } from "@reduxjs/toolkit";
import { deleteClient } from "@/services/taskManagement/clientService";
import { deleteLocation } from "@/services/taskManagement/locationService";

export const delete_location = async (data) => {
  const response = await deleteLocation(data);
  return response.data;
};

const stateSlice = createSlice({
  name: "location/state",
  initialState: {
    deleteConfirmation: false,
    selectedLocation: ""
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    }
  },
});

export const { toggleDeleteConfirmation, setSelectedLocation } = stateSlice.actions;

export default stateSlice.reducer;
