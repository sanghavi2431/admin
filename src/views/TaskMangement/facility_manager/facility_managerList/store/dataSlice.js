import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllFacilityManager } from "@/services/taskManagement/facilityManagerService";

export const getFacilityManager = createAsyncThunk("getFacilityManager/List", async (data) => {
  const response = await getAllFacilityManager(data);
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
  name: "facility_managerList/list",
  initialState: {
    loading: false,
    facility_managerList: [],
    tableData: initialTableData,
    sortedColumn: () => {}
    },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    }
    
  },
  extraReducers: {
    [getFacilityManager.fulfilled]: (state, action) => {
      state.facility_managerList = action.payload.data;
      state.tableData.total = +action.payload.total;
      state.loading = false;
    },
    [getFacilityManager.pending]: (state) => {
      state.loading = true;
    },
    [getFacilityManager.rejected]: (state) => {
      state.loading = false;
      state.tableData.total = 0;
      state.facility_managerList = []
    }
  },
});

export const { setTableData, setSortedColumn} = dataSlice.actions;

export default dataSlice.reducer;
