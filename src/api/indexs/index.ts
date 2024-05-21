
// 
import request from "@/utils/htttp";
import type { yingyeshujuType,categoryDataType, } from '@/api/types/indexType'

// 营业数据统计  /home/statistics
export const getstatisticsApi = () => {
    return request<yingyeshujuType>("/home/statistics","GET");
}

// 分类销售统计 /home/categoryData
export const getcategoryDataApi = () => {
    return request<categoryDataType>("/home/categoryData","GET");
}

