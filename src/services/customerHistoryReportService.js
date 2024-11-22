import ApiService from './ApiService';

export async function get_Customer_History (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/customerHistory',
        method: 'post',
        data
    })
}
export async function getPointsSource (params) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/pointsSource',
        method: 'get',
        params
    })
}
export async function getUsersList (params) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/usersList',
        method: 'get',
        params
    })
}