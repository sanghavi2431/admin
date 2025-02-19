import { createSlice } from "@reduxjs/toolkit";
import { deleteBlocks } from "@/services/taskManagement/blockService";
import { deleteiotDevicebyId } from "@/services/taskManagement/iotDevice";

export const delete_IOTDevice = async (data) => {
  const response = await deleteiotDevicebyId(data);
  return response.data;
};

const stateSlice = createSlice({
  name: "IOTDevice/state",
  initialState: {
    deleteConfirmation: false,
    selectedIOTDevice: ""
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSelectedIOTDevice: (state, action) => {
      state.selectedIOTDevice = action.payload;
    }
  },
});

export const { toggleDeleteConfirmation, setSelectedIOTDevice } = stateSlice.actions;

export default stateSlice.reducer;
