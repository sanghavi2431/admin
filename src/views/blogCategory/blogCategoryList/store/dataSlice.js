import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteBlogCategory, fetchAllCategories } from "@/services/blogService";

export const getAllCategories = createAsyncThunk(
  "fetchAllCategories/List",
  async (data) => {
    const response = await fetchAllCategories(data);
    return response.data.results;
  }
);

export const deletedBlogCategory = async (data) => {
  const response = await deleteBlogCategory(data);
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
  name: "blogCategory/list",
  initialState: {
    loading: false,
    blogCategoryList: [],
    tableData: initialTableData,
    deleteConfirmation: false,
    bulkdeleteConfirmation: false,
    sortedColumn: () => {},
    selectedCorporate: ""
  },
  reducers: {
    updateUsersList: (state, action) => {
      state.blogCategoryList = action.payload;
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
    }
  },
  extraReducers: {
    [getAllCategories.fulfilled]: (state, action) => {
      state.blogCategoryList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getAllCategories.pending]: (state) => {
      state.loading = true;
    },
    [getAllCategories.rejected]: (state) => {
      state.loading = false;
      state.blogCategoryList = [];
      state.tableData.total = 0;
    },
  },
});

export const {
  setTableData,
  toggleDeleteConfirmation,
  setSortedColumn,
  toggleBulkDeleteConfirmation,
  setSelectedCorporate
} = dataSlice.actions;

export default dataSlice.reducer;
