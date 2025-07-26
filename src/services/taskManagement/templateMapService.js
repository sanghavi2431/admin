import ApiService from "@/services/ApiService"

export async function addTemplateMap (data) {
    return ApiService.fetchData({
        url: '/api/whms/autoTaskMapping/createAutoTaskMapping',
        method: 'post',
        data
    })
}
export async function fetchTemplateMap (data) {
    return ApiService.fetchData({
        url: '/api/whms/autoTaskMapping/getAllAutoTaskMapping',
        method: 'post',
        data
    })
}
export async function deleteTemplateMap (params) {
    return ApiService.fetchData({
        url: '/api/whms/autoTaskMapping/deleteAutoTaskMapping',
        method: 'delete',
        params
    })
}
export async function get_TemplateMapbyId (params) {
    return ApiService.fetchData({
        url: '/api/whms/autoTaskMapping/getAutoTaskMappingById',
        method: 'get',
        params
    })
}
export async function updateTemplate_Mapping (data) {
    return ApiService.fetchData({
        url: '/api/whms/autoTaskMapping/updateAutoTaskMapping',
        method: 'put',
        data
    })
}
export async function uploadAutoTaskMapping (data) {
    return ApiService.fetchData({
        url: '/api/whms/autoTaskMapping/uploadAutoTaskMapping',
        method: 'post',
        data
    })
}
export async function downloadAutoTaskMappingSampleSheet (data) {
    return ApiService.fetchData({
        url: '/api/whms/autoTaskMapping/downloadAutoTaskMappingSampleSheet',
        method: 'post',
        data
    })
}
export async function downloadTemplateMappingUploadTemplate (params) {
    return ApiService.fetchData({
        url: '/api/whms/autoTaskMapping/download-AutoTaskMapping-Template',
        method: 'get',
        params,
        responseType: 'blob'
    })
}
export async function uploadTemplateMappingFile (data) {
    return ApiService.fetchData({
        url: '/api/whms/autoTaskMapping/upload-AutoTaskMapping-Template',
        method: 'post',
        data
    })
}