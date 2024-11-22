import ApiService from './ApiService';

export async function getSetting (params) {
    return ApiService.fetchData({
        url: '/api/setting/getSetting',
        method: 'get',
        params
    })
}
export async function updateSetting (data) {
    return ApiService.fetchData({
        url: '/api/setting',
        method: 'put',
        data
    })
}
export async function addSetting (data) {
    return ApiService.fetchData({
        url: '/api/setting/addNew',
        method: 'post',
        data
    })
}
export async function deleteSetting (params) {
    return ApiService.fetchData({
        url: '/api/setting/deleteSetting',
        method: 'put',
        params
    })
}
