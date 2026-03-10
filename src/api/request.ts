import axios, { type AxiosRequestConfig } from 'axios'

import { ElMessage } from 'element-plus'

import config from '@/config'

type ApiResponse<T> = {
    code: number
    data: T
    msg?: string
}

type RequestOptions<T = unknown> = AxiosRequestConfig & {
    mock?: boolean
    data?: any
}

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
    (response) => {
        const { code, data, msg } = response.data as ApiResponse<any>
        if (code === 200) {
            return data
        }
        else {
            ElMessage.error(msg || NETWORK_ERROR)
            return Promise.reject(new Error(msg || NETWORK_ERROR))
        }
    },
    (error) => {
        return Promise.reject(error)
    }
);

function request<T = unknown>(options: RequestOptions<T>) {
    options.method = options.method || "get"
    // 统一请求参数格式
    if ((options.method as string).toLowerCase() === "get") {
        (options as any).params = (options as any).data
    }
    // mock开关  
    let isMock = config.mock
    if (typeof options.mock !== "undefined") {
        isMock = options.mock
    }
    let baseURL: string
    // 针对环境做一个处理
    if (config.env === "prod") {

        baseURL = config.baseApi
    } else {
        baseURL = isMock ? config.mockApi : config.baseApi
    }


    return service({
        baseURL,
        ...options
    }) as unknown as Promise<T>
}

export default request