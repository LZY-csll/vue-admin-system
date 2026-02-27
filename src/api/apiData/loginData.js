import request from "../request"
// 登录相关请求
export function getMenu(params) {
    return request({
        url: '/permission/getMenu',
        method: 'post',
        data: params
    })
}