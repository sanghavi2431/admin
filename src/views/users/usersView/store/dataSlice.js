import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById } from "@/services/userService";
import dayjs from "dayjs";

export const getUser = createAsyncThunk("getuser/view", async (data) => {
  const response = await getUserById(data);
  return response.data;
});

const dataSlice = createSlice({
  name: "users/view",
  initialState: {
    loading: false,
    usersList: [],
  },
  reducers: {},
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      if (typeof action.payload.results.dob === "string") {
        action.payload.results.dob = dayjs(
          action.payload.results.dob,
          "YYYY-MM-DD"
        ).toDate();
      }
      state.usersList = action.payload.results;
      state.loading = false;
    },
    [getUser.pending]: (state) => {
      state.loading = true;
    },
    [getUser.rejected]: (state) => {
      state.usersList = [];
      state.loading = false;
    },
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
