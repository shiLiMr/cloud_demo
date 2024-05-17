import request from '@/utils/htttp'
// user 用户管理 接口 
import type { RecordData, getUserList,addUserlist,Userlust,editUserlist } from '@/api/types/userType'

// 请求 用户列表数据 /system/user/search
export const getUserListApi = (data: getUserList) => {
    return request<RecordData>('/system/user/search','POST',data)
}

// 请求 删除用户 /system/user/{id}
export const deleteUserApi = (id: number) => {
    return request('/system/user/'+id,'DELETE')
}

// 请求 分配角色 列表 /system/role/list
export const getRoleListApi = () => {
    return request('/system/role/list','GET')
}

// 添加用户 /system/user
export const addUserApi = (data: addUserlist) => {
    return request<Userlust>('/system/user','POST',data)
}
// 修改 用户 /system/user
export const updateUserApi = (data: editUserlist) => {
    return request<Userlust>('/system/user','PUT',data)
}