import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getClientById,updateClient } from "@/services/taskManagement/clientService";

export const getClient = createAsyncThunk("getClient/Edit", async (data) => {
  const response = await getClientById(data);
  return response.data;
});

export const update_Client = async (data) => {
  const response = await updateClient(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "client/edit",
  initialState: {
    loading: false,
    clientData: [],
  },
  reducers: {
  },
  extraReducers: {
    [getClient.fulfilled]: (state, action) => {
      state.clientData = action.payload.results;
      state.loading = false;
    },
    [getClient.pending]: (state) => {
      state.loading = true;
    },
    [getClient.rejected]: (state) => {
      state.clientData = [];
      state.loading = false;
    },
  },
});

export const {  } = dataSlice.actions;

export default dataSlice.reducer;
