import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { fetchPlans } from "@/services/taskManagement/plansService";

export const getPlans = createAsyncThunk("getPlans/addForm", async (data) => {
  const response = await fetchPlans(data);
  return response.data.results;
});

const dataSlice = createSlice({
  name: "addOnIOT/addForm",
  initialState: {
    loading: false,
plans:[]
  },
  reducers: {
  },
  extraReducers: {
    [getPlans.fulfilled]: (state, action) => {
      let list=cloneDeep(action.payload.plans)
      let planList=list?.map((li)=>{return {label:li.name,value:li.plan_id}}) 
      planList.push({label:"NA",value:0})
      state.plans=planList 
    },
    [getPlans.pending]: (state) => {     
    },
    [getPlans.rejected]: (state) => {    
      state.plans = []
    }
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
