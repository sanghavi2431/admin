import ApiService from './ApiService';

export async function getAllTransaction (data) {
    return ApiService.fetchData({
        url: '/api/transaction/',
        method: 'post',
        data
    })
}
export async function getTransactionbyId (params) {
    return ApiService.fetchData({
        url: '/api/transaction/getTransactionById',
        method: 'get',
        params
    })
}