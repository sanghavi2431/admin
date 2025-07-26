import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIoTData } from "@/services/taskManagement/iot.service";
import { getLocations, getClients } from "@/services/taskManagement/blockService";
import { getBlocks } from "@/services/taskManagement/facilitiesService";
import { getFacility } from "@/services/taskManagement/boothService";
import { get_Booths } from "@/services/taskManagement/boothService";
import { cloneDeep } from "lodash";
import {
  getIOTdevicebyMapping_id,
  getIOTdeviceIdbyMapping_id,
} from "@/services/taskManagement/iotDevice";
import { getRatingReview } from "@/services/taskManagement/review.service";
import { fetchTask, fetchTaskForFreeTrial } from "@/services/taskManagement/taskDashboardService";

export const getIOTData = createAsyncThunk("getIOTData/List", async (data) => {
  const response = await getIoTData(data);
  return response.data.results;
});

export const getTaskDashboardData = createAsyncThunk(
  "getTaskDashboardData/List",
  async (data) => {
    const response = await fetchTask(data);
    return response.data.results;
  }
);

export const getTaskDashboardDataForFreeTrial = createAsyncThunk(
  "getTaskDashboardDataForFreeTrial/List",
  async (data) => {
    const response = await fetchTaskForFreeTrial(data);
    return response.data.results;
  }
);

export const getReviewData = createAsyncThunk(
  "getReviewData/List",
  async (data) => {
    const response = await getRatingReview(data);
    return response.data.results;
  }
);

export const get_Clients = createAsyncThunk(
  "get_Clients/List",
  async (data) => {
    const response = await getClients(data);
    return response.data.results;
  }
);
export const getBooths = createAsyncThunk("getBooths/List", async (data) => {
  const response = await get_Booths(data);
  return response.data.results;
});
export const getLocation = createAsyncThunk(
  "getLocation/data",
  async (data) => {
    const response = await getLocations(data);
    return response.data.results;
  }
);
export const get_Blocks = createAsyncThunk("getBlocks/data", async (data) => {
  const response = await getBlocks(data);
  return response.data.results;
});
export const get_Facility = createAsyncThunk(
  "get_Facility/data",
  async (data) => {
    const response = await getFacility(data);
    return response.data.results;
  }
);
export const getIOTdevicebyMappingId = createAsyncThunk(
  "getIOTdevicebyMappingId/data",
  async (data) => {
    const response = await getIOTdevicebyMapping_id(data);
    return response.data.results;
  }
);
export const getIOTdeviceIdbyMappingId = createAsyncThunk(
  "getIOTdeviceIdbyMappingId/data",
  async (data) => {
    const response = await getIOTdeviceIdbyMapping_id(data);
    return response.data.results;
  }
);

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
  name: "IOTdata/list",
  initialState: {
    loading: false,
    IOTdata: [],
    error: null,
    taskDashboardData: {},
    reviewDashboardData: [],
    tableData: initialTableData,
    sortedColumn: () => {},
    type: "today",
    dashboardType: "task",
    clients: [],
    locations: [],
    blocks: [],
    facility: [],
    booths: [],
    IOTdevices: [],
    IOTdevicesIDs: [],
    facility_id: "",
    payload: "",
    graphDataLevel: "Building",
    isDemoMode: false,
    selectedFiltersData: {}
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
    setDashboardType: (state, action) => {
      state.dashboardType = action.payload;
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
    // setIOTDashboardData: (state, action) => {
    //   state.IOTDashboardData = action.payload;
    // },
    setTaskDashboardData: (state, action) => {
      state.taskDashboardData = action.payload;
    },
    setReviewDashboardData: (state, action) => {
      state.reviewDashboardData = action.payload;
    },
    setGraphDataLevel: (state, action) => {      
      state.graphDataLevel = action.payload;
    },
    setSelectedFiltersData: (state, action) => { 
      state.selectedFiltersData = action.payload;
    },
    removeSelectedFilter: (state, action) => {
      const { filterKey } = action.payload;
      delete state.selectedFiltersData[filterKey];
    },
    setDemoMode: (state, action) => {
      state.isDemoMode = action.payload;
    },
  },
  extraReducers: {
    [getIOTData.fulfilled]: (state, action) => {
      state.IOTdata = action.payload;
      state.loading = false;
    },
    [getIOTData.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [getIOTData.rejected]: (state, action) => {
      state.loading = false;
      state.IOTdata = [];
      state.error = "Failed to load IoT dashboard data";
    },
    [getTaskDashboardData.fulfilled]: (state, action) => {
      state.taskDashboardData = action.payload;
      state.loading = false;
    },
    [getTaskDashboardData.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [getTaskDashboardData.rejected]: (state, action) => {
      state.loading = false;
      state.taskDashboardData = {};
      state.error = "Failed to load task dashboard data";
    },      
    [getTaskDashboardDataForFreeTrial.fulfilled]: (state, action) => {
      state.taskDashboardData = action.payload;
      state.loading = false;
    },
    [getTaskDashboardDataForFreeTrial.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [getTaskDashboardDataForFreeTrial.rejected]: (state, action) => {
      state.loading = false;
      state.taskDashboardData = {};
      state.error = "Failed to load task dashboard data";
    },
    [getReviewData.fulfilled]: (state, action) => {
      state.reviewDashboardData = action.payload?.graphData[0];
      state.loading = false;
    },
    [getReviewData.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [getReviewData.rejected]: (state, action) => {
      state.loading = false;
      state.reviewDashboardData = [];
      state.error = "Failed to load review dashboard data";
    },
    [get_Clients.fulfilled]: (state, action) => {
      state.clients = action.payload;
    },
    [get_Clients.pending]: (state) => {},
    [get_Clients.rejected]: (state) => {
      state.clients = [];
    },
    [getBooths.fulfilled]: (state, action) => {
      let list = cloneDeep(action.payload);
      state.booths = list.map((li) => {
        return { label: li.booth_name, value: li.id };
      });
    },
    [getBooths.pending]: (state) => {},
    [getBooths.rejected]: (state) => {
      state.booths = [];
    },
    [getLocation.fulfilled]: (state, action) => {
      state.locations = action.payload;
    },
    [getLocation.pending]: (state) => {},
    [getLocation.rejected]: (state, action) => {
      state.locations = [];
      state.blocks = [];
    },
    [get_Blocks.fulfilled]: (state, action) => {
      state.blocks = action.payload;
    },
    [get_Blocks.pending]: (state) => {},
    [get_Blocks.rejected]: (state, action) => {
      state.blocks = [];
    },
    [get_Facility.fulfilled]: (state, action) => {
      state.facility = action.payload;
    },
    [get_Facility.pending]: (state) => {},
    [get_Facility.rejected]: (state, action) => {
      state.facility = [];
    },
    [getIOTdevicebyMappingId.fulfilled]: (state, action) => {
      state.IOTdevices = action.payload;
    },
    [getIOTdevicebyMappingId.pending]: (state) => {},
    [getIOTdevicebyMappingId.rejected]: (state, action) => {
      state.IOTdevices = [];
    },
    [getIOTdeviceIdbyMappingId.fulfilled]: (state, action) => {
      state.IOTdevicesIDs = action.payload;
    },
    [getIOTdeviceIdbyMappingId.pending]: (state) => {},
    [getIOTdeviceIdbyMappingId.rejected]: (state, action) => {
      state.IOTdevicesIDs = [];
    },
  },
});

export const {
  setTableData,
  setSortedColumn,
  setType,
  setDashboardType,
  setFacility_id,
  resetState,
  setPayload,
  setIOTdata,
  resetloggedState,
  setIOTDashboardData,
  setTaskDashboardData,
  setReviewDashboardData,
  setGraphDataLevel,
  setSelectedFiltersData,
  removeSelectedFilter,
  setDemoMode
} = dataSlice.actions;

export default dataSlice.reducer;
