/*

// 1、安装asxios
// 2、引入axios
// 3、创建axios实例
// 4、请求拦截、
// 5、响应拦截
// 6、导出封装实例
import axios from 'axios'
console.log('VITE_APP_BASE_API',import.meta.env) //
const http = axios.create({
    // baseURL:'/dev-api',  // localhost:7777
    baseURL:import.meta.env.VITE_APP_BASE_API,
    timeout:10000,
})
// 请求拦截
http.interceptors.request.use((config)=>{
    return config
},err=>{
    return Promise.reject(err)
})
// 响应拦截
http.interceptors.response.use((response)=>{
    return response
},error=>{
    return Promise.reject(error)
})
export default http;

*/

import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig, type Method, type AxiosRequestConfig } from 'axios'
// 创建sxios实例
const server: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // baseURL: 'https://mock.mengxuegu.com/mock/66389f12cab9671f88bd30ef/api',
    timeout: 10000,
})
// 请求拦截
server.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    return config
}, (err: AxiosError) => {
    return Promise.reject(err)
})
// 响应拦截
server.interceptors.response.use((response: AxiosResponse) => {
    return response
}, (error: AxiosError) => {
    return Promise.reject(error)
})
// 返回参数接口
type DataType<T = any> ={
    code: number,
    msg: string,
    data: T
}

// 完整请求
const request = <T = any>(url: string, method: Method = 'GET', data?: Object,
    options?: AxiosRequestConfig
) => {
    return server.request<T, DataType<T>>({
        url,
        method,
        [method === "GET" ? "params" : "data"]: data,
        ...options,
    })
}
// 封装get、post、put、delete请求
export const get = <T = any>(url: string, data: Object={}) => {
    request<T>(url, 'GET', data)
}
export const post = <T = any>(url: string, data: Object={}) => {
    request<T>(url, 'POST', data)
}
export const put = <T = any>(url: string, data: Object={}) => {
    request<T>(url, 'PUT', data)
}
export const del = <T = any>(url: string, data: Object={}) => {
    request<T>(url, 'DELETE', data)
}

// 导出封装实例
export default request