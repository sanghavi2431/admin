import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCorporate,
  deleteCorporate,
  deleteBulkCorporates,
} from "@/services/corporateService";

export const getCorporates = createAsyncThunk(
  "getCorporates/List",
  async (data) => {
    const response = await fetchCorporate(data);
    return response.data.results;
  }
);

export const deletedCorporate = async (data) => {
  const response = await deleteCorporate(data);
  return response.data;
};

export const deleteBulkCorporate = async (data) => {
  const response = await deleteBulkCorporates(data);
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
};
const dataSlice = createSlice({
  name: "corporates/list",
  initialState: {
    loading: false,
    corporatesList: [],
    tableData: initialTableData,
    deleteConfirmation: false,
    bulkdeleteConfirmation: false,
    sortedColumn: () => {},
    selectedCorporate: "",
    bulkDeleteButton: true,
  },
  reducers: {
    updateUsersList: (state, action) => {
      state.corporatesList = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    toggleBulkDeleteConfirmation: (state, action) => {
      state.bulkdeleteConfirmation = action.payload;
    },
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    },
    setSelectedCorporate: (state, action) => {
      state.selectedCorporate = action.payload;
    },
    setBulkDeleteButton: (state, action) => {
      state.bulkDeleteButton = action.payload;
    },
  },
  extraReducers: {
    [getCorporates.fulfilled]: (state, action) => {
      state.corporatesList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getCorporates.pending]: (state) => {
      state.loading = true;
    },
    [getCorporates.rejected]: (state) => {
      state.loading = false;
      state.corporatesList = [];
      state.tableData.total = 0;
    },
  },
});

export const {
  setTableData,
  toggleDeleteConfirmation,
  setSortedColumn,
  toggleBulkDeleteConfirmation,
  setSelectedCorporate,
  setBulkDeleteButton,
} = dataSlice.actions;

export default dataSlice.reducer;
