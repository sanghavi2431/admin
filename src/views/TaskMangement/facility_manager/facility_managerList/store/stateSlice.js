import { createSlice } from "@reduxjs/toolkit";
import { deleteSupervisor } from "@/services/taskManagement/supervisorService";

export const delete_supervisor = async (data) => {
  const response = await deleteSupervisor(data);
  return response.data;
};

const stateSlice = createSlice({
  name: "facility_managerList/state",
  initialState: {
    deleteConfirmation: false,
    selectedSupervisor: ""
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSelectedSupervisor: (state, action) => {
      state.selectedSupervisor = action.payload;
    }
  },
});

export const { toggleDeleteConfirmation, setSelectedSupervisor } = stateSlice.actions;

export default stateSlice.reducer;
