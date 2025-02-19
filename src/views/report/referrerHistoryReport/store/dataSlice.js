import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOwnerWise_History } from "@/services/ownerWiseHistoryService";
import { export_excel } from "@/services/ownerHistoryService";
export const getOwnerWiseHistory = createAsyncThunk(
  "getOwnerWiseHistory/List",
  async (data) => {
    const response = await getOwnerWise_History(data);
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
  filterType: [],
};
const dataSlice = createSlice({
  name: "ownerWiseHistoryReport/list",
  initialState: {
    loading: false,
    ownerWiseHistoryList: [],
    tableData: initialTableData,
    sortedColumn: () => {},
    dialogConfirmation: false,
    exportConfirmation: false,
  },
  reducers: {
    updateUsersList: (state, action) => {
      state.ownerWiseHistoryList = action.payload;
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
    [getOwnerWiseHistory.fulfilled]: (state, action) => {
      state.ownerWiseHistoryList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getOwnerWiseHistory.pending]: (state) => {
      state.loading = true;
    },
    [getOwnerWiseHistory.rejected]: (state) => {
      state.loading = false;
      state.ownerWiseHistoryList = [];
      state.tableData.total = 0;
    },
  },
});

export const {
  setTableData,
  setSortedColumn,
  updateUsersList,
  toggleDialogConfirmation,
  setSelectedTransactionId,
  updateTransactionDetail,
  toggleExportConfirmation,
} = dataSlice.actions;

export default dataSlice.reducer;
