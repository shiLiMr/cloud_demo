<template>
    <div class="category index-main">
        <div class="category-top">
            <el-form :model="SearchForm" label-width="auto" style="max-width: 600px" :inline="true">
                <el-form-item label="菜单名称:">
                    <el-input v-model="SearchForm.name" placeholder="请输入菜单名称" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="Search" @click="Search">查询</el-button>
                    <el-button type="success" icon="Plus" @click="addMenu">新建菜单</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 表格 -->
        <categoryList :tableData="tableData" :columns="columns">
            <!-- 分类状态插槽 -->
            <template #status="{ row }">
                <el-tag :type="row.status ? 'success' : 'warning'">{{ row.status ? '启用' : '禁用' }}</el-tag>
            </template>
            <!-- 操作 插槽 -->
            <template #options="{ row }">
                <el-button type="primary" link icon="edit">编辑</el-button>
                <el-button type="danger" link icon="delete">删除</el-button>
            </template>
        </categoryList>
        <!-- 分页 -->
        <el-row justify="end" style="margin-top: 20px">
            <el-pagination v-model:current-page="SearchForm.current" v-model:page-size="SearchForm.size"
                :page-sizes="[10, 20, 30, 50]" layout="total, sizes, prev, pager, next  " :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-row>
    </div>
</template>
<script setup lang='ts'>
import { ref, reactive, } from 'vue';
import type { getcateGoryListI, cateGoryListType, Record } from '@/api/types/categoryType'
import { getcateGoryList } from '@/api/goods/category'
import { defineAsyncComponent } from 'vue';
const categoryList = defineAsyncComponent(() => import('@/components/category.vue'))


const SearchForm = ref({ // 查询表单
    name: '',
    current: 1,
    size: 10,
})
const columns = [
    {
        label: '分类名称',
        prop: 'name',
        align: 'center',
    },
    {
        label: '分类状态',
        prop: 'status',
        type: 'status',
        align: 'center',
    },
    {
        label: '排序号',
        prop: 'id',
        align: 'center',
    },
    {
        label: '备注信息',
        prop: 'remark',
        align: 'center',
    },
    {
        label: '操作',
        type: 'options',
        align: 'center',
    },
]
const tableData = ref<Record[]>([]) // 表格数据
const total = ref<number>(0)// 总条数
const getMenuListData = async () => {
    try {
        const res = await getcateGoryList(SearchForm.value)
        console.log(res)
        tableData.value = res.data.records
        total.value = res.data.total
    } catch (error) {
        console.log(error);

    }
}
getMenuListData()
const Search = () => { //搜索
    tableData.value = []
    getMenuListData()
}
const addMenu = () => {
    console.log('新建菜单')
}
const handleSizeChange = (val: number) => { // 每页条数改变
    SearchForm.value.size = val
    getMenuListData()
}
const handleCurrentChange = (val: number) => { // 当前页改变
    SearchForm.value.current = val
    getMenuListData()
}



</script>
<style lang='scss' scoped></style>