import request from "../request"

// 登录相关请求
type Params = {
    username: string
    password: string
}
export type MenuItem = {
    path: string
    name: string
    label: string
    icon: string
    url: string
    children?: MenuItem[]
}
type LoginResp = {
    menuList: MenuItem[]
    token: string
}
export function getMenu(params: Params): Promise<LoginResp> {
    return request<LoginResp>({
        url: '/permission/getMenu',
        method: 'post',
        data: params
    })
}