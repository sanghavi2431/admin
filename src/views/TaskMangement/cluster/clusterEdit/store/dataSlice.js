import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { getBlocksById,updateBlocks } from "@/services/taskManagement/blockService";
import { getClusterById } from "@/services/taskManagement/clusterService";

export const getCluster = createAsyncThunk("getCluster/Edit", async (data) => {
  const response = await getClusterById(data);
  return response.data;
});

export const update_cluster = async (data) => {
  const response = await updateBlocks(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "cluster/edit",
  initialState: {
    loading: false,
    clusterData: [],
    selectedIds : []
    // state.selectedIds = [131,141]

  },
  reducers: {},
  extraReducers: {
    [getCluster.fulfilled]: (state, action) => {
      const clusterType = [
        { label: "Customer Request", value: 0 },
        { label: "Facility", value: 1 },
      ];
      let newClusterData=cloneDeep( action.payload.results)
      // newClusterData.cluster_type= newClusterData.pincode?clusterType[1]:clusterType[1]
      state.clusterData = newClusterData;
      state.selectedIds = action.payload.results.facilities 
      state.loading = false;
    },
    [getCluster.pending]: (state) => {
      state.loading = true;
    },
    [getCluster.rejected]: (state) => {
      state.clusterData = [];
      state.loading = false;
    },
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
