import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { fetchCluster } from "@/services/taskManagement/clusterService";

export const getCluster = createAsyncThunk("getCluster/janitor", async (data) => {
  const response = await fetchCluster(data);
  return response.data.results;
});

const dataSlice = createSlice({
  name: "janitor/form",
  initialState: {
    loading: false,
    clusterList:[],
    exitConfirmation: false,

  },
  reducers: {
    toggleExitConfirmation: (state, action) => {
      state.exitConfirmation = action.payload;
    },
  },
  extraReducers: {
    [getCluster.fulfilled]: (state, action) => {
      let list=cloneDeep(action.payload.cluster)
      state.clusterList=list.map((li)=>{return {label:li.cluster_name,value:li.id}})   
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
