import ApiService from "@/services/ApiService"

export async function fetchTaskCheckList (data) {
    return ApiService.fetchData({
        url: '/api/whms/task/all',
        method: 'post',
        data
    })
}
export async function fetchTaskCheckListByCategory (params) {
    return ApiService.fetchData({
        url: '/api/whms/task/byCategory',
        method: 'get',
        params
    })
}
export async function addTaskCheckList (data) {
    return ApiService.fetchData({
        url: '/api/whms/task',
        method: 'post',
        data
    })
}
export async function getTaskbyId (params) {
    return ApiService.fetchData({
        url: '/api/whms/task/byId',
        method: 'get',
        params
    })
}
export async function updateTask (data) {
    return ApiService.fetchData({
        url: '/api/whms/task',
        method: 'put',
        data
    })
}
export async function deleteTask (params) {
    return ApiService.fetchData({
        url: '/api/whms/task/',
        method: 'delete',
        params
    })
}