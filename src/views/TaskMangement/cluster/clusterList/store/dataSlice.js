import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCluster } from "@/services/taskManagement/clusterService";

export const getCluster = createAsyncThunk("getCluster/List", async (data) => {
  const response = await fetchCluster(data);
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
  name: "Cluster/list",
  initialState: {
    loading: false,
    clusterList: [],
    clientId:"",
    tableData: initialTableData,
    sortedColumn: () => {}
    },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    },
    setClientId: (state, action) => {
      state.clientId = action.payload;
    },
    
  },
  extraReducers: {
    [getCluster.fulfilled]: (state, action) => {
      state.clusterList = action.payload.cluster;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getCluster.pending]: (state) => {
      state.loading = true;
    },
    [getCluster.rejected]: (state) => {
      state.loading = false;
      state.tableData.total = 0;
      state.clusterList = []
    },
  },
});

export const { setTableData, setSortedColumn,setClientId} = dataSlice.actions;

export default dataSlice.reducer;
