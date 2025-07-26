import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addTemplate } from "@/services/taskManagement/taskTemplateService";

export const insert_Task_temp = async (data) => {
  const response = await addTemplate(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "task/add",
  initialState: {
    loading: false,
    tasksCheckList:"",
    buttonType: "",
  },
  reducers: {
    setButtonType: (state, action) => {
      state.buttonType = action.payload;
    },
    
  },
  extraReducers: {
  },
});

export const {  setButtonType} = dataSlice.actions;

export default dataSlice.reducer;
