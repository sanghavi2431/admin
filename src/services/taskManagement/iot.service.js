import ApiService from "services/ApiService"

export async function getDevicePayload (data) {
    return ApiService.fetchData({
        url: '/api/whms/iot/getIotDashboardData',
        method: 'post',
        data
    })
}

export async function getIotDashboardData (data) {
    return ApiService.fetchData({
        url: '/api/whms/iot/getIotDashboardData',
        method: 'post',
        data
    })
}