
// 商品分类数据类型
export interface getcateGoryListI {
    current: number;
    name: string;
    size: number;
}
// 商品分类数据类型


export interface cateGoryListType {
    records: Record[];
    total: number;
}

export interface Record {
    id: number;
    name: string;
    remark: string;
    sort: number;
    status: boolean;
}
