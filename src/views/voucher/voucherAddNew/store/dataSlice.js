import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createVoucher } from "@/services/voucherService";
export const newVoucher = async (data) => {
  const response = await createVoucher(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "voucher/Add",
  initialState: {
    loading: false,
    resultMessage: "",
    formData: "",
  },
  reducers: {
    setResultmessage: (state, action) => {
      state.resultMessage = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export const { setResultmessage, setFormData } = dataSlice.actions;

export default dataSlice.reducer;
