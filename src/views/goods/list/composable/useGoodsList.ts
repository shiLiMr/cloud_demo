import { getGoodsCategoryDeleteApi, getGoodsListApi, getGoodsStatusApi } from "@/api/goods/list"
import type { getGoodsLists, GoodsListData, Record } from "@/api/types/listType"
import { ElNotification } from "element-plus"

import { defineAsyncComponent, ref } from "vue"
const getlistDialog = defineAsyncComponent(() => import('../components/listsdialog.vue'))


export const useGoodsList = () => {
    const SearchForm = ref<getGoodsLists>({
        keyword: '',
        status: '',
        current: 1,
        size: 10,
    })

    const tableData = ref<Record[]>() // 商品列表数据
    const total = ref<number>(0) //总页数
    const getGoodsList = async () => { // 获取商品列表数据
        const res = await getGoodsListApi(SearchForm.value)
        console.log(res);
        tableData.value = res.data.records
        total.value = res.data.total
    }

    const DeleteOk = (id: string) => { // 删除
        getGoodsCategoryDeleteApi(id).then(res => {
            console.log(res)
            if (res.code === 20000) {
                ElNotification.success(res.message)
                tableData.value = []
                getGoodsList()
            } else {
                ElNotification.error(res.message)
            }
        })
    }
    const OnDelete = () => {
        ElNotification.warning('取消删除！')
    }
    const changeStatus = async (row: Record) => { // 修改商品状态
        const res = await getGoodsStatusApi({ id: row.id, status: row.status })
        console.log(res);
        if (res.code == 20000) {
            ElNotification.success('状态修改成功！')
        }
    }

    //  弹出框
    const listdialog = ref<InstanceType <typeof getlistDialog>>()
    // console.log(listdialog.value);
    
    const addMenu = () => { // 新增商品按钮
        listdialog.value?.openDrawer('add', '新增表单信息') // 调用子组件的打开抽屉方法
    }
    const editMenu = (row: GoodsListData) => { // 编辑商品按钮
        listdialog.value?.openDrawer('edit', '修改商品信息', row)
        console.log(row);

    }


    return {
        SearchForm, tableData, total, getGoodsList, DeleteOk, OnDelete, changeStatus,listdialog,addMenu,editMenu,getlistDialog,
    }
}