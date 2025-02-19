import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPlans } from "@/services/taskManagement/plansService";

export const getallPlans = createAsyncThunk("getallPlans/List", async (data) => {
  const response = await fetchPlans(data);
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
  name: "getallPlans/list",
  initialState: {
    loading: false,
    planList: [],
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
    [getallPlans.fulfilled]: (state, action) => {
      state.planList = action.payload.plans;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getallPlans.pending]: (state) => {
      state.loading = true;
    },
    [getallPlans.rejected]: (state) => {
      state.loading = false;
      state.tableData.total = 0;
      state.planList = []
    },
  },
});

export const { setTableData, setSortedColumn} = dataSlice.actions;

export default dataSlice.reducer;
