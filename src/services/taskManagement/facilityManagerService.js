import ApiService from "@/services/ApiService"

export async function addFacilityManager (data) {
    return ApiService.fetchData({
        url: '/api/whms/users/addFacilityManager',
        method: 'post',
        data
    })
}
export async function getAllFacilityManager (data) {
    return ApiService.fetchData({
        url: '/api/whms/users/getAllFacilityManager',
        method: 'post',
        data
    })
}