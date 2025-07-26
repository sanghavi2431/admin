import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLocationById,updateLocation } from "@/services/taskManagement/locationService";

export const getLocation = createAsyncThunk("getLocation/Edit", async (data) => {
  const response = await getLocationById(data);
  return response.data;
});

export const update_Location = async (data) => {
  const response = await updateLocation(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "location/edit",
  initialState: {
    loading: false,
    locationData: [],
  },
  reducers: {},
  extraReducers: {
    [getLocation.fulfilled]: (state, action) => {
      state.locationData = action.payload.results;
      state.loading = false;
    },
    [getLocation.pending]: (state) => {
      state.loading = true;
    },
    [getLocation.rejected]: (state) => {
      state.locationData = [];
      state.loading = false;
    },
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
