import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTemplate } from "@/services/taskManagement/taskTemplateService";
import { getLocations,getClients } from "@/services/taskManagement/blockService";
import { getBlocks } from "@/services/taskManagement/facilitiesService";
import { getFacility } from "@/services/taskManagement/boothService";
import { get_Booths } from "@/services/taskManagement/boothService";

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
  name: "booth/list",
  initialState: {
    loading: false,
    boothList: [],
    tableData: initialTableData,
    sortedColumn: () => {},
    locations:[],
    blocks:[],
    facility:[],
    facility_id:""
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
    
  },
  extraReducers: {
    [getBooths.fulfilled]: (state, action) => {
      state.boothList = action.payload;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getBooths.pending]: (state) => {
      state.loading = true;
    },
    [getBooths.rejected]: (state) => {
      state.loading = false;
      state.tableData.total = 0;
      state.boothList = []
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

export const { setTableData, setSortedColumn,setFacility_id} = dataSlice.actions;

export default dataSlice.reducer;
