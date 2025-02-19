import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUser } from "@/services/userService";

export const newUser = async (data) => {
  const response = await addUser(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "users/Add",
  initialState: {
    loading: false,
  },
  reducers: {},
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
