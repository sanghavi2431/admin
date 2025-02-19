import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers, deleteUser, deleteBulkUsers } from "@/services/userService";
import { fetchClients } from "@/services/taskManagement/clientService";

export const getClients = createAsyncThunk("getClients/List", async (data) => {
  const response = await fetchClients(data);
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
  name: "clients/list",
  initialState: {
    loading: false,
    clientList: [],
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
    [getClients.fulfilled]: (state, action) => {
      state.clientList = action.payload.clients;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getClients.pending]: (state) => {
      state.loading = true;
    },
    [getClients.rejected]: (state) => {
      state.loading = false;
      state.tableData.total = 0;
      state.clientList = []
    },
  },
});

export const { setTableData, setSortedColumn} = dataSlice.actions;

export default dataSlice.reducer;
