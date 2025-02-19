import ApiService from "@/services/ApiService"

export async function getAlliotDevice (data) {
    return ApiService.fetchData({
        url: '/api/whms/iotDeviceMapping/all',
        method: 'post',
        data
    })
}
export async function getiotDevicebyId (params) {
    return ApiService.fetchData({
        url: '/api/whms/iotDeviceMapping/all',
        method: 'post',
        params
    })
}
export async function deleteiotDevicebyId (params) {
    return ApiService.fetchData({
        url: '/api/whms/iotDeviceMapping/',
        method: 'delete',
        params
    })
}
export async function getIOTdevicebyMapping_id (params) {
    return ApiService.fetchData({
        url: '/api/whms/iot/getIOTdevice',
        method: 'get',
        params
    })
}
export async function getIOTdeviceIdbyMapping_id (params) {
    return ApiService.fetchData({
        url: '/api/whms/iot/getIOTdeviceByMappingId',
        method: 'get',
        params
    })
}
export async function insert_iot (data) {
    return ApiService.fetchData({
        url: '/api/whms/iotDeviceMapping',
        method: 'post',
        data
    })
}