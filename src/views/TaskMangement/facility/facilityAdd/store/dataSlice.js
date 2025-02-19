import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addFacility } from "@/services/taskManagement/facilitiesService";

export const insert_Facility = async (data) => {
  const response = await addFacility(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "facility/add",
  initialState: {
    loading: false,
    buttonType: "",
    exitConfirmation: false,
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
