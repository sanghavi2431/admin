import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers, deleteUser, deleteBulkUsers } from "@/services/userService";
import { fetchClients } from "@/services/taskManagement/clientService";
import { fetchOrders } from "@/services/taskManagement/plansService";

export const getOrders = createAsyncThunk("getOrders/List", async (data) => {
  const response = await fetchOrders(data);
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
  name: "orders/list",
  initialState: {
    loading: false,
    orderList: [],
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
    [getOrders.fulfilled]: (state, action) => {
      state.orderList = action.payload.ordersList;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getOrders.pending]: (state) => {
      state.loading = true;
    },
    [getOrders.rejected]: (state) => {
      state.loading = false;
      state.tableData.total = 0;
      state.orderList = []
    },
  },
});

export const { setTableData, setSortedColumn} = dataSlice.actions;

export default dataSlice.reducer;
