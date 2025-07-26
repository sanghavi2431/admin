import ApiService from "@/services/ApiService"

export async function fetchClients (data) {
    return ApiService.fetchData({
        url: '/api/whms/clients/getClients',
        method: 'post',
        data
    })
}
export async function deleteClient (params) {
    return ApiService.fetchData({
        url: '/api/whms/clients/deleteClientById',
        method: 'put',
        params
    })
}
export async function getClientById (params) {
    return ApiService.fetchData({
        url: '/api/whms/clients/getClientById',
        method: 'get',
        params
    })
}
export async function updateClient (data) {
    return ApiService.fetchData({
        url: '/api/whms/clients/updateClient',
        method: 'put',
        data
    })
}
export async function getClientTypes (params) {
    return ApiService.fetchData({
        url: '/api/whms/clients/getClientTypes',
        method: 'get',
        params
    })
}
export async function insertClient (data) {
    return ApiService.fetchData({
        url: '/api/whms/clients/insertClient',
        method: 'post',
        data
    })
}
export async function getClientId (params) {
    return ApiService.fetchData({
        url: '/api/whms/users/client',
        method: 'get',
        params
    })
}
export async function setUpClientFacility (data) {
    return ApiService.fetchData({
        url: '/api/whms/clients/clientSetUp',
        method: 'post',
        data
    })
}
export async function deleteClientSetup (data) {
    return ApiService.fetchData({
        url: '/api/whms/clients/deleteSetUp',
        method: 'delete',
        data
    })
}