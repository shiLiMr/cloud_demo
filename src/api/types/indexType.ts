// 营业数据 统计 类型
export interface yingyeshujuType {
    code: number;
    data: Data;
    message: string;
}
export interface Data {
    totalIncomeMoney: number;
    totalOrderNum: number;
    totalReturnedMoney: number;
    totalSaleMoney: number;
}

// 分类销售数据  /home/categoryData
export interface categoryDataType {
    code: number;
    data: Datum[];
    message: string;
}

export interface Datum {
    name: string;
    value: number;
}


