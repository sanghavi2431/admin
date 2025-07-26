import ApiService from './ApiService';

export async function getOwner_History (data) {
    return ApiService.fetchData({
        url: '/api/wolooHost/ownerHistory',
        method: 'post',
        data
    })
}
export async function export_excel (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/export',
        method: 'post',
        data
    })
}