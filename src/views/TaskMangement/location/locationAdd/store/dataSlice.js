import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { insertLocation } from "@/services/taskManagement/locationService";

export const insert_Location = async (data) => {
  const response = await insertLocation(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "location/add",
  initialState: {
    loading: false,
    buttonType: "",
    exitConfirmation: false,
    mapConfirmation: false,
    latlng: { lat: "", lng: "" },
    latitude: "",
    longitude: "",
    address: "",
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

export const { setButtonType,setInitialCurrentPosition, setMapConfirmation, setCurrentPosition } = dataSlice.actions;

export default dataSlice.reducer;
