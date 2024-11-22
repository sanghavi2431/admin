import ApiService from './ApiService';

export async function fetchBlogs (data) {
    return ApiService.fetchData({
        url: '/api/blog/getBlogs',
        method: 'post',
        data
    })
}
export async function fetchAllCategories (data) {
    return ApiService.fetchData({
        url: '/api/blog/getAllCategories',
        method: 'post',
        data
    })
}
export async function fetchAllSubCategories (data) {
    return ApiService.fetchData({
        url: '/api/blog/getAllSubCategories',
        method: 'post',
        data
    })
}
export async function deleteBlogCategory (params) {
    return ApiService.fetchData({
        url: '/api/blog/deleteBlogCategory',
        method: 'put',
        params
    })
}
export async function insertBlogCategory (data) {
    return ApiService.fetchData({
        url: '/api/blog/insertBlogCategory',
        method: 'post',
        data
    })
}
export async function getCategoriesbyId (params) {
    return ApiService.fetchData({
        url: '/api/blog/getCategoriesbyId',
        method: 'get',
        params
    })
}
export async function update_BlogCategory (data) {
    return ApiService.fetchData({
        url: '/api/blog/updateBlogCategory',
        method: 'put',
        data
    })
}
export async function insert_blog_Subcategory (data) {
    return ApiService.fetchData({
        url: '/api/blog/insert_blog_Subcategory',
        method: 'post',
        data
    })
}
export async function deleteBlogSubCategory (params) {
    return ApiService.fetchData({
        url: '/api/blog/deleteBlogSubCategory',
        method: 'put',
        params
    })
}
export async function updateBlogSubCategory (data) {
    return ApiService.fetchData({
        url: '/api/blog/updateBlogSubCategory',
        method: 'put',
        data
    })
}
export async function getSubCategoriesbyId (params) {
    return ApiService.fetchData({
        url: '/api/blog/getSubCategoriesbyId',
        method: 'get',
        params
    })
}
export async function deleteBlog (params) {
    return ApiService.fetchData({
        url: '/api/blog/deleteBlog',
        method: 'put',
        params
    })
}
export async function getBlogs_byId (params) {
    return ApiService.fetchData({
        url: '/api/blog/getBlogs_byId',
        method: 'get',
        params
    })
}
export async function updateBlog (data) {
    return ApiService.fetchData({
        url: '/api/blog/update_Blog',
        method: 'put',
        data
    })
}
export async function create_Blog (data) {
    return ApiService.fetchData({
        url: '/api/blog/create_Blog',
        method: 'post',
        data
    })
}