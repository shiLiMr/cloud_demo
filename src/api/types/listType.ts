
// 请求商品列表参数类型
export interface getGoodsLists {
    current: number;
    keyword?: string;
    size: number;
    status?: string;
}
// 商品列表返回参数类型
export interface GoodsListData {
    code: number;
    data: Data;
    message: string;
}
export interface Data {
    records: Record[];
    total: number;
}
export interface Record {
    address: string;
    brand: string;
    categoryId: number;
    categoryName: string;
    code: number;
    cost: number;
    createTime: string;
    discountPrice: number;
    goodsDetail: string;
    id: number;
    imageUrl: string;
    name: string;
    price: number;
    quickCode: string;
    remark: string;
    score: number;
    sort: number;
    specsName: string;
    status: number;
    stockNum: number;
    unitName: string;
    updateTime: string;
}

// 商品分类
export interface getGoodsCategory {
    code: number;
    data: Datumcate[];
    message: string;
}

export interface Datumcate {
    categoryId: number;
    categoryName: string;
}
// 添加数据 类型
// 修啊数据 类型

export interface addListType {
    address: string;
    brand: string;
    categoryId: number|null;
    code: string;
    cost: number |null;
    discountPrice: number |null;
    goodsDetail: string;
    imageUrl: string;
    name: string;
    price: number |null;
    quickCode: string;
    remark: string;
    score: number |null;
    sort: number|null;
    specsName: string;
    status: number|string;
    stockNum: null |number;
    unitName: string;
    categoryName?: string;
    id?: number;

}
