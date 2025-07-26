import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchShifts } from "@/services/taskManagement/shiftService";

export const getShift = createAsyncThunk("getShift/List", async (data) => {
  const response = await fetchShifts(data);
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
  name: "shift/list",
  initialState: {
    loading: false,
    shiftList: [],
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
    [getShift.fulfilled]: (state, action) => {
      state.shiftList = action.payload.shifts;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getShift.pending]: (state) => {
      state.loading = true;
    },
    [getShift.rejected]: (state) => {
      state.loading = false;
      state.tableData.total = 0;
      state.shiftList = []
    },
  },
});

export const { setTableData, setSortedColumn,setClientId} = dataSlice.actions;

export default dataSlice.reducer;
