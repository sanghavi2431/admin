import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getVoucherUser,
  deactivate_voucher,
  getVoucherUsage,
} from "@/services/voucherService";
import { export_excel } from "@/services/ownerHistoryService";

export const getVoucherUses = createAsyncThunk(
  "getVoucherUses/List",
  async (data) => {
    const response = await getVoucherUser(data);
    return response.data.results;
  }
);
export const getVoucher_Usage = createAsyncThunk(
  "getVoucher_Usage/List",
  async (data) => {
    const response = await getVoucherUsage(data);
    return response.data.results;
  }
);
export const deactivateVoucher = async (data) => {
  const response = await deactivate_voucher(data);
  return response.data;
};
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
  id: "",
  voucher_code_id: "",
  filterType: [],
};
const dataSlice = createSlice({
  name: "voucherUses/list",
  initialState: {
    loading: false,
    voucherUsesList: [],
    tableData: initialTableData,
    sortedColumn: () => {},
    DeleteConfirmation: false,
    selectedVoucherId: "",
    selectedUserId: "",
    voucherUsageList: [],
    reportType: 0,
    exportConfirmation: false,
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    },

    setInitialData: (state, action) => {
      state.voucherUsesList = [];
    },
    toggleDeleteConfirmation: (state, action) => {
      state.DeleteConfirmation = action.payload;
    },
    setSelectedVoucherId: (state, action) => {
      state.selectedVoucherId = action.payload;
    },
    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload;
    },
    setVoucherUsesList: (state, action) => {
      state.voucherUsesList = action.payload;
    },
    setReportType: (state, action) => {
      state.reportType = action.payload;
    },
    toggleExportConfirmation: (state, action) => {
      state.exportConfirmation = action.payload;
    },
  },
  extraReducers: {
    [getVoucherUses.fulfilled]: (state, action) => {
      state.voucherUsesList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getVoucherUses.pending]: (state) => {
      state.loading = true;
    },
    [getVoucherUses.rejected]: (state) => {
      state.voucherUsesList = [];
      state.loading = false;
    },
    [getVoucher_Usage.fulfilled]: (state, action) => {
      state.voucherUsageList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getVoucher_Usage.pending]: (state) => {
      state.loading = true;
    },
    [getVoucher_Usage.rejected]: (state) => {
      state.voucherUsageList = [];
      state.loading = false;
    },
  },
});

export const {
  setReportType,
  toggleExportConfirmation,
  setTableData,
  setSortedColumn,
  setInitialData,
  toggleDeleteConfirmation,
  setSelectedVoucherId,
  setSelectedUserId,
  setVoucherUsesList,
} = dataSlice.actions;

export default dataSlice.reducer;
