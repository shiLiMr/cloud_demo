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
// 近30天销售趋势
export interface thiretyData {
    last30Days: string[];
    orderNumList: number[];
    rechargeMoneyList: number[];
    returnMoneyList: number[];
    saleMoneyList: number[];
}

// 会员消费Top10
export interface fourDataType {
    consumeMoney: number;
    name: string;
}