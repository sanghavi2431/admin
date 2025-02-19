import ApiService from "@/services/ApiService"

export async function getIoTData (data) {
    return ApiService.fetchData({
        url: '/api/whms/iot/getIotDashboardData',
        method: 'post',
        data
    })
}

export async function generateSummary (data) {
    return ApiService.fetchData({
        url: '/api/whms/iot/generateSummary',
        method: 'post',
        data
    }) 
}