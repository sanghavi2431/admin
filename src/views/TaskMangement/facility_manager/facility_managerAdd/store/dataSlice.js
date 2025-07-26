import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { addFacilityManager } from "@/services/taskManagement/facilityManagerService";
import { getRolebyId, update_role } from "@/services/taskManagement/rolesService";

export const insert_facilityManager = async (data) => {
  const response = await addFacilityManager(data);
  return response.data;
};
export const getRole = createAsyncThunk("getRole/Edit", async (data) => {
  const response = await getRolebyId(data);
  return response.data;
});

const dataSlice = createSlice({
  name: "supervisor/add",
  initialState: {
    loading: false,
    buttonType: "",
    exitConfirmation: false,
    roleData: [],
    roleAccessObj:{}
  },
  reducers: {
    setButtonType: (state, action) => {
      state.buttonType = action.payload;
    },
    toggleExitConfirmation: (state, action) => {
      state.exitConfirmation = action.payload;
    },
  },
  extraReducers: {
    [getRole.fulfilled]: (state, action) => {

      let newRoleData=cloneDeep(action.payload.results)
      let permissions=action.payload.results.permissions?JSON.parse(action.payload.results.permissions):{}
      newRoleData.isLoodiscovery= permissions?.isLoodiscovery?{ label: "YES", value: true }:{ label: "NO", value: false }
      newRoleData.defaultPageMapping= permissions?.defaultPageMapping
      newRoleData.showOnChangeModule= permissions?.showOnChangeModule?{ label: "YES", value: true }:{ label: "NO", value: false }
      newRoleData.selectedModule= permissions?.selectedModule!=undefined?permissions?.selectedModule?{ label: "Task Management", value: 1 }: { label: "Loo Discovery", value: 0 }:""

      state.roleData = newRoleData;
      state.roleAccessObj = action.payload.results.rolesAccess ? JSON.parse(action.payload.results.rolesAccess) :{};
      state.loading = false;
    },
    [getRole.pending]: (state) => {
      state.loading = true;
    },
    [getRole.rejected]: (state) => {
      state.roleData = [];
      state.loading = false;
    },
  },
});

export const { setButtonType,toggleExitConfirmation } = dataSlice.actions;

export default dataSlice.reducer;
