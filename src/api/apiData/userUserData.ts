import request from "../request";

export type User = {
    id: number | string
    name: string
    addr: string
    age?: number
    birth: string
    sex: 0 | 1
}
export type NewUser = Omit<User, "id">       //User.vue里的表单数据类型要用到
type GetUserResp = {
    list: User[]
    count: number
}
type GetDataType = {
    name: string
    total: number
    page: number
}

export function getUserData(data: GetDataType): Promise<GetUserResp> {
    return request<GetUserResp>(
        {
            url: "/user/getUserData",
            method: "get",
            data,
        }
    )
}

export function deleteUser(data: { id: User['id'] }): Promise<string> {
    return request<string>(
        {
            url: "/user/deleteUser",
            method: "get",
            data,
        }
    )
}

export function addUser(data: NewUser): Promise<string> {
    return request<string>(
        {
            url: 'user/addUser',
            method: 'post',
            data
        }
    )
}

export function editUser(data: User): Promise<string> {
    return request<string>(
        {
            url: 'user/editUser',
            method: 'post',
            data
        }
    )
}



