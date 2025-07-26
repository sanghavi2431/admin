import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteOffer, fetchAllOffer } from "@/services/hostOfferService";
import { fetchUsers, deleteUser, deleteBulkUsers } from "@/services/userService";

export const getHostOffers = createAsyncThunk("hostOfferList/List", async (data) => {
  const response = await fetchAllOffer(data);
  return response.data.results;
});

export const deletedHostOffer = async (data) => {
  const response = await deleteOffer(data);
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
  name: "hostOfferList/list",
  initialState: {
    loading: false,
    hostOfferList: [],
    tableData: initialTableData,
    deleteConfirmation: false,
    sortedColumn: () => {},
    selectedHostOffer: "",
  },
  reducers: {
    updateUsersList: (state, action) => {
      state.hostOfferList = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    },
    setSelectedHostOffer: (state, action) => {
      state.selectedHostOffer = action.payload;
    },
  },
  extraReducers: {
    [getHostOffers.fulfilled]: (state, action) => {
      state.hostOfferList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getHostOffers.pending]: (state) => {
      state.loading = true;
    },
    [getHostOffers.rejected]: (state) => {
      state.loading = false;
      state.hostOfferList = [];
      state.tableData.total = 0;
  },
}});

export const {
  updateWoloosList,
  setTableData,
  toggleDeleteConfirmation,
  setSortedColumn,
  toggleBulkDeleteConfirmation,
  setSelectedHostOffer,
  setBulkDeleteButton,
} = dataSlice.actions;

export default dataSlice.reducer;
