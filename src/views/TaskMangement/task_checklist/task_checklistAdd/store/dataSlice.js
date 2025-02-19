import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addTaskCheckList } from "@/services/taskManagement/taskChecklist";

export const insert_task_checklist = async (data) => {
  const response = await addTaskCheckList(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "task_checklist/add",
  initialState: {
    loading: false,
    buttonType: ""
  },
  reducers: {
    setButtonType: (state, action) => {
      state.buttonType = action.payload;
    },
  },
  extraReducers: {
  },
});

export const { setButtonType } = dataSlice.actions;

export default dataSlice.reducer;
