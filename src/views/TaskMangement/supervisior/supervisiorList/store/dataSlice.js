import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTemplate } from "@/services/taskManagement/taskTemplateService";
import { getLocations,getClients } from "@/services/taskManagement/blockService";
import { getBlocks } from "@/services/taskManagement/facilitiesService";
import { getFacility } from "@/services/taskManagement/boothService";
import { get_Booths } from "@/services/taskManagement/boothService";
import { fetchSupervisor } from "@/services/taskManagement/supervisorService";

export const getSupervisor = createAsyncThunk("getSupervisor/List", async (data) => {
  const response = await fetchSupervisor(data);
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

export const initialTableData = {
role_id:2,
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
  name: "supervisor/list",
  initialState: {
    loading: false,
    supervisorList: [],
    tableData: initialTableData,
    sortedColumn: () => {},
    locations:[],
    blocks:[],
    facility:[],
    facility_id:"",
    clientId: "",
    },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    },
    setFacility_id: (state, action) => {
      state.facility_id = action.payload;
    },
    setClientId: (state, action) => {
      state.clientId = action.payload;
    },
  },
  extraReducers: {
    [getSupervisor.fulfilled]: (state, action) => {
      state.supervisorList = action.payload.data;
      state.tableData.total = +action.payload.total;
      state.loading = false;
    },
    [getSupervisor.pending]: (state) => {
      state.loading = true;
    },
    [getSupervisor.rejected]: (state) => {
      state.loading = false;
      state.tableData.total = 0;
      state.supervisorList = []
    },
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
    [get_Facility.fulfilled]: (state, action) => {
      state.facility = action.payload;
      state.loading = false;
    },
    [get_Facility.pending]: (state) => {
      state.loading = true;
    },
    [get_Facility.rejected]: (state, action) => {
      state.facility = [];
      state.loading = false;
    },
  },
});

export const { setTableData, setSortedColumn,setFacility_id,setClientId} = dataSlice.actions;

export default dataSlice.reducer;
