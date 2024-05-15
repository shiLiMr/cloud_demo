
import request from "@/utils/htttp";

// 角色；列表 数据请求



import type {RolelistParams,RolelistType,addRole} from "@/api/types/rolesType";

export const  getRoleListApi=(roleData:RolelistParams)=>{
    return request<RolelistType>('/system/role/search','POST',roleData)
}

// 角色；删除 数据请求 /system/role/{id}
export const  deleteRoleApi=(id:string)=>{
    return request('/system/role/'+id,'DELETE')
}

// 角色；新增 数据请求 /system/role
export const  addRoleApi=(roleData:addRole)=>{
    return request('/system/role','POST',roleData)
}
// 角色 编辑 数据请求 /system/role
export const  editRoleApi=(roleData:addRole)=>{
    return request('/system/role','PUT',roleData)
}