import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addNewRole } from 'services/taskManagement/rolesService'
// import { createRole } from 'services/RbacService';


export const getUser = createAsyncThunk('getUser/List', async ( data ) => {
    // const response  = await getWolooById( data );
    return []
    // return response.data;
})

export const addRole = async ( data ) => {
    const response = await addNewRole( data )
    return response.data.results;
}

const dataSlice = createSlice({
    name : 'users/list',
    initialState : {
        loading : false,
        usersList : [],
     roleAccessObj:{
        "/woloos": true,
        "/woloos-View": true,
        "/woloos-Edit": true,
        "/woloos-AddNew": true,
        "/woloos-Import": true,
        "/woloos-Delete": true,
        "/users": true,
        "/users-Edit": true,
        "/users-View": true,
        "/users-AddNew": true,
        "/users-BulkDelete": true,
        "/users-Delete": true,
        "/corporates": true,
        "/corporates-AddNew": true,
        "/corporates-Edit": true,
        "/corporates-View": true,
        "/corporates-BulkDelete": true,
        "/corporates-Delete": true,
        "/subscription": true,
        "/subscription-Edit": true,
        "/subscription-View": true,
        "/subscription-AddNew": true,
        "/subscription-BulkDelete": true,
        "/subscription-Delete": true,
        "/voucher": true,
        "/voucher-Edit": true,
        "/voucher-View": true,
        "/voucher-AddNew": true,
        "/voucher-Uses": true,
        "/voucher-BulkDelete": true,
        "/voucher-Delete": true,
        "/voucher-Export": true,
        "/voucher-Upload": true,
        "/voucher-Download": true,
        "/setting": true,
        "/admin": true,
        "/general": true,
        "/site": true,
        "/review": true,
        "/franchise": true,
        "/franchise-Edit": true,
        "/franchise-View": true,
        "/franchise-AddNew": true,
        "/franchise-Delete": true,
        "/transaction": true,
        "/reports": true,
        "/userReport": true,
        "/subscriptionReport": true,
        "/referrerReport": true,
        "/referrerHistoryReport": true,
        "/voucherReport": true,
        "/loyaltyReport": true,
        "/userReport-Export": true,
        "/subscriptionReport-Export": true,
        "/referrerReport-Export": true,
        "/referrerHistoryReport-Export": true,
        "/voucherReport-Export": true,
        "/loyaltyReport-Export": true,
        "/wolooRating": true,
        "/userOffer": true,
        "/userOffer-AddNew": true,
        "/userOffer-Edit": true,
        "/userOffer-View": true,
        "/userOffer-Delete": true,
        "/activeBlogs": true,
        "/activeBlogs-AddNew": true,
        "/activeBlogs-Edit": true,
        "/activeBlogs-Delete": true,
        "/blogCategory": true,
        "/blogCategory-AddNew": true,
        "/blogCategory-Edit": true,
        "/blogCategory-Delete": true,
        "/blogSubCategory": true,
        "/blogSubCategory-Edit": true,
        "/blogSubCategory-View": true,
        "/blogSubCategory-AddNew": true,
        "/blogSubCategory-Delete": true,
        "/client": true,
        "/client-Edit": true,
        "/client-AddNew": true,
        "/client-Delete": true,
        "/location": true,
        "/location-Edit": true,
        "/location-AddNew": true,
        "/location-Delete": true,
        "/block": true,
        "/block-Edit": true,
        "/block-AddNew": true,
        "/block-Delete": true,
        "/facility": true,
        "/facility-Edit": true,
        "/facility-AddNew": true,
        "/facility-Delete": true,
        "/facility-Import": true,
        "/cluster": true,
        "/cluster-AddNew": true,
        "/cluster-Edit": true,
        "/cluster-Delete": true,
        "/booth": true,
        "/shift": true,
        "/shift-Edit": true,
        "/shift-AddNew": true,
        "/shift-Delete": true,
        "/task_checklist": true,
        "/task_checklist-AddNew": true,
        "/task_checklist-Edit": true,
        "/task_checklist-Delete": true,
        "/task_template": true,
        "/task_template-AddNew": true,
        "/task_template-Edit": true,
        "/task_template-Delete": true,
        "/templateMap": true,
        "/templateMap-AddNew": true,
        "/templateMap-Edit": true,
        "/templateMap-Delete": true,
        "/templateMap-Import": true,
        "/janitor": true,
        "/janitor-AddNew": true,
        "/janitor-Edit": true,
        "/janitor-Delete": true,
        "/supervisor": true,
        "/supervisor-AddNew": true,
        "/supervisor-Edit": true,
        "/supervisor-Delete": true,
        "/iotDevice": true,
        "/iotDevice-AddNew": true,
        "/iotDevice-Edit": true,
        "/iotDevice-Delete": true,
        "/dashboard_task": true,
        "/subscriptionPlans": true,
        "/plan": true,
        "/plan-AddNew": true,
        "/plan-Delete": true,
        "/addon": true,
        "/addon-AddNew": true,
        "/addon-Delete": true,
        "/iotData": true,
        "/accessDenied": true,
        "/subscriptionSetting": true,
        "/route": true,
        "/dashboard": true,
        "/facilityManager": true,
        "/facilityManager-AddNew": true,
          "/rbac":true,
         "/rbac-roleAdd":true,
         "/rbac-roleEdit":true,
         "/rbac-roleDelete":true,
         "/orders":true,
         "/upgrade":true
      }
    },
    reducers : {
       setRoleAccessObj:(state,action)=>{
        state.roleAccessObj=action.payload
       }
        
    },
    extraReducers : {
        [getUser.fulfilled] : ( state, action) => {
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

export const { setRoleAccessObj} = dataSlice.actions

export default dataSlice.reducer
