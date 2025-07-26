import { createSlice } from "@reduxjs/toolkit";
import { deleteClient } from "@/services/taskManagement/clientService";

export const delete_client = async (data) => {
  const response = await deleteClient(data);
  return response.data;
};

const stateSlice = createSlice({
  name: "clients/state",
  initialState: {
    deleteConfirmation: false,
    selectedClient: ""
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSelectedClient: (state, action) => {
      state.selectedClient = action.payload;
    }
  },
});

export const { toggleDeleteConfirmation, setSelectedClient } = stateSlice.actions;

export default stateSlice.reducer;
