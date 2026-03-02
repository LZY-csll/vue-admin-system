import axios from 'axios'

import { ElMessage } from 'element-plus'

import config from '@/config'

const service = axios.create({
    baseURL: config.baseApi
})
const NETWORK_ERROR = "网络错误。。。"
// 请求拦截器
service.interceptors.request.use(
    function (config) {

        return config;
    },
    function (error) {

        return Promise.reject(error);
    });

// 响应拦截器
service.interceptors.response.use(
    function (response) {

        const { code, data, msg } = response.data
        if (code === 200) {
            return data
        }
        else {
            const NETWORK_ERROR = "网络错误。。。"
            ElMessage.error(msg || NETWORK_ERROR)
        }
    }
);

function request(options) {
    options.method = options.method || "get"
    // 统一请求参数格式
    if (options.method.toLowerCase() === "get") {
        options.params = options.data
    }
    // mock开关  
    let isMock = config.mock
    if (typeof options.mock !== "undefined") {
        isMock = options.mock
    }
    let baseURL
    // 针对环境做一个处理
    if (config.env === "prod") {

        baseURL = config.baseApi
    } else {
        baseURL = isMock ? config.mockApi : config.baseApi
    }


    return service({
        baseURL,
        ...options
    })
}

export default request