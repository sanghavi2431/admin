import ApiService from './ApiService';

export async function fetchFranchise (data) {
    return ApiService.fetchData({
        url: '/api/franchise/all',
        method: 'post',
        data
    })
}
export async function deleteFranchise (params) {
    return ApiService.fetchData({
        url: '/api/wolooHost/delete',
        method: 'put',
        params
    })
}
export async function getFranchiseById (params) {
    return ApiService.fetchData({
        url: '/api/wolooHost/byId',
        method: 'get',
        params
    })
}
export async function editFranchise (data) {
    return ApiService.fetchData({
        url: '/api/wolooHost',
        method: 'put',
        data
    })
}
export async function addFranchise (data) {
    return ApiService.fetchData({
        url: '/api/wolooHost/create',
        method: 'post',
        data
    })
}
export async function bulkUploadFranchiseData (data) {
    return ApiService.fetchData({
        url: '/api/wolooHost/bulkUpload',
        method: 'post',
        data
    })
}
