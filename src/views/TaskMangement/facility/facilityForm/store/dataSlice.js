import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getClients, getLocations } from "@/services/taskManagement/blockService";
import { getBlocks,getShifts } from "@/services/taskManagement/facilitiesService";

export const getLocation = createAsyncThunk("getLocation/data", async (data) => {
  const response = await getLocations(data);
  return response.data.results;
});
export const get_Blocks = createAsyncThunk("getBlocks/data", async (data) => {
  const response = await getBlocks(data);
  return response.data.results;
});
export const get_Shift = createAsyncThunk("getShift/data", async (data) => {
  const response = await getShifts(data);
  return response.data.results;
});

const dataSlice = createSlice({
  name: "facility/form",
  initialState: {
    loading: false,
    locations:[],
    blocks:[],
    shifts:[],
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
     toggleExitConfirmation: (state, action) => {
      state.exitConfirmation = action.payload;
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
     [get_Shift.fulfilled]: (state, action) => {
      state.shifts = action.payload;
      state.loading = false;
    },
    [get_Shift.pending]: (state) => {
      state.loading = true;
    },
    [get_Shift.rejected]: (state, action) => {
      state.shifts = [];
      state.loading = false;
    },
  },
});

export const { setclient,setlocation,setblock ,toggleExitConfirmation} = dataSlice.actions;

export default dataSlice.reducer;
