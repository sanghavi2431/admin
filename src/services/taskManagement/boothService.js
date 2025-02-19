import ApiService from "@/services/ApiService"

export async function getFacility (params) {
    return ApiService.fetchData({
        url: '/api/whms/facilities/getFacilitiesByBlockId',
        method: 'get',
        params
    })
}
export async function get_Booths (params) {
    return ApiService.fetchData({
        url: '/api/whms/booths',
        method: 'get',
        params
    })
}