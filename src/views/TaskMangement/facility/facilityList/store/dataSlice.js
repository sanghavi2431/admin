import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFacility } from "@/services/taskManagement/facilitiesService";

export const getFacility = createAsyncThunk("getFacility/List", async (data) => {
  const response = await fetchFacility(data);
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
  isAll:1
};
const dataSlice = createSlice({
  name: "facility/list",
  initialState: {
    loading: false,
    facilityList: [],
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
    [getFacility.fulfilled]: (state, action) => {
      state.facilityList = action.payload.facilities;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getFacility.pending]: (state) => {
      state.loading = true;
    },
    [getFacility.rejected]: (state) => {
      state.loading = false;
      state.tableData.total = 0;
      state.facilityList = []
    },
  },
});

export const { setTableData, setSortedColumn,setClientId} = dataSlice.actions;

export default dataSlice.reducer;
