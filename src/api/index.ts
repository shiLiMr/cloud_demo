
import request from '../utils/htttp'

// 登录接口
interface loginI { // 返回参数类型接口
    code: number,
    msg: string,
    token: string
}
export const loginApi = () => {
    return request<loginI>('/login',"GET")
}
// 获取meun
interface liI{
    name: string,
    path: string,
}
interface menuI { // 返回参数类型接口
    code: number,
    list : liI[]
}
export const getMenuApi = () => {
    return request<menuI>('/menus',"GET")
}