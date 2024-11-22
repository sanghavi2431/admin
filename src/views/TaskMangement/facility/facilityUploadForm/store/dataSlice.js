import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "facility/formlist",
  initialState: {
    clientId: "",

    },
  reducers: {

      setClientId: (state, action) => {
      state.clientId = action.payload;
    },
    
  },
  extraReducers: {

  },
});

export const { setClientId} = dataSlice.actions;

export default dataSlice.reducer;
