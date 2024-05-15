// 
//  角色 管理  数据类型

export interface RolelistType {
    records: Record[];
    total: number;
}

export interface Record {
    createTime: string;
    id: number;
    remark: string;
    roleCode: string;
    roleName: string;
    status: boolean;
    updateTime: string;
}
export interface RolelistParams {
     /**
     * 页码
     */
     current: number;
     /**
      * 角色名称
      */
     name: string;
     /**
      * 条数
      */
     size: number;
}

/// 添加 role 参数 
export interface addRole {
    id?:string|number;
    createTime?:string;
    updateTime?:string;
    /**
     * 备注
     */
    remark: string;
    /**
     * 角色编码
     */
    roleCode: string;
    /**
     * 角色名称
     */
    roleName: string;
    /**
     * 角色状态
     */
    status: boolean;
  }