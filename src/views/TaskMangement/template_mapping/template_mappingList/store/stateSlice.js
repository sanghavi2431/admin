import { createSlice } from "@reduxjs/toolkit";
import { deleteTemplateMap } from "@/services/taskManagement/templateMapService";

export const delete_mappedTemplate = async (data) => {
  const response = await deleteTemplateMap(data);
  return response.data;
};

const stateSlice = createSlice({
  name: "templateMapList/state",
  initialState: {
    deleteConfirmation: false,
    addConfirmation: false,
    editConfirmation: false,
    selectedTemplateMap: "",
    uploadConfirmation:false,
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    toggleAddConfirmation: (state, action) => {
      state.addConfirmation = action.payload;
    },
    toggleEditConfirmation: (state, action) => {
      state.editConfirmation = action.payload;
    },
    setSelectedTemplateMap: (state, action) => {
      state.selectedTemplateMap = action.payload;
    },
    toggleUploadConfirmation: (state, action) => {
      state.uploadConfirmation = action.payload;
    },
  },
});

export const { toggleDeleteConfirmation, setSelectedTemplateMap ,toggleAddConfirmation,toggleEditConfirmation,toggleUploadConfirmation} = stateSlice.actions;

export default stateSlice.reducer;
