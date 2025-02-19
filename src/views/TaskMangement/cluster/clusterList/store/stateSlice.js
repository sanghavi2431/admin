import { createSlice } from "@reduxjs/toolkit";
import { deleteCluster } from "@/services/taskManagement/clusterService";

export const delete_cluster = async (data) => {
  const response = await deleteCluster(data);
  return response.data;
};

const stateSlice = createSlice({
  name: "cluster/state",
  initialState: {
    deleteConfirmation: false,
    selectedCluster: ""
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSelectedCluster: (state, action) => {
      state.selectedCluster = action.payload;
    }
  },
});

export const { toggleDeleteConfirmation, setSelectedCluster } = stateSlice.actions;

export default stateSlice.reducer;
