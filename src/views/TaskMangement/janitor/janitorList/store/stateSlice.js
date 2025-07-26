import { createSlice } from "@reduxjs/toolkit";
import { deleteJanitor } from "@/services/taskManagement/janitorService";

export const delete_janitor = async (data) => {
  const response = await deleteJanitor(data);
  return response.data;
};

const stateSlice = createSlice({
  name: "janitor/state",
  initialState: {
    deleteConfirmation: false,
    selectedJanitor: ""
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSelectedJanitor: (state, action) => {
      state.selectedJanitor = action.payload;
    }
  },
});

export const { toggleDeleteConfirmation, setSelectedJanitor } = stateSlice.actions;

export default stateSlice.reducer;
