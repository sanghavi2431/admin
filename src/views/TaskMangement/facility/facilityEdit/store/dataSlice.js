import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFacilityById, updateFacility } from "@/services/taskManagement/facilitiesService";

export const getFacility = createAsyncThunk("getFacility/Edit", async (data) => {
  const response = await getFacilityById(data);
  return response.data;
});

export const update_Facility = async (data) => {
  const response = await updateFacility(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "facility/edit",
  initialState: {
    loading: false,
    facilityData: [],
  },
  reducers: {},
  extraReducers: {
    [getFacility.fulfilled]: (state, action) => {
      state.facilityData = action.payload.results;
      state.loading = false;
    },
    [getFacility.pending]: (state) => {
      state.loading = true;
    },
    [getFacility.rejected]: (state) => {
      state.facilityData = [];
      state.loading = false;
    },
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
