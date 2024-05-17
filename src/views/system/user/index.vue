<template>
    <div class="user index-main">
        <div class="user-top">
            <el-form :model="SearchForm" label-width="auto" style="max-width: 600px" :inline="true">
                <el-form-item>
                    <el-input v-model="SearchForm.keyword" placeholder="请输入用户账号/昵称/手机号" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="Search" @click="SearchRole()">查询</el-button>
                    <el-button type="success" icon="Plus" @click="addMenu">新建菜单</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" border stripe>
            <el-table-column align="center" prop="nickName" label="用户昵称" />
            <el-table-column align="center" prop="username" label="用户账号" />
            <el-table-column align="center" prop="mobile" label="手机号" />
            <el-table-column align="center" prop="email" label="邮箱" width="180" />
            <el-table-column align="center" prop="accountNonLocked" sortable label="账号锁定">
                <template #default="scope">
                    <el-tag effect="dark" :type="scope.row.accountNonLocked ? 'success' : 'danger'">{{
                        scope.row.accountNonLocked ? '正常' : '锁定' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="accountNonExpired" sortable label="账号过期">
                <template #default="scope">
                    <el-tag effect="dark" :type="scope.row.accountNonExpired ? 'success' : 'danger'">{{
                        scope.row.accountNonExpired ? '正常' : '过期' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="credentialsNonExpired" sortable label="密码过期">
                <template #default="scope">
                    <el-tag effect="dark" :type="scope.row.credentialsNonExpired ? 'success' : 'danger'">{{
                        scope.row.credentialsNonExpired ? '正常' : '过期' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间" sortable />
            <el-table-column align="center" label="操作" width="260px">
                <template #default="scope">
                    <el-button link icon="key" type="primary" @click="resetPassword(scope.row)">密码重置</el-button>
                    <el-button link icon="edit" type="warning" @click="editMenu(scope.row)">修改</el-button>
                    <el-popconfirm :title="`确定要永久删除【${scope.row.nickName}】吗？`" @confirm="handleDelUser(scope.row)"
                        @cancel="handlecanceluser" width="250px">
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
        <!-- 子组件 -->
        <userDialog ref="opendialog" @getUserList="getuserList"></userDialog>

        <passdialog ref="passwordDialog"></passdialog>
    </div>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue';
import { getUserListApi, deleteUserApi } from '@/api/system/user'
import type { Record } from '@/api/types/userType'
import { ElNotification } from 'element-plus';
import { defineAsyncComponent } from 'vue';

const userDialog = defineAsyncComponent(() => import('./components/userdialog.vue'))

const passdialog= defineAsyncComponent(()=>import('./components/passdialog.vue'))

const SearchForm = ref({
    keyword: '',
    current: 1,
    size: 10,
})

const tableData = ref<Record[]>([]) // 存放 user所有数据
const total = ref<number>(0)
const getuserList = async () => {  // 请求数据列表
    const res = await getUserListApi(SearchForm.value)
    console.log(res);
    tableData.value = res.data.records
    total.value = res.data.total
}
getuserList() //调用

const SearchRole = () => { // 查询角色
    SearchForm.value.current = 1;
    tableData.value = []
    getuserList()

}
const handleSizeChange = (val: number) => { // 改变每页显示条数
    SearchForm.value.size = val
    SearchRole()
}
const handleCurrentChange = (val: number) => { // 改变当前页
    SearchForm.value.current = val
    SearchRole()
}

const handleDelUser = async (row: Record) => { //删除用户
    const res = await deleteUserApi(row.id)
    console.log(res);
    if (res.code === 20000) {
        ElNotification({
            message: '删除成功',
            type: 'success',
        })
        getuserList()
    } else {
        ElNotification({
            message: `删除失败`,
            type: 'error',
        })
    }
}
const handlecanceluser = () => { // 取消删除
    ElNotification({
        message: `取消删除`,
        type: 'info',
    })
}
const opendialog = ref<InstanceType<typeof userDialog>>()
const addMenu = () => { // 新建菜单按钮
    opendialog.value?.openDialog('add', '新增用户')
}
const editMenu = (row: Record) => { // 编辑菜单按钮
    opendialog.value?.openDialog('edit','编辑用户',row)
}

// 重置密码
const passwordDialog=ref<InstanceType <typeof passdialog>>()
const resetPassword=(row:Record)=>{
    passwordDialog.value?.openDialog(`重置密码【${row.nickName}】`,row.id)
}


</script>
<style lang='scss' scoped>
.user {
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>