import ApiService from "@/services/ApiService"

export async function getRatingReview(params) {
    return ApiService.fetchData({
        url: '/api/whms/feedback/ratingReviewGraph',
        method: 'get',
        params
    })
}

