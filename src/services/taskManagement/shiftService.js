import ApiService from "@/services/ApiService"

export async function fetchShifts (data) {
    return ApiService.fetchData({
        url: '/api/whms/shift/all',
        method: 'post',
        data
    })
}
export async function deleteShift (params) {
    return ApiService.fetchData({
        url: '/api/whms/shift',
        method: 'put',
        params
    })
}
export async function addShift (data) {
    return ApiService.fetchData({
        url: '/api/whms/shift/addShift',
        method: 'post',
        data
    })
}
export async function getShiftbyId (params) {
    return ApiService.fetchData({
        url: '/api/whms/shift/byId',
        method: 'get',
        params
    })
}
export async function updateShift (data) {
    return ApiService.fetchData({
        url: '/api/whms/shift/updateShift',
        method: 'put',
        data
    })
}