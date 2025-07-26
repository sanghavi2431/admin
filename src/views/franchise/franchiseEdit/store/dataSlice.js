import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { editFranchise, getFranchiseById } from "@/services/franchiseService";
import dayjs from "dayjs";

export const getFranchise = createAsyncThunk(
  "getFranchiseEdit/List",
  async (data) => {
    const response = await getFranchiseById(data);
    return response.data;
  }
);

export const edit_franchise = async (data) => {
  const response = await editFranchise(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "FranchiseEdit/list",
  initialState: {
    loading: false,
    woloosList: [],
  },
  reducers: {},
  extraReducers: {
    [getFranchise.fulfilled]: (state, action) => {
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
      if (action.payload.results.recommended_by === null) {
        action.payload.results.recommended_by = "";
      }
      if (action.payload.results.recommended_mobile === null) {
        action.payload.results.recommended_mobile = "";
      }
      if (action.payload.results.description === null) {
        action.payload.results.description = "";
      }
      state.woloosList = action.payload.results;
      state.loading = false;
    },
    [getFranchise.pending]: (state) => {
      state.loading = true;
    },
    [getFranchise.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
