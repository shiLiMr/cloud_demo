
// 商品分类
import request from '@/utils/htttp'

import type { getcateGoryListI,cateGoryListType } from '@/api/types/categoryType'

// 获取商品分类列表 /goods/category/search

export const getcateGoryList = (data: getcateGoryListI) => {
    return request<cateGoryListType>('/goods/category/search',"POST",  data )
}