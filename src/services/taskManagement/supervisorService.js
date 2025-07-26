import ApiService from "@/services/ApiService"

export async function fetchSupervisor (data) {
    return ApiService.fetchData({
        url: '/api/whms/users/getAllUser',
        method: 'post',
        data
    })
}
export async function deleteSupervisor (params) {
    return ApiService.fetchData({
        url: '/api/whms/users/deleteUser',
        method: 'delete',
        params
    })
}
export async function addSupervisor (data) {
    return ApiService.fetchData({
        url: '/api/whms/users/addUser',
        method: 'post',
        data
    })
}
export async function updateSupervisor (data) {
    return ApiService.fetchData({
        url: '/api/whms/users/updateUser',
        method: 'put',
        data
    })
}
export async function getSupervisorById (params) {
    return ApiService.fetchData({
        url: '/api/whms/users/getUserByID',
        method: 'get',
        params
    })
}