import { createSlice } from "@reduxjs/toolkit";
import { deleteTemplate } from "@/services/taskManagement/taskTemplateService";

export const delete_Temp = async (data) => {
  const response = await deleteTemplate(data);
  return response.data;
};

const stateSlice = createSlice({
  name: "task_temp/state",
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
