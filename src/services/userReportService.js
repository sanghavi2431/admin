import ApiService from './ApiService';

export async function getUsersReport (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/getUsersReport',
        method: 'post',
        data
    })
}