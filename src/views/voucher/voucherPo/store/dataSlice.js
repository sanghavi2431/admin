import { createSlice } from "@reduxjs/toolkit";
import { createPO } from "@/services/voucherService";
export const uploadWolooData = async (data) => {
  const response = await createPO(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "voucherPo/list",
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: {},
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
