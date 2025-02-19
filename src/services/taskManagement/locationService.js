import ApiService from "@/services/ApiService"

export async function fetchLocations (data) {
    return ApiService.fetchData({
        url: '/api/whms/location/all',
        method: 'post',
        data
    })
}
export async function deleteLocation (params) {
    return ApiService.fetchData({
        url: '/api/whms/location/',
        method: 'delete',
        params
    })
}
export async function getLocationById (params) {
    return ApiService.fetchData({
        url: '/api/whms/location/byId',
        method: 'get',
        params
    })
}
export async function updateLocation (data) {
    return ApiService.fetchData({
        url: '/api/whms/location/',
        method: 'put',
        data
    })
}
export async function getLocationTypes (params) {
    return ApiService.fetchData({
        url: '/api/whms/location/',
        method: 'get',
        params
    })
}
export async function insertLocation (data) {
    return ApiService.fetchData({
        url: '/api/whms/location/',
        method: 'post',
        data
    })
}