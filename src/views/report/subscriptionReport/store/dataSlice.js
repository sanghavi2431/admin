import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSubscriptionReport } from "@/services/subscriptionReportService";
import { export_excel } from "@/services/ownerHistoryService";
export const get_Subscription_Report = createAsyncThunk(
  "getSubscriptionReport/List",
  async (data) => {
    const response = await getSubscriptionReport(data);
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
      column: "subscription",
      value: "1",
    },
  ],
};
const dataSlice = createSlice({
  name: "subscriptionReport/list",
  initialState: {
    loading: false,
    subscriptionReportList: [],
    tableData: initialTableData,
    sortedColumn: () => {},
    dialogConfirmation: false,
    subscriptionType: "Paid",
    exportConfirmation: false,
  },
  reducers: {
    updateUsersList: (state, action) => {
      state.subscriptionReportList = action.payload;
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
    setSubscriptionType: (state, action) => {
      state.subscriptionType = action.payload;
    },
    toggleExportConfirmation: (state, action) => {
      state.exportConfirmation = action.payload;
    },
  },
  extraReducers: {
    [get_Subscription_Report.fulfilled]: (state, action) => {
      state.subscriptionReportList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [get_Subscription_Report.pending]: (state) => {
      state.loading = true;
    },
    [get_Subscription_Report.rejected]: (state) => {
      state.loading = false;
      state.subscriptionReportList = [];
      state.tableData.total = 0;
    },
  },
});

export const {
  setTableData,
  toggleExportConfirmation,
  setSortedColumn,
  updateUsersList,
  toggleDialogConfirmation,
  setSelectedTransactionId,
  updateTransactionDetail,
  setSubscriptionType,
} = dataSlice.actions;

export default dataSlice.reducer;
