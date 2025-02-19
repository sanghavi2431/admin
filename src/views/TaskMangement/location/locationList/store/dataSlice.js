import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLocations } from "@/services/taskManagement/locationService";

export const getLocation = createAsyncThunk("getLocation/List", async (data) => {
  const response = await fetchLocations(data);
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
  name: "location/list",
  initialState: {
    loading: false,
    locationList: [],
    clientId: "",
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
    [getLocation.fulfilled]: (state, action) => {
      state.locationList = action.payload.locations;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getLocation.pending]: (state) => {
      state.loading = true;
    },
    [getLocation.rejected]: (state) => {
      state.loading = false;
      state.tableData.total = 0;
      state.locationList = []
    },
  },
});

export const { setTableData, setSortedColumn,setClientId} = dataSlice.actions;

export default dataSlice.reducer;
