import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { fetchCluster } from "@/services/taskManagement/clusterService";

export const getCluster = createAsyncThunk("getCluster/clientOnboard", async (data) => {
  const response = await fetchCluster(data);
  return response.data.results;
});

const dataSlice = createSlice({
  name: "clientOnboard",
  initialState: {
    loading: false,
    clusterList: [],
    toggleExitConfirmation: false,
    addFacilityData: {
      organization_name: "",
      unit_no: "",
      locality: "",
      building: "",
      floor: "",
      landmark: "",
      pin_code: "",
      client_id: "",
      location_id: "",
      cluster_id: "",
    },
    addSupervisorData: {
      user_id: "",
      full_name: "",
      number: "",
      gender: "",
      cluster_id: "",
    },
    addJanitorData: {
      user_id: "",
      full_name: "",
      number: "",
      gender: "",
      cluster_id: "",
    },
    assignTaskData: {
      numToilets: "",
      toiletCleaning: "",
      generalCleaning: "",
      cleaningFrequency: "",
    }
  },
  reducers: {
    toggleExitConfirmation: (state, action) => {
      state.toggleExitConfirmation = action.payload;
    },
    setAddFacilityData: (state, action) => {
      state.addFacilityData = action.payload;
    },
    setAddSupervisorData: (state, action) => {
      state.addSupervisorData = action.payload;
    },
    setAddJanitorData: (state, action) => {
      state.addJanitorData = action.payload;
    },
    setAssignTaskData: (state, action) => {
      state.assignTaskData = action.payload;
    },
    resetClientOnboardState: (state) => {
      Object.assign(state, dataSlice.getInitialState());
    },
  },
  extraReducers: {
    [getCluster.fulfilled]: (state, action) => {
      const list = cloneDeep(action.payload.cluster)
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

export const {
  toggleExitConfirmation,
  setAddFacilityData,
  setAddSupervisorData,
  setAddJanitorData,
  setAssignTaskData,
  resetClientOnboardState
} = dataSlice.actions;

export default dataSlice.reducer;
