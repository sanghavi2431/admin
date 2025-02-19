import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addSupervisor } from "@/services/taskManagement/supervisorService";
export const insert_supervisor = async (data) => {
  const response = await addSupervisor(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "supervisor/add",
  initialState: {
    loading: false,
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

export const { setButtonType } = dataSlice.actions;

export default dataSlice.reducer;
