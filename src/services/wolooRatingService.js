import ApiService from './ApiService';

export async function getWolooUserRatings (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/userWoloooRating',
        method: 'post',
        data
    })
}