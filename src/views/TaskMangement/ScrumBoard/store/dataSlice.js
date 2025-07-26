import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { scrumboardData } from "./sampleData";
import { fetchTask } from "@/services/taskManagement/taskDashboardService";
import { getLocations, getClients } from "@/services/taskManagement/blockService";
import { getBlocks } from "@/services/taskManagement/facilitiesService";
import { getFacility } from "@/services/taskManagement/boothService";
import { get_Booths } from "@/services/taskManagement/boothService";
import { cloneDeep } from "lodash";
import { getIOTdevicebyMapping_id } from "@/services/taskManagement/iotDevice";

export const getBoards = createAsyncThunk(
  "scrumBoard/getBoards",
  async (data) => {
    const response = await fetchTask(data);
    return response.data.results;
  }
);

export const getMembers = createAsyncThunk(
  "scrumBoard/getMembers",
  async () => {
    // const response = await apiGetScrumBoardtMembers()
    return scrumboardData;
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
const dataSlice = createSlice({
  name: "scrumBoard/data",
  initialState: {
    loading: false,
    type: ["today"],
    clients: [],
    locations: [],
    blocks: [],
    facility: [],
    booths: [],
    IOTdevices: [],
    facility_id: "",
    payload: "",
    taskDashboardData: {},
  },
  reducers: {
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
    setTaskDashboardData: (state, action) => {
      state.taskDashboardData = action.payload;
    },
  },
  extraReducers: {
    [getBoards.fulfilled]: (state, { payload }) => { 
      state.loading = false;
      state.taskDashboardData = payload;
    },
    [getBoards.pending]: (state) => {
      state.loading = true;
    },
    [getBoards.failed]: (state) => {
      state.loading = false;
      state.taskDashboardData = {};
    },
    // [getMembers.fulfilled]: (state, action) => {
    //   state.boardMembers = action.payload.participantMembers;
    //   state.allMembers = action.payload.allMembers;
    // },
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
  },
});

export const {
  setType,
  setFacility_id,
  setPayload,
  resetState,
  resetloggedState,
  setTaskDashboardData
} = dataSlice.actions;

export default dataSlice.reducer;
