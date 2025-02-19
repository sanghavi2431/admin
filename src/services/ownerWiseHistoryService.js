import ApiService from './ApiService';

export async function getOwnerWise_History (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/owner-wise-history',
        method: 'post',
        data
    })
}