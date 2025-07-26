import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { cloneDeep, isEmpty } from 'lodash';
import { getSetting, updateSetting, addSetting } from '@/services/settingService';

export const getSettings = createAsyncThunk("getSettingsGeneral/general", async (data) => {
    const response = await getSetting(data)
    return response.data;
})
export const updateSettings = async (data) => {
    const response = await updateSetting(data)
    return response.data;
}
export const addSettings = async (data) => {
    const response = await addSetting(data)
    return response.data;
}

const dataSlice = createSlice({
    name: 'general/Setting',
    initialState: {
        loading: false,
        settingData: [],
        initialFormData: []
    },
    reducers: {},
    extraReducers: {
        [getSettings.fulfilled]: (state, action) => {
            let data;
            let newData = [];
            let obj = {};
            if (action.payload.results.hasOwnProperty("General")) {
                data = cloneDeep(action.payload.results.General);

                for (let value of data) {
                    let newObj = {}
                    for (let val in value) {
                        if (value[val] === null) {
                            newObj[val] = ""
                        } else {
                            newObj[val] = value[val]
                        }
                    }
                    newData.push(newObj)
                }
                for (let val of newData) {
                    obj[val.id] = val.value;
                }
            }
            state.settingData = newData
            state.initialFormData = obj;
            state.loading = false

        },
        [getSettings.pending]: (state) => {
            state.loading = true
            state.settingData = []
            state.initialFormData = []
        }, [getSettings.rejected]: (state) => {
            state.loading = false
        },
    }
})
export const { } = dataSlice.actions
export default dataSlice.reducer

