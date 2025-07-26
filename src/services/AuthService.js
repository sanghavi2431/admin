import ApiService from './ApiService'

export async function apiSignIn (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/login',
        method: 'post',
        data
    })
}

export async function apiSignUp (data) {
    return ApiService.fetchData({
        url: '/sign-up',
        method: 'post',
        data
    })
}
export async function getUser_id (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/createClient',
        method: 'post',
        data
    })
}
export async function clientSignUp (data) {
    return ApiService.fetchData({
        url: '/api/whms/clients/clientSignUp',
        method: 'post',
        data
    })
}
export async function apiSignOut (data) {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
        data
    })
}

export async function apiForgotPassword (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/forgetPassword',
        method: 'post',
        data
    })
}

export async function apiResetPassword (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/resetPassword',
        method: 'post',
        data
    })
}
export async function apiFacilitySignIn (data) {
    return ApiService.fetchData({
        url: '/api/whms/users/login',
        method: 'post',
        data
    })

}
export async function apiMobileSignIn (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/sendOTPForHost',
        method: 'post',
        data
    })

}
export async function apiMobileVerifyOTP (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/verifyOTPForHost',
        method: 'post',
        data
    })

}
export async function apiClientSendOTP (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/sendOTPForClient',
        method: 'post',
        data
    })

}
export async function apiClientVerifyOTP (data) {
    return ApiService.fetchData({
        url: '/api/wolooGuest/verifyOTPForClient',
        method: 'post',
        data
    })

}