import ApiService from './ApiService';

export async function fetchUsers (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/all',
        method: 'post',
        data
    })
}
export async function deleteUser (params) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/delete',
        method: 'put',
        params
    })
}
export async function getUserById (params) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/byId',
        method: 'get',
        params
    })
}
export async function editUser (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest',
        method: 'put',
        data
    })
}
export async function addUser (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/create',
        method: 'post',
        data
    })
}
export async function deleteBulkUsers (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/bulkdelete',
        method: 'put',
        data
    })
}
export async function fetchRoles (params) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/getRoles',
        method: 'get',
        params
    })
}