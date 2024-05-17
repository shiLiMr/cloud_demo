<template>
    <div class="role index-main">
        <div class="role-top">
            <el-form :model="SearchForm" label-width="auto" style="max-width: 600px" :inline="true">
                <el-form-item label="菜单名称:">
                    <el-input v-model="SearchForm.name" placeholder="请输入菜单名称" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="Search" @click="SearchRole()">查询</el-button>
                    <el-button type="success" icon="Plus" @click="addMenu">新建菜单</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- table表格 -->
        <el-table :data="tableData" stripe style="width: 100%" border>
            <el-table-column align="center" type="index" label="序号" width="80" />
            <el-table-column align="center" prop="roleName" label="角色名称" />
            <el-table-column align="center" prop="roleCode" label="角色编码" />
            <el-table-column align="center" prop="status" label="角色状态">
                <template #default="scope">
                    <el-tag v-if="scope.row.status" type="success">启用</el-tag>
                    <el-tag v-else type="warning">禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="remark" label="备注" />
            <el-table-column align="center" label="操作" width="240">
                <template #default="scope">
                    <el-button link type="primary" icon="Check" @click="permission(scope.row)">分配权限</el-button>
                    <el-button link type="warning" icon="edit" @click="editSole(scope.row)">修改</el-button>
                    <el-popconfirm title="确定删除此角色和所拥有权限吗?" confirm-button-text="确定" cancel-button-text="取消"
                        @confirm="delSole(scope.row.id)" @cancel="handleCan">
                        <template #reference>
                            <el-button link type="danger" icon="delete">删除</el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
        <!-- 模态框 -->
        <roledialog ref="openDialog" @getList="addgetMenuListData"></roledialog>
        <!-- 分页 -->
        <el-row justify="end" style="margin-top: 20px">
            <el-pagination v-model:current-page="SearchForm.current" v-model:page-size="SearchForm.size"
                :page-sizes="[10, 20, 30, 50]" layout="total, sizes, prev, pager, next  " :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-row>
        <!-- 权限管理组件 -->
        <permissionDialog ref="perDialog" @getRoleList="getMenuListData()"></permissionDialog>
    </div>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { getRoleListApi, deleteRoleApi } from '@/api/system/roles'
import { ElNotification } from 'element-plus'
import { defineAsyncComponent } from 'vue'
const roledialog = defineAsyncComponent(() => import('./components/RoleDialog.vue'))

const permissionDialog = defineAsyncComponent(() => import('./components/permission.vue'))

import type { Record } from '@/api/types/rolesType'

const SearchForm = reactive({
    name: '',
    current: 1,
    size: 10
})
// 请求列表数据
const tableData = ref<Record[]>()// role列表数据
const total = ref<number>(0)// 总条数
const getMenuListData = async () => { //查询
    const res = await getRoleListApi(SearchForm)
    console.log(res);
    tableData.value = res.data.records
    total.value = res.data.total
}
getMenuListData()


const SearchRole = () => { //查询
    getMenuListData()
}

const delSole = async (id: string) => { // 删除
    const res = await deleteRoleApi(id)
    console.log(res);
    ElNotification({
        title: '成功',
        message: '删除成功',
        type: 'success',
    })
    getMenuListData() // 重新请求数据

}
const handleCan = () => { // 取消删除
    ElNotification({
        title: '提示',
        message: '取消删除',
        type: 'warning',
    })
}

const openDialog = ref<InstanceType<typeof roledialog>>()  // 模态框
const addMenu = () => { //新建菜单 按钮
    openDialog.value!.openForm('add', "新增角色")
}
const editSole = (row: Record) => { // 修改
    openDialog.value!.openForm('edit', "修改角色", { row })
}
const addgetMenuListData = () => { // 新增之后子组件调用
    getMenuListData()
}

const handleSizeChange = (val: number) => { // 每页条数
    SearchForm.size = val
    getMenuListData()
}

const handleCurrentChange = (val: number) => { // 当前页
    SearchForm.current = val
    getMenuListData()
}

const perDialog=ref<InstanceType<typeof permissionDialog>>() // 权限管理
const permission=(row:Record)=>{
    perDialog.value!.handleOpen( `分配【${row.roleName}】的权限`,row.id  )
}



</script>
<style lang='scss' scoped>
.role{
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>