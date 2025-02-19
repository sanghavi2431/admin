import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchVoucher,
  deleteVoucher,
  deleteBulkVouchers,
  getDownloadLink,
} from "@/services/voucherService";
import { export_excel } from "@/services/ownerHistoryService";
export const getVoucher = createAsyncThunk("getVoucher/List", async (data) => {
  const response = await fetchVoucher(data);
  return response.data.results;
});

export const deletedVoucher = async (data) => {
  const response = await deleteVoucher(data);
  return response.data;
};
export const exportExcel = async (data) => {
  const response = await export_excel(data);
  return response.data;
};

export const deleteBulkVoucher = async (data) => {
  const response = await deleteBulkVouchers(data);
  return response.data;
};
export const getVoucherDownloadLink = async (data) => {
  const response = await getDownloadLink(data);
  return response.data.results;
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
  name: "voucher/list",
  initialState: {
    loading: false,
    voucherList: [],
    tableData: initialTableData,
    deleteConfirmation: false,
    createPOConfirmation: false,
    bulkdeleteConfirmation: false,
    sortedColumn: () => {},
    selectedVoucher: "",
    bulkDeleteButton: true,
    exportConfirmation: false,
  },
  reducers: {
    updateVoucherList: (state, action) => {
      state.voucherList = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    toggleCreateConfirmation: (state, action) => {
      state.createPOConfirmation = action.payload;
    },
    toggleBulkDeleteConfirmation: (state, action) => {
      state.bulkdeleteConfirmation = action.payload;
    },
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    },
    setSelectedVoucher: (state, action) => {
      state.selectedVoucher = action.payload;
    },
    setBulkDeleteButton: (state, action) => {
      state.bulkDeleteButton = action.payload;
    },
    toggleExportConfirmation: (state, action) => {
      state.exportConfirmation = action.payload;
    },
  },
  extraReducers: {
    [getVoucher.fulfilled]: (state, action) => {
      state.voucherList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getVoucher.pending]: (state) => {
      state.loading = true;
    },
    [getVoucher.rejected]: (state) => {
      state.tableData.total = 0;
      state.voucherList = [];
      state.loading = false;
    },
  },
});

export const {
  setTableData,
  toggleDeleteConfirmation,
  setSortedColumn,
  toggleBulkDeleteConfirmation,
  setSelectedVoucher,
  setBulkDeleteButton,
  toggleCreateConfirmation,
  toggleExportConfirmation,
} = dataSlice.actions;

export default dataSlice.reducer;
