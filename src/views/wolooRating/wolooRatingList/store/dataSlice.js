import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getWolooUserRatings } from '@/services/wolooRatingService';

export const getWolooRating = createAsyncThunk('getWolooRating/List', async ( data ) => {
    const response  = await getWolooUserRatings( data );
    return response.data.results;
})

export const initialTableData = {
    total : 0,
    pageIndex : 1,
    pageSize : 10, 
    query : '',
    sort : {
        order : '',
        key : ''
    }
}
const dataSlice = createSlice({
    name : 'WolooRating/list',
    initialState : {
        loading : false,
        wolooUserRatingList : [],
        tableData : initialTableData,
        deleteConfirmation: false,
        bulkdeleteConfirmation: false,
        sortedColumn: () => { },
    

    },
    reducers : {
        updateUsersList : ( state , action ) => {
           state.wolooUserRatingList = action.payload
        },
        setTableData : ( state , action ) => {
            state.tableData = action.payload
        },
        setSortedColumn: (state, action) => {
            state.sortedColumn = action.payload
        },
    },
    extraReducers : {
        [getWolooRating.fulfilled] : ( state, action) => {
            state.wolooUserRatingList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getWolooRating.pending]: (state) => {
            state.loading = true
        },
        [getWolooRating.rejected]: (state) => {
            state.loading = false
        },

    }
})

export const {  setTableData,setSortedColumn,updateUsersList } = dataSlice.actions

export default dataSlice.reducer

