import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { fetchAllCategories } from "@/services/blogService";

export const fetch_All_Categories = createAsyncThunk("fetchAllsub_Categories/List", async (data) => {
  const response = await fetchAllCategories(data);
  return response.data.results.data;
});
const dataSlice = createSlice({
  name: "blogSubCategory/Addform",
  initialState: {
    loading: false,
    categoryList:[]
  },
  reducers: {},
  extraReducers:{
    [fetch_All_Categories.fulfilled]: (state, action) => {
      let list=cloneDeep(action.payload)
      state.categoryList=list?.map((li)=>{return {label:li.category_name,value:li.id}})   
    },
    [fetch_All_Categories.pending]: (state) => {     
    },
    [fetch_All_Categories.rejected]: (state) => {    
      state.categoryList = []
    },
  }
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
