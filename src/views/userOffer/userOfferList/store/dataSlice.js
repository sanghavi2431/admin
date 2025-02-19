import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCorporate,
  deleteCorporate,
  deleteBulkCorporates,
} from "@/services/corporateService";
import { fetchUserOffers,deleteUserOffer } from "@/services/userOffers";

export const getUserOffer = createAsyncThunk(
  "getUserOffer/List",
  async (data) => {
    const response = await fetchUserOffers(data);
    return response.data.results;
  }
);

export const delete_UserOffer = async (data) => {
  const response = await deleteUserOffer(data);
  return response.data;
};

export const deleteBulkUserOffer = async (data) => {
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
  name: "userOffer/list",
  initialState: {
    loading: false,
    userOfferList: [],
    tableData: initialTableData,
    deleteConfirmation: false,
    bulkdeleteConfirmation: false,
    sortedColumn: () => {},
    selectedUserOffer: "",
    bulkDeleteButton: true,
  },
  reducers: {
    updateUsersList: (state, action) => {
      state.userOfferList = action.payload;
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
    setSelectedUserOffer: (state, action) => {
      state.selectedUserOffer = action.payload;
    },
    setBulkDeleteButton: (state, action) => {
      state.bulkDeleteButton = action.payload;
    },
  },
  extraReducers: {
    [getUserOffer.fulfilled]: (state, action) => {
      state.userOfferList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getUserOffer.pending]: (state) => {
      state.loading = true;
    },
    [getUserOffer.rejected]: (state) => {
      state.loading = false;
      state.tableData.total = 0;
      state.userOfferList = [];
    },
  },
});

export const {
  setTableData,
  toggleDeleteConfirmation,
  setSortedColumn,
  toggleBulkDeleteConfirmation,
  setSelectedUserOffer,
  setBulkDeleteButton,
} = dataSlice.actions;

export default dataSlice.reducer;
