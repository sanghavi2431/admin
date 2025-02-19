import ApiService from "@/services/ApiService"

export async function fetchJanitors (data) {
    return ApiService.fetchData({
        url: '/api/whms/users/getAllUser',
        method: 'post',
        data
    })
}
export async function deleteJanitor (params) {
    return ApiService.fetchData({
        url: '/api/whms/users/deleteUser',
        method: 'delete',
        params
    })
}
export async function addJanitor (data) {
    return ApiService.fetchData({
        url: '/api/whms/users/addUser',
        method: 'post',
        data
    })
}
export async function updateJanitor (data) {
    return ApiService.fetchData({
        url: '/api/whms/users/updateUser',
        method: 'put',
        data
    })
}
export async function getJanitorById (params) {
    return ApiService.fetchData({
        url: '/api/whms/users/getUserByID',
        method: 'get',
        params
    })
}