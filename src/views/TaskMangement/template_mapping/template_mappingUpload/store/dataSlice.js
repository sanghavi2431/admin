import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadFacility } from "services/taskManagement/facilitiesService";
import { uploadAutoTaskMapping } from "services/taskManagement/templateMapService";
import { bulkUploadWolooData } from "services/wolooService";

export const upload_Facility = async (data) => {
  const response = await uploadAutoTaskMapping(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "facilityBulkupload/list",
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: {},
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
