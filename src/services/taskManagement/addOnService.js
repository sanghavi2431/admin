import ApiService from "@/services/ApiService"

export async function fetchAddonIOTData (data) {
    return ApiService.fetchData({
        url: '/api/whms/addOn/getAddon',
        method: 'post',
        data
    })
}
export async function deleteAddonIOT (params) {
    return ApiService.fetchData({
        url: '/api/whms/addOn/deleteAddonById',
        method: 'put',
        params
    })
}
export async function insertAddonIOT (data) {
    return ApiService.fetchData({
        url: '/api/whms/addOn/insertAddon',
        method: 'post',
        data
    })
}
export async function getdisplayAddons (params) {
    return ApiService.fetchData({
        url: '/api/whms/addOn/getdisplayAddons',
        method: 'get',
        params
    })
}
