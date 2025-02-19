import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById, editUser } from "@/services/userService";
import dayjs from "dayjs";

export const getEditUser = createAsyncThunk("getUsers/Edit", async (data) => {
  const response = await getUserById(data);
  return response.data;
});

export const updateUser = async (data) => {
  const response = await editUser(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "users/edit",
  initialState: {
    loading: false,
    usersList: [],
  },
  reducers: {},
  extraReducers: {
    [getEditUser.fulfilled]: (state, action) => {
      if (typeof action.payload.results.dob === "string") {
        action.payload.results.dob = dayjs(
          action.payload.results.dob,
          "YYYY-MM-DD"
        ).toDate();
      }
      state.usersList = action.payload.results;
      state.loading = false;
    },
    [getEditUser.pending]: (state) => {
      state.loading = true;
    },
    [getEditUser.rejected]: (state) => {
      state.usersList = [];
      state.loading = false;
    },
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
