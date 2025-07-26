import ApiService from "@/services/ApiService"

export async function fetchRoles (data) {
    return ApiService.fetchData({
        url: '/api/roles/all',
        method: 'post',
        data
    })
}
export async function addNewRole (data) {
    return ApiService.fetchData({
        url: '/api/roles',
        method: 'post',
        data
    })
}
export async function delete_Role (params) {
    return ApiService.fetchData({
        url: '/api/roles/delete',
        method: 'put',
        params
    })
}
export async function getRolebyId (params) {
    return ApiService.fetchData({
        url: '/api/roles',
        method: 'get',
        params
    })
}
export async function update_role (data) {
    return ApiService.fetchData({
        url: '/api/roles',
        method: 'put',
        data
    })
}