import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'rbac/state',
    initialState: {
        deleteConfirmation: false,
        selectedRole: '',
        sortedColumn: () => {},
    },
    reducers: {
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSortedColumn: (state, action) => {
            state.sortedColumn = action.payload
        },
        setSelectedRole: (state, action) => {
            state.selectedRole = action.payload
        },
    },
})

export const { 
    toggleDeleteConfirmation, 
    setSortedColumn,
    setSelectedRole
} = stateSlice.actions

export default stateSlice.reducer
