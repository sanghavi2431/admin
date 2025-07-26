import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { get_Customer_History } from "@/services/customerHistoryReportService";
import { export_excel } from "@/services/ownerHistoryService";
export const getCustomerHistory = createAsyncThunk(
  "getCustomerHistory/List",
  async (data) => {
    const response = await get_Customer_History(data);
    return response.data.results;
  }
);
export const exportExcel = async (data) => {
  const response = await export_excel(data);
  return response.data;
};
export const initialTableData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: "",
  sort: {
    order: "",
    key: "",
  },
  filterType: [
    {
      type: "string",
      column: "is_gift",
      value: 0,
    },
    {
      type: "date",
      column: "created_at",
      value: [dayjs(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format("YYYY-MM-DD"),dayjs(new Date()).format("YYYY-MM-DD")]
  }
  ],
};
const dataSlice = createSlice({
  name: "customerHistory/list",
  initialState: {
    loading: false,
    customerHistoryList: [],
    tableData: initialTableData,
    sortedColumn: () => {},
    dialogConfirmation: false,
    exportConfirmation: false,
  },
  reducers: {
    updateUsersList: (state, action) => {
      state.customerHistoryList = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    },
    toggleDialogConfirmation: (state, action) => {
      state.dialogConfirmation = action.payload;
    },
    toggleExportConfirmation: (state, action) => {
      state.exportConfirmation = action.payload;
    },
  },
  extraReducers: {
    [getCustomerHistory.fulfilled]: (state, action) => {
      state.customerHistoryList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getCustomerHistory.pending]: (state) => {
      state.loading = true;
    },
    [getCustomerHistory.rejected]: (state) => {
      state.loading = false;
      state.customerHistoryList = [];
      state.tableData.total = 0;
    },
  },
});

export const {
  setTableData,
  setSortedColumn,
  toggleExportConfirmation,
  updateUsersList,
  toggleDialogConfirmation,
  setSelectedTransactionId,
  updateTransactionDetail,
} = dataSlice.actions;

export default dataSlice.reducer;
