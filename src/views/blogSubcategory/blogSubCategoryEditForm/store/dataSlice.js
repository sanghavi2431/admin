import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { fetchAllCategories } from "@/services/blogService";

export const fetchAll___Categories = createAsyncThunk("fetchAll___Categories/EditList", async (data) => {
  const response = await fetchAllCategories(data);
  return response.data.results.data;
});
const dataSlice = createSlice({
  name: "blog_Sub_Category/Editform",
  initialState: {
    loading: false,
    categoryList:[]
  },
  reducers: {},
  extraReducers:{
    [fetchAll___Categories.fulfilled]: (state, action) => {
      let list=cloneDeep(action.payload)
      state.categoryList=list?.map?.((li)=>{return {label:li.category_name,value:li.id}})   
    },
    [fetchAll___Categories.pending]: (state) => {     
    },
    [fetchAll___Categories.rejected]: (state) => {    
      state.categoryList = []
    },
  }
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
