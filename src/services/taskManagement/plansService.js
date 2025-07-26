import ApiService from "@/services/ApiService"

export async function fetchPlans (data) {
    return ApiService.fetchData({
        url: '/api/whms/plans/getPlans',
        method: 'post',
        data
    })
}
export async function deletePlan (params) {
    return ApiService.fetchData({
        url: '/api/whms/plans/deletePlanById',
        method: 'put',
        params
    })
}
export async function insertPlan (data) {
    return ApiService.fetchData({
        url: '/api/whms/plans/insertPlan',
        method: 'post',
        data
    })
}
export async function createOrder (data) {
    return ApiService.fetchData({
        url: '/api/whms/payment/createOrder',
        method: 'post',
        data
    })
}
export async function getdisplayPlans (params) {
    return ApiService.fetchData({
        url: '/api/whms/plans/getdisplayPlans',
        method: 'get',
        params
    })
}
export async function getpurchasedPlanIdbyClientId (params) {
    return ApiService.fetchData({
        url: '/api/whms/plans/purchasedPlanIdbyClientId',
        method: 'get',
        params
    })
}
export async function getSubscriptionExpiry (params) {
    return ApiService.fetchData({
        url: '/api/whms/plans/getSubscriptionExpiry',
        method: 'get',
        params
    })
}
export async function fetchOrders (data) {
    return ApiService.fetchData({
        url: '/api/whms/payment/fetchOrders',
        method: 'post',
        data
    })
}

