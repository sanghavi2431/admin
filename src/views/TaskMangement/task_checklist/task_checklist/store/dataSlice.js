import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTaskCheckList } from "@/services/taskManagement/taskChecklist";

export const get_taskchecklist = createAsyncThunk("get_taskchecklist/List", async (data) => {
  const response = await fetchTaskCheckList(data);
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
  name: "taskchecklist/list",
  initialState: {
    loading: false,
    taskchecklist: [],
    tableData: initialTableData,
    sortedColumn: () => {},
    clientId: ""
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
    [get_taskchecklist.fulfilled]: (state, action) => {
      state.taskchecklist = action.payload.tasks;
      state.tableData.total = action.payload.count;
      state.loading = false;
    },
    [get_taskchecklist.pending]: (state) => {
      state.loading = true;
    },
    [get_taskchecklist.rejected]: (state) => {
      state.loading = false;
      state.tableData.total = 0;
      state.taskchecklist = []
    },
  },
});

export const { setTableData, setSortedColumn,setClientId} = dataSlice.actions;

export default dataSlice.reducer;
