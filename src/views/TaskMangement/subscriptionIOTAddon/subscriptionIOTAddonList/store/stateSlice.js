import { createSlice } from "@reduxjs/toolkit";
import { deleteAddonIOT } from "@/services/taskManagement/addOnService";

export const delete_subscribedIOT = async (data) => {
  const response = await deleteAddonIOT(data);
  return response.data;
};

const stateSlice = createSlice({
  name: "plan/state",
  initialState: {
    deleteConfirmation: false,
    selectedSubscribedIOT: ""
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSelectedSubscribedIOT: (state, action) => {
      state.selectedSubscribedIOT = action.payload;
    }
  },
});

export const { toggleDeleteConfirmation, setSelectedSubscribedIOT } = stateSlice.actions;

export default stateSlice.reducer;
