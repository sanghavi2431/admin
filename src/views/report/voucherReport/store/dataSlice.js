import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSubscriptionReport } from '@/services/subscriptionReportService';

export const get_Voucher_Report = createAsyncThunk('getVoucherReport/List', async ( data ) => {
    const response  = await getSubscriptionReport( data );
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
    filterType: [
        
    ]
}
const dataSlice = createSlice({
    name : 'voucherReport/list',
    initialState : {
        loading : false,
        voucherReportList : [],
        tableData : initialTableData,
        sortedColumn: () => { },
        dialogConfirmation : false,
    },
    reducers : {
        updateUsersList : ( state , action ) => {
           state.voucherReportList = action.payload
        },
        setTableData : ( state , action ) => {
            state.tableData = action.payload
        },
        setSortedColumn: (state, action) => {
            state.sortedColumn = action.payload
        },
        toggleDialogConfirmation:(state,action)=>{
            state.dialogConfirmation=action.payload
        }
       
    },
    extraReducers : {
        [get_Voucher_Report.fulfilled] : ( state, action) => {
            state.voucherReportList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [get_Voucher_Report.pending]: (state) => {
            state.loading = true
        },
        [get_Voucher_Report.rejected]: (state) => {
            state.loading = false
            state.voucherReportList =[]
            state.tableData.total = 0

        }

    }
})

export const {  setTableData,
    setSortedColumn,updateUsersList,toggleDialogConfirmation,setSelectedTransactionId,updateTransactionDetail } = dataSlice.actions

export default dataSlice.reducer

