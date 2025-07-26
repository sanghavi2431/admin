import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteFacility } from "@/services/taskManagement/facilitiesService";
import { getLocations,getClients } from "@/services/taskManagement/blockService";
import { getBlocks } from "@/services/taskManagement/facilitiesService";
import { getFacility } from "@/services/taskManagement/boothService";
import { get_Booths } from "@/services/taskManagement/boothService";
import { cloneDeep } from "lodash";
import { getIOTdevicebyMapping_id, getIOTdeviceIdbyMapping_id } from "@/services/taskManagement/iotDevice";
import { getRatingReview } from "@/services/taskManagement/review.service";

export const delete_facility = async (data) => {
  const response = await deleteFacility(data);
  return response.data;
};
export const getIOTData = createAsyncThunk("getIOTData/List", async (data) => {
  const response = await getRatingReview(data);
  return response.data.results;
});
export const get_Clients = createAsyncThunk("get_Clients/List", async (data) => {
  const response = await getClients(data);
  return response.data.results;
});
export const getBooths = createAsyncThunk("getBooths/List", async (data) => {
  const response = await get_Booths(data);
  return response.data.results;
});
export const getLocation = createAsyncThunk("getLocation/data", async (data) => {
  const response = await getLocations(data);
  return response.data.results;
});
export const get_Blocks = createAsyncThunk("getBlocks/data", async (data) => {
  const response = await getBlocks(data);
  return response.data.results;
});
export const get_Facility = createAsyncThunk("get_Facility/data", async (data) => {
  const response = await getFacility(data);
  return response.data.results;
});
export const getIOTdevicebyMappingId = createAsyncThunk("getIOTdevicebyMappingId/data", async (data) => {
  const response = await getIOTdevicebyMapping_id(data);
  return response.data.results;
});
export const getIOTdeviceIdbyMappingId = createAsyncThunk("getIOTdeviceIdbyMappingId/data", async (data) => {
  const response = await getIOTdeviceIdbyMapping_id(data);
  return response.data.results;
});
const stateSlice = createSlice({
  name: "facility/state",
  initialState: {
    deleteConfirmation: false,
    selectedFacility: "",
    uploadConfirmation:false,
    downloadFAQConfirmation:false,
    clients:[],
    locations:[],
    blocks:[],
    facility:[],
    booths:[],
    IOTdevices:[],
    IOTdevicesIDs:[],
    facility_id:"",

  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSelectedFacility: (state, action) => {
      state.selectedFacility = action.payload;
    },
    toggleUploadConfirmation: (state, action) => {
      state.uploadConfirmation = action.payload;
    },
    toggleDownloadFAQConfirmation: (state, action) => {
      state.downloadFAQConfirmation = action.payload;
    },
  },
  extraReducers: {
    [getIOTData.fulfilled]: (state, action) => {
      state.IOTdata = action.payload;
      state.loading = false;
    },
    [getIOTData.pending]: (state) => {
      state.loading = true;
    },
    [getIOTData.rejected]: (state) => {
      state.loading = false;
      state.IOTdata = [];
    },
    [get_Clients.fulfilled]: (state, action) => {
      state.clients = action.payload;
    },
    [get_Clients.pending]: (state) => {     
    },
    [get_Clients.rejected]: (state) => {    
      state.clients = []
    },
    [getBooths.fulfilled]: (state, action) => {
      let list=cloneDeep(action.payload)
      state.booths=list.map((li)=>{return {label:li.booth_name,value:li.id}})   
    },
    [getBooths.pending]: (state) => {     
    },
    [getBooths.rejected]: (state) => {    
      state.booths = []
    },
     [getLocation.fulfilled]: (state, action) => {
      state.locations = action.payload;
      
    },
    [getLocation.pending]: (state) => {
      
    },
    [getLocation.rejected]: (state, action) => {
      state.locations = [];
      
    }, 
     [get_Blocks.fulfilled]: (state, action) => {
      state.blocks = action.payload;
      
    },
    [get_Blocks.pending]: (state) => {
      
    },
    [get_Blocks.rejected]: (state, action) => {
      state.blocks = [];
      
    },
    [get_Facility.fulfilled]: (state, action) => {
      state.facility = action.payload;
      
    },
    [get_Facility.pending]: (state) => {
      
    },
    [get_Facility.rejected]: (state, action) => {
      state.facility = [];
      
    },
    [getIOTdevicebyMappingId.fulfilled]: (state, action) => {
      state.IOTdevices = action.payload;
      
    },
    [getIOTdevicebyMappingId.pending]: (state) => {
      
    },
    [getIOTdevicebyMappingId.rejected]: (state, action) => {
      state.IOTdevices = [];
      
    },
    [getIOTdeviceIdbyMappingId.fulfilled]: (state, action) => {
      state.IOTdevicesIDs = action.payload;
      
    },
    [getIOTdeviceIdbyMappingId.pending]: (state) => {
      
    },
    [getIOTdeviceIdbyMappingId.rejected]: (state, action) => {
      state.IOTdevicesIDs = [];
      
    },


  },
});

export const { toggleDeleteConfirmation, setSelectedFacility,toggleUploadConfirmation,toggleDownloadFAQConfirmation } = stateSlice.actions;

export default stateSlice.reducer;
