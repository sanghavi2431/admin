import ApiService from './ApiService';

export async function fetchVoucher (data) {
    return ApiService.fetchData({
        url: '/api/voucher/all',
        method: 'post',
        data
    })
}
export async function getDownloadLink (data) {
    return ApiService.fetchData({
        url: '/api/voucher/download',
        method: 'post',
        data
    })
}
export async function getVoucherById (params) {
    return ApiService.fetchData({
        url: '/api/voucher',
        method: 'get',
        params
    })
}
export async function getCorporate (params) {
    return ApiService.fetchData({
        url: '/api/voucher/corporateVoucher',
        method: 'get',
        params
    })
}
export async function getSubscription (params) {
    return ApiService.fetchData({
        url: '/api/voucher/subscriptionVoucher',
        method: 'get',
        params
    })
}
export async function getSubscriptionbyId (params) {
    return ApiService.fetchData({
        url: '/api/voucher/getPriceByID',
        method: 'get',
        params
    })
}
export async function deleteVoucher (params) {
    return ApiService.fetchData({
        url: '/api/voucher/delete',
        method: 'put',
        params
    })
}
export async function createVoucher (data) {
    return ApiService.fetchData({
        url: '/api/voucher/create',
        method: 'post',
        data
    })
}
export async function deleteBulkVouchers (data) {
    return ApiService.fetchData({
        url: '/api/voucher/bulkdelete',
        method: 'put',
        data
    })
}

export async function getVoucherUser (data) {
    return ApiService.fetchData({
        url: '/api/voucher/no_of_users',
        method: 'post',
        data
    })
}
export async function createPO (data) {
    return ApiService.fetchData({
        url: '/api/voucher/po_upload',
        method: 'post',
        data
    })
}
export async function deactivate_voucher (data) {
    return ApiService.fetchData({
        url: '/api/voucher/deactivate_voucher',
        method: 'put',
        data
    })
}
export async function update_no_of_uses (data) {
    return ApiService.fetchData({
        url: '/api/voucher/update_no_of_uses',
        method: 'put',
        data
    })
}
export async function getVoucherUsage (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/userVoucherUsage',
        method: 'post',
        data
    })
}
