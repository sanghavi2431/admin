import ApiService from "@/services/ApiService"

export async function fetchBlocks (data) {
    return ApiService.fetchData({
        url: '/api/whms/block/getBlocks',
        method: 'post',
        data
    })
}
export async function deleteBlocks (params) {
    return ApiService.fetchData({
        url: '/api/whms/block/deleteBlockById',
        method: 'put',
        params
    })
}
export async function getBlocksById (params) {
    return ApiService.fetchData({
        url: '/api/whms/block/getBlockById',
        method: 'get',
        params
    })
}
export async function updateBlocks (data) {
    return ApiService.fetchData({
        url: '/api/whms/block/updateBlock',
        method: 'put',
        data
    })
}
export async function insertBlocks (data) {
    return ApiService.fetchData({
        url: '/api/whms/block/insertBlock',
        method: 'post',
        data
    })
}
export async function getClients (params) {
    return ApiService.fetchData({
        url: '/api/whms/block/getClients',
        method: 'get',
        params
    })
}
export async function getLocations (params) {
    return ApiService.fetchData({
        url: '/api/whms/block/getLocations',
        method: 'get',
        params
    })
}