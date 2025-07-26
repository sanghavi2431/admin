import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addNewRole } from '@/services/taskManagement/rolesService'
import { roleAccessConfig } from '@/configs/roleAcess.config'
// import { createRole } from '@/services/RbacService';


export const getUser = createAsyncThunk('getUser/List', async (data) => {
    // const response  = await getWolooById( data );
    return []
    // return response.data;
})

export const addRole = async (data) => {
    const response = await addNewRole(data)
    return response.data.results;
}

const dataSlice = createSlice({
    name: 'users/list',
    initialState: {
        loading: false,
        usersList: [],
        roleAccessObj: roleAccessConfig
    },
    reducers: {
        setRoleAccessObj: (state, action) => {
            state.roleAccessObj = action.payload
        }
    },
    extraReducers: {
        [getUser.fulfilled]: (state, action) => {
            state.usersList = action.payload.results
            state.loading = false
        },
        [getUser.pending]: (state) => {
            state.loading = true
        },
        [getUser.rejected]: (state) => {
            state.loading = false
        },

    }
})

export const { setRoleAccessObj } = dataSlice.actions

export default dataSlice.reducer

