import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { fetchAllCategories, fetchAllSubCategories } from "@/services/blogService";

export const fetch_All__Categories = createAsyncThunk("fetch_All__Categories/Editactive", async (data) => {
  const response = await fetchAllCategories(data);
  return response.data.results.data;
});
export const fetch_All__SubCategories = createAsyncThunk("fetch_All__SubCategories/Editactive", async (data) => {
  const response = await fetchAllSubCategories(data);
  return response.data.results.data;
});
const dataSlice = createSlice({
  name: "blog_Sub_Category/activeEditform",
  initialState: {
    loading: false,
    categoryList:[],
    subCategoryData:[]
  },
  reducers: {},
  extraReducers:{
    [fetch_All__Categories.fulfilled]: (state, action) => {
      let list=cloneDeep(action.payload)
      state.categoryList=list?.map((li)=>{return {label:li.category_name,value:li.id?.toString()}})   
    },
    [fetch_All__Categories.pending]: (state) => {     
    },
    [fetch_All__Categories.rejected]: (state) => {    
      state.categoryList = []
    },
    [fetch_All__SubCategories.fulfilled]: (state, action) => {
      let list=cloneDeep(action.payload)
      state.subCategoryData=list?.map((li)=>{return {label:li.sub_category,value:li.id?.toString()}})   
    },
    [fetch_All__SubCategories.pending]: (state) => {     
    },
    [fetch_All__SubCategories.rejected]: (state) => {    
      state.subCategoryData = []
    },
  }
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
