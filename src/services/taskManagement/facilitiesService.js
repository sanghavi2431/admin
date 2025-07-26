import ApiService from "@/services/ApiService"

export async function fetchFacility(data) {
    return ApiService.fetchData({
        url: '/api/whms/facilities/getFacilities',
        method: 'post',
        data
    })
}
export async function deleteFacility(params) {
    return ApiService.fetchData({
        url: '/api/whms/facilities/deleteFacilitieById',
        method: 'put',
        params
    })
}
export async function getBlocks(params) {
    return ApiService.fetchData({
        url: '/api/whms/facilities/getBlocks',
        method: 'get',
        params
    })
}
export async function addFacility(data) {
    return ApiService.fetchData({
        url: '/api/whms/facilities/insertFacilities',
        method: 'post',
        data
    })
}
export async function getShifts(params) {
    return ApiService.fetchData({
        url: '/api/whms/facilities/getShifts',
        method: 'get',
        params
    })
}
export async function getFacilityById(params) {
    return ApiService.fetchData({
        url: '/api/whms/facilities/getFacilitieById',
        method: 'get',
        params
    })
}
export async function updateFacility(data) {
    return ApiService.fetchData({
        url: '/api/whms/facilities/updateFacilitie',
        method: 'put',
        data
    })
}
export async function uploadFacility(data) {
    return ApiService.fetchData({
        url: '/api/whms/facilities/uploadFacility',
        method: 'post',
        data
    })
}
export async function downloadlocationBlockDetails(data) {
    return ApiService.fetchData({
        url: '/api/whms/facilities/locationBlockDetails',
        method: 'post',
        data
    })
}
export async function downloadFacilityUploadTemplate(params) {
    return ApiService.fetchData({
        url: '/api/whms/facilities/download-template',
        method: 'get',
        params,
        responseType: 'blob'
    })
}