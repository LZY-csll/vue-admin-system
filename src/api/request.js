import axios from 'axios'

import { ElMessage } from 'element-plus'

import config from '@/config'

const service = axios.create({
    baseURL: config.baseApi
})
const NETWORK_ERROR = "网络错误。。。"
// 添加请求拦截器
service.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

// 添加响应拦截器
service.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
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
        // 生产环境不能用mock
        baseURL = config.baseApi
    } else {
        baseURL = isMock ? config.mockApi : config.baseApi
    }
    // console.log(options.url);
    // console.log(options.data);

    return service({
        baseURL,
        ...options
    })
}

export default request