import ApiService from './ApiService';

export async function fetchCorporate (data) {
    return ApiService.fetchData({
        url: '/api/corporate/all',
        method: 'post',
        data
    })
}
export async function addCorporate (data) {
    return ApiService.fetchData({
        url: '/api/corporate',
        method: 'post',
        data
    })
}
export async function getCorporateById (params) {
    return ApiService.fetchData({
        url: '/api/corporate',
        method: 'get',
        params
    })
}
export async function deleteCorporate (params) {
    return ApiService.fetchData({
        url: '/api/corporate/delete',
        method: 'put',
        params
    })
}
export async function deleteBulkCorporates (data) {
return ApiService.fetchData({
    url: '/api/corporate/deleteAll',
    method: 'put',
    data
})
}
export async function updateCorporates (data) {
    return ApiService.fetchData({
        url: '/api/corporate',
        method: 'put',
        data
    })
    }