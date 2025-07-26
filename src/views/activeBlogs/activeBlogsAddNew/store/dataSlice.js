import { createSlice } from "@reduxjs/toolkit";
import { create_Blog } from "@/services/blogService";

export const add_blog = async (data) => {
  const response = await create_Blog(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "addBlog/Add",
  initialState: {
    loading: false,
  },
  reducers: {},
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
