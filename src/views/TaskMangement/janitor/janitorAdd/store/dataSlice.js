import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addJanitor } from "@/services/taskManagement/janitorService";

export const insert_janitor = async (data) => {
  const response = await addJanitor(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "janitor/add",
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
