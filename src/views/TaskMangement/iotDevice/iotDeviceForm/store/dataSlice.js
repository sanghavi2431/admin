import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLocations } from "@/services/taskManagement/blockService";
import { getBlocks } from "@/services/taskManagement/facilitiesService";
import { getFacility } from "@/services/taskManagement/boothService";
import { get_Booths } from "@/services/taskManagement/boothService";
import { cloneDeep } from "lodash";
import { fetchTemplate } from "@/services/taskManagement/taskTemplateService";

export const getLocation = createAsyncThunk("getIOTLocation/data", async (data) => {
  const response = await getLocations(data);
  return response.data.results;
});
export const get_Blocks = createAsyncThunk("getIOTBlocks/data", async (data) => {
  const response = await getBlocks(data);
  return response.data.results;
});
export const get_facility = createAsyncThunk("getIOTFacility/data", async (data) => {
  const response = await getFacility(data);
  return response.data.results;
});
export const getBooths = createAsyncThunk("getIOTBooths/data", async (data) => {
  const response = await get_Booths(data);
  return response.data.results;
});
export const getTemplate = createAsyncThunk("getTemplate/tempMap", async (data) => {
  const response = await fetchTemplate(data);
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
  name: "templateMapList/list",
  initialState: {
    loading: false,
    templateMapList: [],
    tableData: initialTableData,
    sortedColumn: () => {},
    locations:[],
    blocks:[],
    facility:[],
    facility_id:"",
    booths:[],
    template:[],
    templateList: [],

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
    [getTemplate.fulfilled]: (state, action) => {
      let list=cloneDeep(action.payload.templates)
      state.templateList=list.map((li)=>{return {label:li.template_name,value:li.id}})   
      state.loading = false;
    },
    [getTemplate.pending]: (state) => {
      state.loading = true;
    },
    [getTemplate.rejected]: (state) => {
      state.templateList = [];
      state.loading = false;
    },
    [get_facility.fulfilled]: (state, action) => {
      state.facility = action.payload;
      state.loading = false;
    },
    [get_facility.pending]: (state) => {
      state.loading = true;
      state.facility = [];

    },
    [get_facility.rejected]: (state) => {
      state.loading = true;
      state.facility = [];
    },
     [getLocation.fulfilled]: (state, action) => {
      state.locations = action.payload;
      state.loading = false;
    },
    [getLocation.pending]: (state) => {
      state.loading = true;
      state.locations = [];

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
      state.blocks = [];

    },
    [get_Blocks.rejected]: (state, action) => {
      state.blocks = [];
      state.loading = false;
    },
    [getBooths.fulfilled]: (state, action) => {
      let list=cloneDeep(action.payload)
      state.booths=list.map((li)=>{return {label:li.booth_name,value:li.id}})
    },
    [getBooths.pending]: (state) => {
      state.booths = [];
    },
    [getBooths.rejected]: (state, action) => {
      state.booths = [];
    }
  },
});

export const { setTableData, setSortedColumn,setFacility_id} = dataSlice.actions;

export default dataSlice.reducer;
