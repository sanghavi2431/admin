import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchSubscription,
  deleteSubscriptions,
  deleteBulkSubscriptions,
} from "@/services/subscriptionServices";

export const getSubscription = createAsyncThunk(
  "getSubscription/List",
  async (data) => {
    const response = await fetchSubscription(data);
    return response.data.results;
  }
);

export const deleteSubscription = async (data) => {
  const response = await deleteSubscriptions(data);
  return response.data;
};

export const deleteBulkSubscription = async (data) => {
  const response = await deleteBulkSubscriptions(data);
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
  name: "subscription/list",
  initialState: {
    loading: false,
    subscriptionList: [],
    tableData: initialTableData,
    deleteConfirmation: false,
    bulkdeleteConfirmation: false,
    sortedColumn: () => {},
    selectedSubscription: "",
    bulkDeleteButton: true,
  },
  reducers: {
    updateSubscriptionList: (state, action) => {
      state.subscriptionList = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    },
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    toggleBulkDeleteConfirmation: (state, action) => {
      state.bulkdeleteConfirmation = action.payload;
    }, 
    setSelectedSubscription: (state, action) => {
      state.selectedSubscription = action.payload;
    },
    setBulkDeleteButton: (state, action) => {
      state.bulkDeleteButton = action.payload;
    },
  },
  extraReducers: {
    [getSubscription.fulfilled]: (state, action) => {
      state.subscriptionList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getSubscription.pending]: (state) => {
      state.loading = true;
    },
    [getSubscription.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const {
  setTableData,
  toggleDeleteConfirmation,
  setSortedColumn,
  toggleBulkDeleteConfirmation,
  setSelectedSubscription,
  setBulkDeleteButton,
} = dataSlice.actions;

export default dataSlice.reducer;
