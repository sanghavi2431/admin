import { createSlice } from "@reduxjs/toolkit";
import { bulkUploadWolooData } from "@/services/wolooService";

export const uploadWolooData = async (data) => {
  const response = await bulkUploadWolooData(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "woloosBulkupload/list",
  initialState: {
    loading: false,
    woloosList: [],
  },
  reducers: {},
  extraReducers: {},
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
