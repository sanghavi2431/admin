import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { fetchCluster } from "@/services/taskManagement/clusterService";
import { fetchFacility } from "@/services/taskManagement/facilitiesService";
import { fetchTemplate } from "@/services/taskManagement/taskTemplateService";
import { fetchJanitors } from "@/services/taskManagement/janitorService";
import { getLocations, getClients } from "@/services/taskManagement/blockService";
import { getBlocks } from "@/services/taskManagement/facilitiesService";
import { getFacility } from "@/services/taskManagement/boothService";
import { fetchShifts } from "@/services/taskManagement/shiftService";

export const getTemplate = createAsyncThunk("getTemplate/tempMap", async (data) => {
  const response = await fetchTemplate(data);
  return response.data.results;
});
export const getJanitor = createAsyncThunk("getJanitor/tempMap", async (data) => {
  const response = await fetchJanitors(data);
  return response.data.results;
});
export const getLocation = createAsyncThunk("getLocation/tempMap", async (data) => {
  const response = await getLocations(data);
  return response.data.results;
});
export const get_Blocks = createAsyncThunk("getMapBlocks/tempMap", async (data) => {
  const response = await getBlocks(data);

  return response.data.results;
});
export const get_Facility = createAsyncThunk("get_Facility/tempMap", async (data) => {
  const response = await getFacility(data);
  return response.data.results;
});
export const getShifts = createAsyncThunk("getShifts/tempMap", async (data) => {
  const response = await fetchShifts(data);
  return response.data.results;
});
export const getCluster = createAsyncThunk("getCluster/tempMap", async (data) => {
  const response = await fetchCluster(data);
  return response.data.results;
});

const dataSlice = createSlice({
  name: "tempMap/form",
  initialState: {
    loading: false,
    facilityList: [],
    templateList: [],
    janitorList: [],
    locations: [],
    blocks: [],
    facility: [],
    shifts: [],
    clusterList: [],
    exitConfirmation: false
  },
  reducers: {
    toggleExitConfirmation: (state, action) => {
      state.exitConfirmation = action.payload;
    }
  },
  extraReducers: {
    [getFacility.fulfilled]: (state, action) => {
      let list = cloneDeep(action.payload.facilities)
      state.facilityList = list.map((li) => { return { label: li.facility_name, value: li.id } })
      state.loading = false;
    },
    [getFacility.pending]: (state) => {
      state.loading = true;
    },
    [getFacility.rejected]: (state) => {
      state.facilityList = [];
      state.loading = false;
    },
    [getTemplate.fulfilled]: (state, action) => {
      let list = cloneDeep(action.payload.templates)
      state.templateList = list.map((li) => { return { label: li.template_name, value: li.id, estimated_time: li.estimated_time } })
      state.loading = false;
    },
    [getTemplate.pending]: (state) => {
      state.loading = true;
    },
    [getTemplate.rejected]: (state) => {
      state.templateList = [];
      state.loading = false;
    },
    [getJanitor.fulfilled]: (state, action) => {
      let list = cloneDeep(action.payload.data)
      state.janitorList = list.map((li) => { return { label: li.name, value: li.id } })
      state.loading = false;
    },
    [getJanitor.pending]: (state) => {
      state.loading = true;
    },
    [getJanitor.rejected]: (state) => {
      state.janitorList = [];
      state.loading = false;
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
    [getShifts.fulfilled]: (state, action) => {
      let list = cloneDeep(action.payload.shifts)
      state.shifts = list.map((li) => { return { label: li.shift_name, value: li.id } })
    },
    [getShifts.pending]: (state) => {
    },
    [getShifts.rejected]: (state) => {
      state.shifts = ""
    },
    [getCluster.fulfilled]: (state, action) => {
      let list = cloneDeep(action.payload.cluster)
      state.clusterList = list.map((li) => { return { label: li.cluster_name, value: li.id } })
      state.loading = false;
    },
    [getCluster.pending]: (state) => {
      state.loading = true;
    },
    [getCluster.rejected]: (state) => {
      state.clusterList = [];
      state.loading = false;
    },
  },
});

export const { toggleExitConfirmation } = dataSlice.actions;

export default dataSlice.reducer;
