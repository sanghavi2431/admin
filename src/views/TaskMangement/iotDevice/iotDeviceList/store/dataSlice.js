import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAlliotDevice } from "@/services/taskManagement/iotDevice";

export const getIOTDevice = createAsyncThunk("getIOTDevice/List", async (data) => {
  const response = await getAlliotDevice(data);
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
  name: "IOTDevice/list",
  initialState: {
    loading: false,
    IOTDeviceList: [],
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
    [getIOTDevice.fulfilled]: (state, action) => {
      state.IOTDeviceList = action.payload.mappings;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getIOTDevice.pending]: (state) => {
      state.loading = true;
    },
    [getIOTDevice.rejected]: (state) => {
      state.loading = false;
      state.tableData.total = 0;
      state.IOTDeviceList = []
    },
  },
});

export const { setTableData, setSortedColumn,setClientId} = dataSlice.actions;

export default dataSlice.reducer;
