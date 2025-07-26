import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWolooById } from "@/services/wolooService";
import dayjs from "dayjs";

export const getWoloo = createAsyncThunk("getWolooViews/List", async (data) => {
  const response = await getWolooById(data);
  return response.data;
});

const dataSlice = createSlice({
  name: "woloosviews/list",
  initialState: {
    loading: false,
    woloosList: [],
  },
  reducers: {},
  extraReducers: {
    [getWoloo.fulfilled]: (state, action) => {
      if (action.payload.results.opening_hours.length) {
        if (
          action.payload.results.opening_hours[0].hasOwnProperty("open_time")
        ) {
          if (action.payload.results.opening_hours.length) {
            action.payload.results.opening_hours =
              action.payload.results.opening_hours.map((t) => {
                return {
                  time: [
                    dayjs()
                      .set("hour", t.open_time.split(":")[0])
                      .set("minute", t.open_time.split(":")[1])
                      .set("second", t.open_time.split(":")[2])
                      .toDate(),
                    dayjs()
                      .set("hour", t.close_time.split(":")[0])
                      .set("minute", t.close_time.split(":")[1])
                      .set("second", t.close_time.split(":")[2])
                      .toDate(),
                  ],
                };
              });
          }
        }
      }
      state.woloosList = action.payload.results;
      state.loading = false;
    },
    [getWoloo.pending]: (state) => {
      state.loading = true;
    },
    [getWoloo.rejected]: (state) => {
      state.loading = false;
      state.woloosList = [];
    },
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
