import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { getClients, getLocations } from "@/services/taskManagement/blockService";
import { addCluster } from "@/services/taskManagement/clusterService";
import { fetchFacility, getBlocks } from "@/services/taskManagement/facilitiesService";

export const getClusterFacility = createAsyncThunk(
  "getClusterFacility/List",
  async (data) => {
    const response = await fetchFacility(data);
    return response.data.results;
  }
);
export const add_Cluster = async (data) => {
    const response = await addCluster(data);
    return response.data;
  }
  export const get_Clients = createAsyncThunk("get_Clients/List", async (data) => {
    const response = await getClients(data);
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
  name: "cluster/list",
  initialState: {
    selectedIds:[],
    finalSelected:[],
    loading: false,
    clusterList: [],
    tableData: initialTableData,
    sortedColumn: () => {},
    clusterType:"",
    clusterName:"",
    clients:[],
    locations:[],
    blocks:[],
    pincode:"",
    selectedBlock:"",
   nextConfirmation: false,
   exitConfirmation: false,

  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setClusterList: (state, action) => {
      state.clusterList = action.payload;
    },
    setSelectedIds: (state, action) => {
      state.selectedIds = action.payload;


    },
    setFinalSelected: (state, action) => {
      state.finalSelected = action.payload;
    },
    
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    },
    setclusterType: (state, action) => {
      state.clusterType = action.payload;
    },
    setclusterName: (state, action) => {
      state.clusterName = action.payload;
    },
    setpincode: (state, action) => {
      state.pincode = action.payload;
    },
    setSelectedBlock: (state, action) => {
      state.selectedBlock = action.payload;
    },
    toggleNextConfirmation: (state, action) => {
      state.nextConfirmation = action.payload;
    },
    toggleExitConfirmation: (state, action) => {
      state.exitConfirmation = action.payload;
    },
  },
  extraReducers: {
    [get_Clients.fulfilled]: (state, action) => {
      state.clients = action.payload;
    },
    [get_Clients.pending]: (state) => {     
    },
    [get_Clients.rejected]: (state) => {    
      state.clients = []
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
    [getClusterFacility.fulfilled]: (state, action) => {
     let newClusterList=cloneDeep(action.payload.facilities)
      state.clusterList = newClusterList;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getClusterFacility.pending]: (state) => {
      state.loading = true;
    },
    [getClusterFacility.rejected]: (state) => {
      state.loading = false;
      state.clusterList = [];

    },
  },
});

export const {
  setTableData,setSortedColumn,setFinalSelected, setclusterType,setclusterName,setSelectedBlock,setpincode,setClusterList,setSelectedIds,
  toggleNextConfirmation,toggleExitConfirmation
} = dataSlice.actions;

export default dataSlice.reducer;

