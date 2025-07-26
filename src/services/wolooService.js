import ApiService from './ApiService';

export async function fetchWoloos (data) {
    return ApiService.fetchData({
        url: '/api/wolooHost/all',
        method: 'post',
        data
    })
}
export async function deleteWoloo (params) {
    return ApiService.fetchData({
        url: '/api/wolooHost/delete',
        method: 'put',
        params
    })
}
export async function getWolooById (params) {
    return ApiService.fetchData({
        url: '/api/wolooHost/byId',
        method: 'get',
        params
    })
}
export async function editWoloo (data) {
    return ApiService.fetchData({
        url: '/api/wolooHost',
        method: 'put',
        data
    })
}
export async function addWoloo (data) {
    return ApiService.fetchData({
        url: '/api/wolooHost/create',
        method: 'post',
        data
    })
}
export async function bulkUploadWolooData (data) {
    return ApiService.fetchData({
        url: '/api/wolooHost/bulkUpload',
        method: 'post',
        data
    })
}
