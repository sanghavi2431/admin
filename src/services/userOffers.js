import ApiService from './ApiService';

export async function fetchUserOffers (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/getUserOffer',
        method: 'post',
        data
    })
}
export async function deleteUserOffer (params) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/deleteUserOfferById',
        method: 'put',
        params
    })
}
export async function getUserOfferById (params) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/fetchUserOfferByID',
        method: 'get',
        params
    })
}
export async function editUserOffer (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/updateUserOffer',
        method: 'put',
        data
    })
}
export async function addUserOffer (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/addUserOffer',
        method: 'post',
        data
    })
}
export async function getOffer (params) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/getOffer',
        method: 'get',
        params
    })
}