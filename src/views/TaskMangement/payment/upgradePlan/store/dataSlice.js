import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { fetchAddonIOTData, getdisplayAddons } from "@/services/taskManagement/addOnService";
import { fetchClients } from "@/services/taskManagement/clientService";
import { getdisplayPlans, getpurchasedPlanIdbyClientId } from "@/services/taskManagement/plansService";

export const getdisplay_Addons = createAsyncThunk("getdisplay_Addons/upgradePlan", async (data) => {
  const response = await getdisplayAddons(data);
  return response.data.results;
});
export const getpurchasedPlanIdby_ClientId = createAsyncThunk("getpurchasedPlanIdbyClientId/upgradePlan", async (data) => {
  const response = await getpurchasedPlanIdbyClientId(data);
  return response.data.results;
});

const dataSlice = createSlice({
  name: "getdisplay/upgradePlan",
  initialState: {
    purchasedPlan:"",
    addOnOptions:[],
    AddOnAmt:"",
    isLogin:false
    },
  reducers: {
    setCardsDetails:(state,action)=>{
      state.cardsDetails=action.payload
    },
    setAddonOption:(state,action)=>{
      state.addOnOptions=action.payload
    },
    setisLogin:(state,action)=>{
      state.isLogin=action.payload
    }
    
  },
  extraReducers: {
    [getpurchasedPlanIdby_ClientId.fulfilled]: (state, action) => {
    state.purchasedPlan=action.payload.plan_id
    },
    [getpurchasedPlanIdby_ClientId.pending]: (state) => {

    },
    [getpurchasedPlanIdby_ClientId.rejected]: (state) => {
      state.purchasedPlan=[]
    },
    [getdisplay_Addons.fulfilled]: (state, action) => {
      let newaddOnOptions=cloneDeep(action.payload)
      let arr=newaddOnOptions.filter((option)=>!option.isLogin)
      newaddOnOptions.map((option)=>{
        if(option.isLogin){
          state.isLogin=true
          state.AddOnAmt=option.addOnAmt
          
        }
      })
    state.addOnOptions=arr
    },
    [getdisplay_Addons.pending]: (state) => {

    },
    [getdisplay_Addons.rejected]: (state) => {
      state.addOnOptions=[]
      state.isLogin=false
          state.AddOnAmt=0
    },
  },
});

export const { setCardsDetails, setAddonOption} = dataSlice.actions;

export default dataSlice.reducer;
