
// 
import request from "@/utils/htttp";
import type { yingyeshujuType,categoryDataType,thiretyData,fourDataType } from '@/api/types/indexType'

// 营业数据统计  /home/statistics
export const getstatisticsApi = () => {
    return request<yingyeshujuType>("/home/statistics","GET");
}

// 分类销售统计 /home/categoryData
export const getcategoryDataApi = () => {
    return request<categoryDataType>("/home/categoryData","GET");
}
// 近30天销售趋势 /home/30days/saleData
export const get30daysApi = () => {
    return request<thiretyData>("/home/30days/saleData","GET");
}
// 会员消费Top10  /home/member/top10

export const getmemberApi = () => {
    return request<fourDataType>("/home/member/top10","GET");
}