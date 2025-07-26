import ApiService from "@/services/ApiService"

export async function fetchTemplate (data) {
    return ApiService.fetchData({
        url: '/api/whms/template/all',
        method: 'post',
        data
    })
}
export async function addTemplate (data) {
    return ApiService.fetchData({
        url: '/api/whms/template',
        method: 'post',
        data
    })
}
export async function deleteTemplate (params) {
    return ApiService.fetchData({
        url: '/api/whms/template/',
        method: 'delete',
        params
    })
}
export async function getTemplate (params) {
    return ApiService.fetchData({
        url: '/api/whms/template/byId',
        method: 'get',
        params
    })
}
export async function updateTemplate (data) {
    return ApiService.fetchData({
        url: '/api/whms/template/',
        method: 'put',
        data
    })
}
export async function createTaskTemplate (data) {
    return ApiService.fetchData({
        url: '/api/whms/template/add',
        method: 'post',
        data
    })
}