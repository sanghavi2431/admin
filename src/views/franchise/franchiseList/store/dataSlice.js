import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFranchise } from "@/services/franchiseService";
import { deleteFranchise } from "@/services/franchiseService";
export const getFranchise = createAsyncThunk(
  "getFranchise/List",
  async (data) => {
    const response = await fetchFranchise(data);
    return response.data.results;
  }
);
export const delete_Franchise = async (data) => {
  const response = await deleteFranchise(data);
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
  name: "franchise/list",
  initialState: {
    loading: false,
    franchiseList: [],
    tableData: initialTableData,
    sortedColumn: () => {},
    deleteConfirmation: false,
    bulkUploadConfirmation: false,
    selectedFranchise: "",
  },
  reducers: {
    updateUsersList: (state, action) => {
      state.franchiseList = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    },
    toggleBulkUploadConfirmation: (state, action) => {
      state.bulkUploadConfirmation = action.payload;
    },
    setSelectedFranchise: (state, action) => {
      state.selectedFranchise = action.payload;
    },
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
  },
  extraReducers: {
    [getFranchise.fulfilled]: (state, action) => {
      state.franchiseList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getFranchise.pending]: (state) => {
      state.loading = true;
    },
    [getFranchise.rejected]: (state) => {
      state.loading = false;
      state.tableData.total = 0;
      state.franchiseList = [];


    },
  },
});

export const {
  setTableData,
  toggleDeleteConfirmation,
  setSortedColumn,
  setSelectedFranchise,
  toggleBulkUploadConfirmation,
} = dataSlice.actions;

export default dataSlice.reducer;
