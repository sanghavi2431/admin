import ApiService from "@/services/ApiService"

export async function fetchCluster (data) {
    return ApiService.fetchData({
        url: '/api/whms/cluster/all',
        method: 'post',
        data
    })
}
export async function deleteCluster (params) {
    return ApiService.fetchData({
        url: '/api/whms/cluster/',
        method: 'delete',
        params
    })
}
export async function getClusterById (params) {
    return ApiService.fetchData({
        url: '/api/whms/cluster/byId',
        method: 'get',
        params
    })
}
export async function updateCluster (data) {
    return ApiService.fetchData({
        url: '/api/whms/cluster',
        method: 'put',
        data
    })
}
export async function addCluster (data) {
    return ApiService.fetchData({
        url: '/api/whms/cluster/',
        method: 'post',
        data
    })
}