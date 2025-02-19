import { createSlice } from "@reduxjs/toolkit";
import { deletePlan } from "@/services/taskManagement/plansService";

export const delete_plan = async (data) => {
  const response = await deletePlan(data);
  return response.data;
};

const stateSlice = createSlice({
  name: "plan/state",
  initialState: {
    deleteConfirmation: false,
    selectedPlan: ""
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSelectedPlan: (state, action) => {
      state.selectedPlan = action.payload;
    }
  },
});

export const { toggleDeleteConfirmation, setSelectedPlan } = stateSlice.actions;

export default stateSlice.reducer;
