import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadTemplateMappingFile } from "@/services/taskManagement/templateMapService";
import { getLocations } from "@/services/taskManagement/blockService";
import { getBlocks } from "@/services/taskManagement/facilitiesService";

export const upload_task_mapping_file = async (data) => {
  const response = await uploadTemplateMappingFile(data);
  return response.data;
};

// export const upload_Facility = async (data) => {
//   const response = await uploadAutoTaskMapping(data);
//   return response.data;
// };

export const getLocation = createAsyncThunk("getLocation/data", async (data) => {
  const response = await getLocations(data);
  return response.data.results;
});
export const get_Blocks = createAsyncThunk("getBlocks/data", async (data) => {
  const response = await getBlocks(data);
  return response.data.results;
});

const dataSlice = createSlice({
  name: "facilityBulkupload/list",
  initialState: {
    loading: false,
    locations: [],
    blocks: [],
    client: "",
    location: "",
    block: "",
  },
  reducers: {
    setclient: (state, action) => {
      state.client = action.payload;
    },
    setlocation: (state, action) => {
      state.location = action.payload;
    },
    setblock: (state, action) => {
      state.block = action.payload;
    },
  },
  extraReducers: {
    [getLocation.fulfilled]: (state, action) => {
      state.locations = action.payload;
      state.loading = false;
    },
    [getLocation.pending]: (state) => {
      state.loading = true;
    },
    [getLocation.rejected]: (state, action) => {
      state.locations = [];
      state.loading = false;
    },
    [get_Blocks.fulfilled]: (state, action) => {
      state.blocks = action.payload;
      state.loading = false;
    },
    [get_Blocks.pending]: (state) => {
      state.loading = true;
    },
    [get_Blocks.rejected]: (state, action) => {
      state.blocks = [];
      state.loading = false;
    },
  },
});

export const { setclient, setlocation, setblock } = dataSlice.actions;

export default dataSlice.reducer;
