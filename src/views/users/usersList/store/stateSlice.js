import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

const stateSlice = createSlice({
  name: "usersList/state",
  initialState: {
    selectedRows: [],
    selectedRow: [],
  },
  reducers: {
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
    setSelectedRow: (state, action) => {
      state.selectedRow = action.payload;
    },

    addRowItem: (state, { payload }) => {
      const currentState = current(state);
      let newSelectedRows = cloneDeep(currentState.selectedRows);
      let obj = newSelectedRows.find((ele) => ele.id == payload[0].id);
      if (obj) {
        obj.isSelected = 1;
        return { selectedRows: [...newSelectedRows] };
      } else
        return { selectedRows: [...currentState.selectedRows, ...payload] };
    },
    removeRowItem: (state, { payload }) => {
      const currentState = current(state);
      let newSelectedRows = cloneDeep(currentState.selectedRows);
      let obj = newSelectedRows.find((ele) => ele.id == payload[0].id);
      if (obj) {
        obj.isSelected = 0;
        return { selectedRows: [...newSelectedRows] };
      } else {
        return { selectedRows: [...currentState.selectedRows, ...payload] };
      }
    },
  },
});

export const { addRowItem, removeRowItem, setSelectedRows, setSelectedRow } =
  stateSlice.actions;

export default stateSlice.reducer;
