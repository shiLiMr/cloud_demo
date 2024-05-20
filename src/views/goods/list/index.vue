<template>
    <div class="list index-main">
        <div class="list-top">
            <el-form :model="SearchForm" label-width="auto" :inline="true">
                <el-form-item label="名称/编码 :">
                    <el-input v-model="SearchForm.keyword" placeholder="请输入商品名称/编码/简码" clearable />
                </el-form-item>
                <el-form-item label="商品状态 :">
                    <el-select v-model="SearchForm.status" placeholder="请选择商品状态" style="width: 240px">
                        <el-option label="已上架" :value="1" />
                        <el-option label="已下架" :value="0" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="Search" @click="SearchRole()">查询</el-button>
                    <el-button type="success" icon="Plus" @click="addMenu">新建菜单</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- table 表格 -->
        <el-table :data="tableData" style="width: 100%" border stripe>
            <el-table-column fixed="left" align="center" prop="id" label="商品名称/编码" width="220">
                <template #default="scope">
                    <div class="list-table">
                        <div class="list-table-img">
                            <!-- <el-image fit="cover" :src="scope.row.imageUrl" /> -->
                            <el-avatar shape="square" :size="50" :src="scope.row.imageUrl" />
                        </div>
                        <div class="list-table-text">
                            <div class="list-table-text-title">{{ scope.row.name }}</div>
                            <el-link type="primary" @click="editMenu(scope.row)" class="list-table-text-desc">{{
                                scope.row.code }}</el-link>
                        </div>
                    </div>
                </template>

            </el-table-column>
            <el-table-column align="center" prop="specsName" label="商品规格" />
            <el-table-column align="center" prop="categoryName" label="所属分类" />
            <el-table-column align="center" prop="quickCode" label="快捷码" />
            <el-table-column align="center" prop="brand" label="单位" />
            <el-table-column align="center" prop="stockNum" label="库存" sortable />
            <el-table-column align="center" prop="price" label="销售价" sortable />
            <el-table-column align="center" prop="discountPrice" label="商品特价" sortable width="100">
                <template #default="scope">
                    <div v-if="scope.row.discountPrice">￥ {{ scope.row.discountPrice }}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="cost" label="成本价" />
            <el-table-column align="center" prop="createTime" label="入库时间" width="110" />
            <el-table-column align="center" prop="status" label="商品状态" width="100">
                <template #default="scope">
                    <el-switch v-model="scope.row.status" :active-value="0" :inactive-value="1" class="ml-2"
                        inline-prompt active-text="已上架" inactive-text="已下架" @change="changeStatus(scope.row)" />
                </template>
            </el-table-column>
            <el-table-column fixed="right" align="center" label="操作" width="160px">
                <template #default="scope">
                    <el-button link icon="edit" type="warning" @click="editMenu(scope.row)">修改</el-button>
                    <el-popconfirm :title="`确定要永久删除【${scope.row.name}】吗？`" width="" @confirm="DeleteOk(scope.row.id)"
                        @cancel="OnDelete">
                        <template #reference>
                            <el-button link icon="delete" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row justify="end" style="margin-top: 20px">
            <el-pagination v-model:current-page="SearchForm.current" v-model:page-size="SearchForm.size"
                :page-sizes="[10, 20, 30, 50]" layout="total, sizes, prev, pager, next  " :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-row>
        <!-- 模态框 组件 -->
        <getlistDialog ref="listdialog" @getGoodsList="getGoodsList"></getlistDialog>
    </div>

</template>
<script setup lang='ts'>
// hooks 抽离
import { useGoodsList }from './composable/useGoodsList'
const { SearchForm,tableData,total,getGoodsList,DeleteOk,OnDelete,changeStatus,listdialog,addMenu,editMenu,getlistDialog } = useGoodsList()
// const getlistDialog = defineAsyncComponent(() => import('./components/listsdialog.vue'))


import { ref } from 'vue' ;
import type {  GoodsListData, Record } from '@/api/types/listType'
import { defineAsyncComponent } from 'vue';


getGoodsList() //初始化数据

const SearchRole = () => { // 查询
    tableData.value=[]
    getGoodsList()
}
const handleSizeChange = (val: number) => { // 每页条数改变
    SearchForm.value.size = val
    getGoodsList()
}
const handleCurrentChange = (val: number) => { // 当前页改变
    SearchForm.value.current = val
    getGoodsList()
}




</script>
<style lang='scss' scoped>
.list-table {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .list-table-img {
        display: flex;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 5px;
        background-color: #c0c4cc;
        overflow: hidden;
    }

    .list-table-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;



    }

}
</style>