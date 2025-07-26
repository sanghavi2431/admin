import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteBlog, fetchBlogs } from "@/services/blogService";

export const getActiveBlogs = createAsyncThunk(
  "getActiveBlogs/List",
  async (data) => {
    const response = await fetchBlogs(data);
    return response.data.results;
  }
);

export const delete_activeBlog = async (data) => {
  const response = await deleteBlog(data);
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
  name: "ActiveBlogs/list",
  initialState: {
    loading: false,
    activeBlogsList: [],
    tableData: initialTableData,
    deleteConfirmation: false,
    bulkdeleteConfirmation: false,
    sortedColumn: () => {},
    selectedActiveBlog: ""
  },
  reducers: {
    updateUsersList: (state, action) => {
      state.activeBlogsList = action.payload;
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
    setSelectedActiveBlog: (state, action) => {
      state.selectedActiveBlog = action.payload;
    }
  },
  extraReducers: {
    [getActiveBlogs.fulfilled]: (state, action) => {
      state.activeBlogsList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getActiveBlogs.pending]: (state) => {
      state.loading = true;
    },
    [getActiveBlogs.rejected]: (state) => {
      state.loading = false;
      state.activeBlogsList = [];
      state.tableData.total = 0;
    },
  },
});

export const {
  setTableData,
  toggleDeleteConfirmation,
  setSortedColumn,
  toggleBulkDeleteConfirmation,
  setSelectedActiveBlog,
  setBulkDeleteButton,
} = dataSlice.actions;

export default dataSlice.reducer;
