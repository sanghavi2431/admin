import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteBlogSubCategory, fetchAllSubCategories } from "@/services/blogService";


export const getblogSubCategory = createAsyncThunk(
  "getblogSubCategory/List",
  async (data) => {
    const response = await fetchAllSubCategories(data);
    return response.data.results;
  }
);

export const delete_Subcategory = async (data) => {
  const response = await deleteBlogSubCategory(data);
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
  name: "blogSubcategory/list",
  initialState: {
    loading: false,
    blogSubCategoryList: [],
    tableData: initialTableData,
    deleteConfirmation: false,
    bulkdeleteConfirmation: false,
    sortedColumn: () => {},
    selectedCategory: "",
    bulkDeleteButton: true,
  },
  reducers: {
    updateUsersList: (state, action) => {
      state.blogSubCategoryList = action.payload;
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
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setBulkDeleteButton: (state, action) => {
      state.bulkDeleteButton = action.payload;
    },
  },
  extraReducers: {
    [getblogSubCategory.fulfilled]: (state, action) => {
      state.blogSubCategoryList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getblogSubCategory.pending]: (state) => {
      state.loading = true;
    },
    [getblogSubCategory.rejected]: (state) => {
      state.loading = false;
      state.blogSubCategoryList = [];
      state.tableData.total = 0;
    },
  },
});

export const {
  setTableData,
  toggleDeleteConfirmation,
  setSortedColumn,
  toggleBulkDeleteConfirmation,
  setSelectedCategory,
  setBulkDeleteButton,
} = dataSlice.actions;

export default dataSlice.reducer;
