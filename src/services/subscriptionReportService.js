import ApiService from './ApiService';

export async function getSubscriptionReport (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/reportSubscription',
        method: 'post',
        data
    })
}
export async function getCorporate (params) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/corporateList',
        method: 'get',
        params
    })
}