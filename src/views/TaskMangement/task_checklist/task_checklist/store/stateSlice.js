import { createSlice } from "@reduxjs/toolkit";
import { deleteTask } from "@/services/taskManagement/taskChecklist";

export const delete_task = async (data) => {
  const response = await deleteTask(data);
  return response.data;
};

const stateSlice = createSlice({
  name: "taskchecklist/state",
  initialState: {
    deleteConfirmation: false,
    selectedTask: ""
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    }
  },
});

export const { toggleDeleteConfirmation, setSelectedTask } = stateSlice.actions;

export default stateSlice.reducer;
