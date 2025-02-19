import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { insertBlocks } from "@/services/taskManagement/blockService";

export const insert_Cluster = async (data) => {
  const response = await insertBlocks(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "cluster/add",
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
