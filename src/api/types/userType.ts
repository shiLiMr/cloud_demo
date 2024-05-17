
// 用户管理 数据类型
export interface getUserList {
    /**
     * 页码
     */
    current: number;
    /**
     * 查询关键字
     */
    keyword: string;
    /**
     * 条数
     */
    size: number;
}
// 列表 请求返回数据类型
export interface RecordData {
    records: Record[];
    total: number;
}

export interface Record {
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    createTime: string;
    credentialsNonExpired: boolean;
    email: string;
    id: number;
    imageUrl: string;
    mobile: string;
    nickName: string;
    password: string;
    remark: string;
    roleIds: number[];
    updateTime: string;
    username: string;
}

// 添加数据类型
export interface addUserlist {
    accountNonExpired: boolean ;
    accountNonLocked: boolean ;
    credentialsNonExpired: boolean ;
    email: string;
    mobile: string;
    nickName: string;
    password: string;
    remark: string;
    roleIds: number[];
    username: string;
}

//角色分配数据
export interface Userlust {
    code: number;
    data: Datum[];
    message: string;
}
export interface Datum {
    id: number;
    roleName: string;
}

// edit 数据类型
export interface editUserlist extends addUserlist {
    id ?: number;
    createTime?: string;
    updateTime?: string;
}
// export type editUserlist   =
// | {
//     id: number;
//     createTime: string;
//     updateTime: string;
//   }
// | addUserlist;

// 重置密码
export interface passwordType {
    newPassword: string;
    repPassword: string;
    userId: number;
}