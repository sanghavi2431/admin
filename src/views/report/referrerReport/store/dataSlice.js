import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOwner_History, export_excel } from "@/services/ownerHistoryService";

export const getOwnerHistory = createAsyncThunk(
  "getOwnerHistory/List",
  async (data) => {
    const response = await getOwner_History(data);
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
  name: "ownerHistoryReport/list",
  initialState: {
    loading: false,
    ownerHistoryList: [],
    tableData: initialTableData,
    sortedColumn: () => {},
    dialogConfirmation: false,
    exportConfirmation: false,
  },
  reducers: {
    updateUsersList: (state, action) => {
      state.ownerHistoryList = action.payload;
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
    [getOwnerHistory.fulfilled]: (state, action) => {
      state.ownerHistoryList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getOwnerHistory.pending]: (state) => {
      state.loading = true;
    },
    [getOwnerHistory.rejected]: (state) => {
      state.loading = false;
      state.ownerHistoryList = [];
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
