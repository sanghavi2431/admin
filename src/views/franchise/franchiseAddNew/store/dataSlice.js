import { createSlice } from "@reduxjs/toolkit";
import { addFranchise } from "@/services/franchiseService";

export const updateFranchise = async (data) => {
  const response = await addFranchise(data);
  return response.data;
};
const dataSlice = createSlice({
  name: "AddFranchise/list",
  initialState: {
    loading: false,
    woloosList: [],
  },
  reducers: {},
  extraReducers: {},
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
