import ApiService from './ApiService';

export async function fetchAllOffer (data) {
    return ApiService.fetchData({
        url: '/api/offer/getAllOffer',
        method: 'post',
        data
    })
}
export async function deleteOffer(params) {
    return ApiService.fetchData({
        url: '/api/offer/deleteOfferById',
        method: 'put',
        params
    })
}
export async function insertOffer (data) {
    return ApiService.fetchData({
        url: '/api/offer/createOffer',
        method: 'post',
        data
    })
}
export async function getOfferbyId (params) {
    return ApiService.fetchData({
        url: '/api/offer/getOfferByID',
        method: 'get',
        params
    })
}
export async function updateOffer (data) {
    return ApiService.fetchData({
        url: '/api/offer/updateOffer',
        method: 'put',
        data
    })
}
