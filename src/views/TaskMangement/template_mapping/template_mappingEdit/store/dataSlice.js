import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import dayjs from "dayjs";
import { get_TemplateMapbyId, updateTemplate_Mapping } from "@/services/taskManagement/templateMapService";
import { getSupervisorById, updateSupervisor } from "@/services/taskManagement/supervisorService";

export const getTemplateMapbyId = createAsyncThunk("getTemplateMapbyId/Edit", async (data) => {
  const response = await get_TemplateMapbyId(data);
  return response.data;
});

export const update_templateMapped = async (data) => {
  const response = await updateTemplate_Mapping(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "TemplateMap/edit",
  initialState: {
    loading: false,
    mappedTempData: [],
  },
  reducers: {},
  extraReducers: {
    [getTemplateMapbyId.fulfilled]: (state, action) => {
      let newTempMapData=cloneDeep(action?.payload?.results)
let start_time=new Date()
start_time.setHours(new Date(newTempMapData?.start_time)?.getHours())
start_time.setMinutes(new Date(newTempMapData?.start_time)?.getMinutes())
let end_time=new Date()
end_time.setHours(new Date(newTempMapData?.end_time)?.getHours())
end_time.setMinutes(new Date(newTempMapData?.end_time)?.getMinutes())
      newTempMapData.end_time=end_time

      newTempMapData.start_time=start_time
      state.mappedTempData = newTempMapData;
      state.loading = false;
    },
    [getTemplateMapbyId.pending]: (state) => {
      state.loading = true;
    },
    [getTemplateMapbyId.rejected]: (state) => {
      state.mappedTempData = [];
      state.loading = false;
    },
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
