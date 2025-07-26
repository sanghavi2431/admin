import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getClientId } from "@/services/taskManagement/clientService";

export const getClient_id = createAsyncThunk("getClient_id/List", async (data) => {
  const response = await getClientId(data);
  return response.data.results;
});
export const initialState = {
  avatar: "",
  userName: "",
  email: "",
  authority: [],
  test: "",
  roleId: "",
  clientId:  "",
  userId:"",
  module: [
    { label: "Loo Discovery", value: 0 },
    { label: "Task Management", value: 1 },
    { label: "Store", value: 2 },
  ],
  loo_discovery: true,
  selectedModule: "",
  facilityMappingData:"",
  sideBarDisabled:false,
  isOnboardComplete: false,
  isFirstTime:false,
  isPlanExpired: false,
  isFreeTrial: true,
  expiryDate: "",
  paymentPlanDialog:false,
  freeTrialInfoDialog: false,
  rolesAccess:{},
  defaultPageMapping:"",
  showOnChangeModule: true,
  totalCoins: 0,
  progressState: {
    // "client": false,
    // "location": false,
    // "block": false,
    // "facility": false,
    // "cluster": false,
    // "shift": false,
    // "task_template": false,
    // "templateMap": false,
    // "supervisor": false,
    // "janitor": false,
    // "iotDevice": false,
  } 
};

export const userSlice = createSlice({
  name: "auth/user",
  initialState,
  reducers: {
    setUser: (_, action) => action.payload,
    userLoggedOut: () => initialState,
    setRoleId: (state, action) => {
      state.roleId = action.payload;
    },
    setClientId: (state, action) => {
      state.clientId = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setemail: (state, action) => {
      state.email = action.payload;
    },
    setLooDiscovery: (state, action) => {
      state.loo_discovery = action.payload;
    },
    setSelectedModule: (state, action) => {
      state.selectedModule = action.payload;
    },
    setFacilityMappingData: (state, action) => {
      state.facilityMappingData = action.payload;
    },
    setSideBarDisabled: (state, action) => {
      state.sideBarDisabled = action.payload;
    },
    setFirstTime: (state, action) => {
      state.isFirstTime = action.payload;
    },
    setIsPlanExpired: (state, action) => {
      state.isPlanExpired = action.payload;
    },
    setIsFreeTrial: (state, action) => {
      state.isFreeTrial = action.payload;
    },
    setExpiryDate: (state, action) => {
      state.expiryDate = action.payload;
    },
    setPaymentDialog: (state, action) => {
      state.paymentPlanDialog = action.payload;
    },
    setFreeTrialInfoDialog: (state, action) => {
      state.freeTrialInfoDialog = action.payload;
    },
    setRoleAccess: (state, action) => {
      state.rolesAccess = action.payload;
    },
    setDefaultPageMapping: (state, action) => {
      state.defaultPageMapping = action.payload;
    },
    setShowOnChangeModule: (state, action) => {
      state.showOnChangeModule = action.payload;
    },
    setTotalCoins: (state, action) => {
      state.totalCoins = action.payload;
    },
    setProgressState: (state, action) => {
      const { payload } = action;
      Object.keys(payload).forEach(key => {
        state.progressState[key] = payload[key];
      });
    },
  },
  extraReducers:{
    [getClient_id.fulfilled]: (state, action) => {
      state.clientId = action.payload.client;
      state.isOnboardComplete = action.payload.isOnboardComplete;
      state.progressState = action.payload.checkpoints;
    },
    [getClient_id.pending]: (state) => {
    },
    [getClient_id.rejected]: (state) => {

    }
  }
});

export const {
  setUser,
  userLoggedOut,
  setRoleId,
  setUserId,
  setClientId,
  setUserName,
  setemail,
  setLooDiscovery,
  setSelectedModule,
  setFacilityMappingData,
  setSideBarDisabled,
  setFirstTime,
  setIsPlanExpired,
  setIsFreeTrial,
  setExpiryDate,
  setPaymentDialog,
  setFreeTrialInfoDialog,
  setRoleAccess,
  setDefaultPageMapping,
  setShowOnChangeModule,
  setTotalCoins,
  setProgressState
} = userSlice.actions;

export default userSlice.reducer;
