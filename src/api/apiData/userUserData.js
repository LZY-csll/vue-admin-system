import request from "../request";

export function getUserData(data) {
    return request(
        {
            url: "/user/getUserData",
            method: "get",
            data,       //data:data es6简写，为什么这里get请求用data，因为request里做了处理，会转为params     
        }
    )
}

export function deleteUser(data) {
    return request(
        {
            url: "/user/deleteUser",
            method: "get",
            data,       //data:data es6简写，为什么这里get请求用data，因为request里做了处理，会转为params     
        }
    )
}

export function addUser(data) {
    return request(
        {
            url: 'user/addUser',
            method: 'post',
            data
        }
    )
}

export function editUser(data) {
    return request(
        {
            url: 'user/editUser',
            method: 'post',
            data
        }
    )
}



