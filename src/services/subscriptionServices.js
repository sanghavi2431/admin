import ApiService from './ApiService';

export async function fetchSubscription (data) {
    return ApiService.fetchData({
        url: '/api/subscription/all',
        method: 'post',
        data
    })
}
export async function addSubscription (data) {
    return ApiService.fetchData({
        url: '/api/subscription/create',
        method: 'post',
        data
    })
}
export async function getSubscriptionsById (params) {
    return ApiService.fetchData({
        url: '/api/subscription',
        method: 'get',
        params
    })
}
export async function deleteSubscriptions (params) {
    return ApiService.fetchData({
        url: '/api/subscription/delete',
        method: 'put',
        params
    })
}
export async function deleteBulkSubscriptions (data) {
return ApiService.fetchData({
    url: '/api/subscription/bulkdelete',
    method: 'put',
    data
})
}
export async function editSubscription (data) {
    return ApiService.fetchData({
        url: '/api/subscription',
        method: 'put',
        data
    })
    }