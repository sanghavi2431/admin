import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTemplate } from "@/services/taskManagement/taskTemplateService";
import { getLocations,getClients } from "@/services/taskManagement/blockService";
import { getBlocks } from "@/services/taskManagement/facilitiesService";
import { getFacility } from "@/services/taskManagement/boothService";
import { get_Booths } from "@/services/taskManagement/boothService";
import { cloneDeep } from "lodash";
import { fetchTemplateMap } from "@/services/taskManagement/templateMapService";

export const getTemplate = createAsyncThunk("getFacilityMap/List", async (data) => {
  const response = await fetchTemplateMap(data);
  return response.data.results;
});
export const getLocation = createAsyncThunk("getMapLocation/data", async (data) => {
  const response = await getLocations(data);
  return response.data.results;
});
export const get_Blocks = createAsyncThunk("getMapBlocks/data", async (data) => {
  const response = await getBlocks(data);
  return response.data.results;
});
export const get_Facility = createAsyncThunk("get_Facility/data", async (data) => {
  const response = await getFacility(data);
  return response.data.results;
});


export const initialTableData = {
  facility_id:"",
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
  name: "templateMapList/list",
  initialState: {
    loading: false,
    templateMapList: [],
    tableData: initialTableData,
    sortedColumn: () => {},
    locations:[],
    blocks:[],
    facility:[],
    template:[]
    },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    },
    setFacility_id: (state, action) => {
      state.tableData.facility_id = action.payload.value;
    },
    
  },
  extraReducers: {
    [getTemplate.fulfilled]: (state, action) => {
      state.templateMapList = action.payload.template_facility_mappings;
      state.tableData.total = action.payload.count;
      state.loading = false;
    },
    [getTemplate.pending]: (state) => {
      state.loading = true;
    },
    [getTemplate.rejected]: (state) => {
      state.loading = false;
      state.tableData.total = 0;
      state.templateMapList = []
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
    }
  },
});

export const { setTableData, setSortedColumn,setFacility_id} = dataSlice.actions;

export default dataSlice.reducer;
