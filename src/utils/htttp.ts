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