import { createSlice } from "@reduxjs/toolkit";
import { insertBlocks } from "@/services/taskManagement/blockService";

export const insert_Block = async (data) => {
  const response = await insertBlocks(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "block/add",
  initialState: {
    loading: false,
    buttonType: "",
  },
  reducers: {
    setButtonType: (state, action) => {
      state.buttonType = action.payload;
    },
    setMapConfirmation: (state, action) => {
      state.mapConfirmation = action.payload;
    },
    setCurrentPosition: (state, action) => {
      state.latitude = action.payload.lat;
      state.longitude = action.payload.lng;
      state.latlng = action.payload;

      if (action.payload.address !== undefined) {
        state.address = action.payload.address;
      }
    },
    setInitialCurrentPosition: (state, action) => {
      state.latitude = "";
      state.longitude = "";
      state.latlng = { lat: "", lng: "" };
    },
  },
  extraReducers: {},
});

export const {
  setButtonType,
  setInitialCurrentPosition,
  setMapConfirmation,
  setCurrentPosition,
} = dataSlice.actions;

export default dataSlice.reducer;
