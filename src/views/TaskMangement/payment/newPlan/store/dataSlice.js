import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { getdisplayAddons } from "@/services/taskManagement/addOnService";
import { getdisplayPlans } from "@/services/taskManagement/plansService";

export const getdisplay_Addons = createAsyncThunk("getdisplay_Addons/List", async (data) => {
  const response = await getdisplayAddons(data);
  return response.data.results;
});
export const getdisplay_plans = createAsyncThunk("getdisplay_plans/List", async (data) => {
  const response = await getdisplayPlans(data);
  return response.data.results;
});

const dataSlice = createSlice({
  name: "getdisplay/list",
  initialState: {
    cardsDetails:[],
    addOnOptions:[],
    AddOnAmt:"",
    isLogin:false,
    addon_id:"",
    selectedPlan: {},
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
    },
    setSelectedPlan:(state, action) => {
      state.selectedPlan = action.payload
    }
  },
  extraReducers: {
    [getdisplay_plans.fulfilled]: (state, action) => {
    state.cardsDetails=action.payload
    },
    [getdisplay_plans.pending]: (state) => {

    },
    [getdisplay_plans.rejected]: (state) => {
      state.cardsDetails=[]
    },
    [getdisplay_Addons.fulfilled]: (state, action) => {
      let newaddOnOptions=cloneDeep(action.payload)
      let arr=newaddOnOptions.filter((option)=>!option.isLogin)
      newaddOnOptions.map((option)=>{
        if(option.isLogin){
          state.isLogin=true
          state.AddOnAmt=option.addOnAmt
          state.addon_id=option.value
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

export const { setCardsDetails, setAddonOption, setSelectedPlan} = dataSlice.actions;

export default dataSlice.reducer;
