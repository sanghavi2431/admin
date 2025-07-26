import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLocations,getClients } from "@/services/taskManagement/blockService";
import { getBlocks } from "@/services/taskManagement/facilitiesService";
import { getFacility } from "@/services/taskManagement/boothService";
import { get_Booths } from "@/services/taskManagement/boothService";
import { cloneDeep } from "lodash";
import { getIOTdevicebyMapping_id, getIOTdeviceIdbyMapping_id } from "@/services/taskManagement/iotDevice";
import { getRatingReview } from "@/services/taskManagement/review.service";

export const getIOTData = createAsyncThunk("review/getIOTData/List", async (data) => {
  const response = await getRatingReview(data);
  return response.data.results;
});
export const get_Clients = createAsyncThunk("review/get_Clients/List", async (data) => {
  const response = await getClients(data);
  return response.data.results;
});
export const getBooths = createAsyncThunk("review/getBooths/List", async (data) => {
  const response = await get_Booths(data);
  return response.data.results;
});
export const getLocation = createAsyncThunk("review/getLocation/data", async (data) => {
  const response = await getLocations(data);
  return response.data.results;
});
export const get_Blocks = createAsyncThunk("review/getBlocks/data", async (data) => {
  const response = await getBlocks(data);
  return response.data.results;
});
export const get_Facility = createAsyncThunk("review/get_Facility/data", async (data) => {
  const response = await getFacility(data);
  return response.data.results;
});
export const getIOTdevicebyMappingId = createAsyncThunk("review/getIOTdevicebyMappingId/data", async (data) => {
  const response = await getIOTdevicebyMapping_id(data);
  return response.data.results;
});
export const getIOTdeviceIdbyMappingId = createAsyncThunk("review/getIOTdeviceIdbyMappingId/data", async (data) => {
  const response = await getIOTdeviceIdbyMapping_id(data);
  return response.data.results;
});

export const initialTableData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: "",
  sort: {
    order: "",
    key: "",
  },
};
const dataSlice = createSlice({
  name: "review/list",
  initialState: {
    loading: false,
    IOTdata: [],
    tableData: initialTableData,
    sortedColumn: () => { },
    type:["today"],
    clients:[],
    locations:[],
    blocks:[],
    facility:[],
    booths:[],
    IOTdevices:[],
    IOTdevicesIDs:[],
    facility_id:"",
    payload:""
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setFacility_id: (state, action) => {
      state.facility_id = action.payload;
    },
    resetState: (state, action) => {
      state.clients = [];
      state.locations = [];
      state.blocks = [];
      state.facility = [];
      state.booths = [];
      state.IOTdevices = [];

    },
    resetloggedState: (state, action) => {
      // state.clients = [];
      // state.locations = [];
      state.blocks = [];
      state.facility = [];
      state.booths = [];
      state.IOTdevices = [];

    },
    setPayload: (state, action) => {
      state.payload = action.payload;
    },
    setIOTdata: (state, action) => {
      state.IOTdata = action.payload;
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

export const { setTableData, setSortedColumn, setType, setFacility_id ,resetState ,setPayload,setIOTdata,resetloggedState} = dataSlice.actions;

export default dataSlice.reducer;
