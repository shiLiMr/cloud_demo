

import   request  from '@/utils/htttp'

import type {getGoodsLists,GoodsListData,Data,getGoodsCategory,addListType} from '@/api/types/listType'
// 获取商品列表
export const  getGoodsListApi=(data: getGoodsLists)=> {
    return request<Data>('/goods/search',"POST",data)
}
// 商品分类 数据 /goods/category/list
export const  getGoodsCategoryApi=()=> {
    return request('/goods/category/list',"GET")
}
// 商品分类  添加数据 /goods
export const  getGoodsCategoryAddApi=(data:addListType)=> {
    return request('/goods',"POST",data)
}
// 商品分类你 修改 数据  /goods
export const  getGoodsCategoryEditApi=(data:addListType)=> {
    return request('/goods',"PUT",data)
}
// 商品分类删除 /goods/{id}
export const  getGoodsCategoryDeleteApi=(ids:string )=> {
    return request('/goods/'+ids,"DELETE")
}
// 修改商品状态  /goods/status
interface editGoodsStatus {
    id: number;
    status: number;
}
export const  getGoodsStatusApi=(data:editGoodsStatus)=> {
    return request('/goods/status',"PUT",data)
}

// 上传图片 /system/media/upload/img
export interface getImagesI {
    data?: string;
    file?: string;
}
export const  getImagesApi=()=> {
    return request('/system/media/upload/img',"POST",{}, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
}