import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTemplate } from "@/services/taskManagement/taskTemplateService";

export const getTemplate = createAsyncThunk("getTemplate/List", async (data) => {
  const response = await fetchTemplate(data);
  return response.data.results;
});

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
  name: "template/list",
  initialState: {
    loading: false,
    templateList: [],
    clientId: "",
    tableData: initialTableData,
    sortedColumn: () => {}
    },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    },
    setClientId: (state, action) => {
      state.clientId = action.payload;
    },
  },
  extraReducers: {
    [getTemplate.fulfilled]: (state, action) => {
      state.templateList = action.payload.templates;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getTemplate.pending]: (state) => {
      state.loading = true;
    },
    [getTemplate.rejected]: (state) => {
      state.loading = false;
      state.tableData.total = 0;
      state.templateList = []
    },
  },
});

export const { setTableData, setSortedColumn,setClientId} = dataSlice.actions;

export default dataSlice.reducer;
