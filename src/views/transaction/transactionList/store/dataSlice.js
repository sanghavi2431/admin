import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllTransaction,getTransactionbyId } from '@/services/transactionService';

export const getTransaction = createAsyncThunk('getTransaction/List', async ( data ) => {
    const response  = await getAllTransaction( data );
    return response.data.results;
})
export const getTransactionById = createAsyncThunk('getTransactionDetail/List',async ( data ) => {
    const response  = await getTransactionbyId( data );
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
    },
    filterType:[]
}
const dataSlice = createSlice({
    name : 'transaction/list',
    initialState : {
        loading : false,
        transactionList : [],
        tableData : initialTableData,
        sortedColumn: () => { },
        dialogConfirmation : false,
        selectedTransactionId:"",
        transactionDetail:{}
    },
    reducers : {
        updateUsersList : ( state , action ) => {
           state.transactionList = action.payload
        },
        setTableData : ( state , action ) => {
            state.tableData = action.payload
        },
        setSortedColumn: (state, action) => {
            state.sortedColumn = action.payload
        },
        toggleDialogConfirmation:(state,action)=>{
            state.dialogConfirmation=action.payload
        },
        setSelectedTransactionId:(state,action)=>{
            state.selectedTransactionId=action.payload
        }
       
    },
    extraReducers : {
        [getTransaction.fulfilled] : ( state, action) => {
            state.transactionList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getTransaction.pending]: (state) => {
            state.loading = true
        },
        [getTransaction.rejected]: (state) => {
            state.loading = false
            state.transactionList =[]
            state.tableData.total = 0

        },
        [getTransactionById.fulfilled] : ( state, action) => {
            state.transactionDetail = action.payload
        },
        [getTransactionById.pending]: (state) => {
        },
        [getTransactionById.rejected]: (state) => {

        },

    }
})

export const {  setTableData,
    setSortedColumn,updateUsersList,toggleDialogConfirmation,setSelectedTransactionId,updateTransactionDetail } = dataSlice.actions

export default dataSlice.reducer

