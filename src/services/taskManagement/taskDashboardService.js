import ApiService from "@/services/ApiService"

export async function fetchTask (data) {
    return ApiService.fetchData({
        url: '/api/whms/taskAllocation/all',
        method: 'post',
        data
    })
}