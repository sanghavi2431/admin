import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { delete_Role, fetchRoles } from '@/services/taskManagement/rolesService';

export const getRoles = createAsyncThunk('role/List',async (data) => {
    const response = await fetchRoles(data);
    return response?.data?.results;
})

export const deleteRole = async (data) => {
    const response = await delete_Role(data)
    return response?.data;
}


export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: ''
    }
}

export const initialFilterData = {
    name: '',
    category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
    status: [1, 0],
    productStatus: 0,
    
}

const dataSlice = createSlice({
    name: 'role/list',
    initialState: {
        loading: false,
        roleList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        updateProductList: (state, action) => {
            state.roleList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        reInitialTableData: (state, action) => {
            state.tableData = initialTableData
            state.filterData = initialFilterData
        },
    },
    extraReducers: {
        [getRoles.fulfilled]: (state, action) => {
            state.roleList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getRoles.pending]: (state) => {
            state.loading = true
        },
        [getRoles.rejected]: (state) => {
            state.loading = false
        },
    }
})

export const { updateProductList, reInitialTableData , setTableData, setFilterData, setSortedColumn } = dataSlice.actions

export default dataSlice.reducer
