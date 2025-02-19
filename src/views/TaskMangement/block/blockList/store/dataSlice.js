import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBlocks } from "@/services/taskManagement/blockService";

export const getBlock = createAsyncThunk("getBlock/List", async (data) => {
  const response = await fetchBlocks(data);
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
  name: "block/list",
  initialState: {
    loading: false,
    blockList: [],
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
    [getBlock.fulfilled]: (state, action) => {
      state.blockList = action.payload.blocks;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getBlock.pending]: (state) => {
      state.loading = true;
    },
    [getBlock.rejected]: (state) => {
      state.loading = false;
      state.tableData.total = 0;
      state.blockList = []
    },
  },
});

export const { setTableData, setSortedColumn,setClientId} = dataSlice.actions;

export default dataSlice.reducer;
