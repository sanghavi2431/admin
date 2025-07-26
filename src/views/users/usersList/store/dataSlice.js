import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers, deleteUser, deleteBulkUsers } from "@/services/userService";

export const getUsers = createAsyncThunk("getUsers/List", async (data) => {
  const response = await fetchUsers(data);
  return response.data.results;
});

export const deletedUser = async (data) => {
  const response = await deleteUser(data);
  return response.data;
};
export const deleteBulkUser = async (data) => {
  const response = await deleteBulkUsers(data);
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
  name: "users/list",
  initialState: {
    loading: false,
    usersList: [],
    tableData: initialTableData,
    deleteConfirmation: false,
    bulkdeleteConfirmation: false,
    sortedColumn: () => {},
    selectedUser: "",
    bulkDeleteButton: true,
  },
  reducers: {
    updateUsersList: (state, action) => {
      state.usersList = action.payload;
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

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setBulkDeleteButton: (state, action) => {
      state.bulkDeleteButton = action.payload;
    },
  },
  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {
      state.usersList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const {
  updateWoloosList,
  setTableData,
  toggleDeleteConfirmation,
  setSortedColumn,
  toggleBulkDeleteConfirmation,
  setSelectedUser,
  setBulkDeleteButton,
} = dataSlice.actions;

export default dataSlice.reducer;
