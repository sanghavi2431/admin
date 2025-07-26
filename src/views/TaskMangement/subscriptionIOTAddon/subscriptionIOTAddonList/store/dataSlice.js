import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAddonIOTData } from "@/services/taskManagement/addOnService";

export const getallSubscribeIot = createAsyncThunk("getallSubscribeIot/List", async (data) => {
  const response = await fetchAddonIOTData(data);
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
  name: "getallSubscribeIot/list",
  initialState: {
    loading: false,
    subscribedIOTList: [],
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
    
  },
  extraReducers: {
    [getallSubscribeIot.fulfilled]: (state, action) => {
      state.subscribedIOTList = action.payload.addOn;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getallSubscribeIot.pending]: (state) => {
      state.loading = true;
    },
    [getallSubscribeIot.rejected]: (state) => {
      state.loading = false;
      state.tableData.total = 0;
      state.subscribedIOTList = []
    },
  },
});

export const { setTableData, setSortedColumn} = dataSlice.actions;

export default dataSlice.reducer;
