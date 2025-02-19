import { createSlice } from '@reduxjs/toolkit'
import { deleteSetting} from '@/services/settingService';

export const deleteSettings=async(data)=>{
    const response = await deleteSetting(data)
    return response.data;
}

const dataSlice = createSlice({
    name: 'generalForm/Setting',
    initialState: {
        deleteConfirmation: false,
        selectedSetting: ''
    },
    reducers: {
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedSetting: (state, action) => {
            state.selectedSetting = action.payload
        },
    },

})
export const { toggleDeleteConfirmation, setSelectedSetting } = dataSlice.actions
export default dataSlice.reducer

