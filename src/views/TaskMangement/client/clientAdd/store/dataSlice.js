import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { insertClient } from "@/services/taskManagement/clientService";

export const insert_Client = async (data) => {
  const response = await insertClient(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "client/add",
  initialState: {
    loading: false,
    clientData: [],
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
