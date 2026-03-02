import request from "../request";

export function getUserData(data) {
    return request(
        {
            url: "/user/getUserData",
            method: "get",
            data,
        }
    )
}

export function deleteUser(data) {
    return request(
        {
            url: "/user/deleteUser",
            method: "get",
            data,
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



