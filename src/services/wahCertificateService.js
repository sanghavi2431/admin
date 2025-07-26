import ApiService from './ApiService';

export async function fetchWolooCerticate(params) {
    return ApiService.fetchData({
      url: `/api/wolooGuest/wahcertificate`,
      method: 'get',
      params: {
        woloo_id: params.wolooId,
      },
    });
  }

// export async function fetchWolooCerticate (params) {
//     return ApiService.fetchData({
//         config: {
//             baseURL: 'https://dev-api.woloo.in:301',
//             url: '/api/wolooGuest/wahcertificate/wolooId',
//             method: 'get',
//             params
//         }
//     })
// }