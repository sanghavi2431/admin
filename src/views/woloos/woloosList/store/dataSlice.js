import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWoloos, deleteWoloo } from "@/services/wolooService";

export const getWoloos = createAsyncThunk("getWoloos/List", async (data) => {
  const response = await fetchWoloos(data);
  return response.data.results;
});

export const deleteWoloos = async (data) => {
  const response = await deleteWoloo(data);

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
  name: "woloos/list",
  initialState: {
    loading: false,
    woloosList: [],
    tableData: initialTableData,
  },
  reducers: {
    updateWoloosList: (state, action) => {
      state.woloosList = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
  },
  extraReducers: {
    [getWoloos.fulfilled]: (state, action) => {
      state.woloosList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getWoloos.pending]: (state) => {
      state.loading = true;
    },
    [getWoloos.rejected]: (state) => {
      state.woloosList = [];
      state.tableData.total = 0;
      state.loading = false;
    },
  },
});

export const { updateWoloosList, setTableData } = dataSlice.actions;

export default dataSlice.reducer;
