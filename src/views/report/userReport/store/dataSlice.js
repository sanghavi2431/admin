import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUsersReport } from '@/services/userReportService';
import { export_excel } from '@/services/ownerHistoryService';
export const getUserReport = createAsyncThunk('getUserReport/List', async ( data ) => {
    const response  = await getUsersReport( data );
    return response.data.results;
})
export const exportExcel = async ( data ) => {
    const response  = await export_excel( data );
    return response.data;
}
export const initialTableData = {
    total : 0,
    pageIndex : 1,
    pageSize : 10, 
    query : '',
    sort : {
        order : '',
        key : ''
    },
    filterType: []
}
const dataSlice = createSlice({
    name : 'userReport/list',
    initialState : {
        loading : false,
        userReportList : [],
        tableData : initialTableData,
        sortedColumn: () => { },
        dialogConfirmation : false,
        exportConfirmation : false,

    },
    reducers : {
        updateUsersList : ( state , action ) => {
           state.userReportList = action.payload
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
        toggleExportConfirmation : ( state, action ) => {
            state.exportConfirmation = action.payload
        },
       
    },
    extraReducers : {
        [getUserReport.fulfilled] : ( state, action) => {
            state.userReportList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getUserReport.pending]: (state) => {
            state.loading = true
        },
        [getUserReport.rejected]: (state) => {
            state.loading = false
            state.userReportList =[]
            state.tableData.total = 0

        }

    }
})

export const {  setTableData,toggleExportConfirmation,
    setSortedColumn,updateUsersList,toggleDialogConfirmation,setSelectedTransactionId,updateTransactionDetail } = dataSlice.actions

export default dataSlice.reducer

