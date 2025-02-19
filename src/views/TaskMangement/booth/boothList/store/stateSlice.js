import { createSlice } from "@reduxjs/toolkit";
import { deleteBlocks } from "@/services/taskManagement/blockService";

export const delete_block = async (data) => {
  const response = await deleteBlocks(data);
  return response.data;
};

const stateSlice = createSlice({
  name: "block/state",
  initialState: {
    deleteConfirmation: false,
    selectedBlock: ""
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSelectedBlock: (state, action) => {
      state.selectedBlock = action.payload;
    }
  },
});

export const { toggleDeleteConfirmation, setSelectedBlock } = stateSlice.actions;

export default stateSlice.reducer;
