<template>
    <div class="menu index-main">
        <div class="menu-top">
            <el-form :model="SearchForm" label-width="auto" style="max-width: 600px" :inline="true">
                <el-form-item label="菜单名称:">
                    <el-input v-model="SearchForm.keyword" placeholder="请输入菜单名称" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="Search" @click="getMenuListData()">查询</el-button>
                    <el-button type="success" icon="Plus">新建菜单</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- table 列表 -->
        <div class="menu-tablelist">
            <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border>
                <el-table-column prop="meta.title" label="菜单名称" width="170">
                    <template #default="scope">
                        <el-icon size="19">
                            <!-- <component v-if="scope.row.meta.icon" :is="scope.row.meta.icon.split('-')[1]"></component> -->
                            <component :is="filterMenuIcon(scope.row.meta.icon)"> </component>
                        </el-icon>
                        <span>{{ scope.row.meta.title }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="path" label="路由地址" />
                <el-table-column prop="component" label="组件路径" />
                <el-table-column prop="code" label="权限标识" />
                <el-table-column prop="type" label="类型">
                    <template #default="scope">
                        <transition mode="out-in" name="faa">
                            <div>
                                <!-- <el-tag v-if="scope.row.type == 1" type="primary" size="large">菜单</el-tag>
                            <el-tag v-if="scope.row.type == 2" type="success" size="large">按钮</el-tag> -->
                                <el-tag :type="scope.row.type == 1 ? 'primary' : 'success'" size="large"> {{
                                    scope.row.type
                                    == 1 ? '菜单' : '按钮'}}</el-tag>
                            </div>
                        </transition>
                    </template>
                </el-table-column>
                <el-table-column prop="sort" label="排序" width="80" />
                <el-table-column align="center" label="操作" width="240">
                    <template #default="scope">
                        <el-button type="primary" icon="Plus" link size="large">
                            新增下级
                        </el-button>
                        <el-button type="warning" icon="Edit" link size="large">
                            修改
                        </el-button>

                        <el-popconfirm title="确定要删除吗?" confirm-button-text="确认" cancel-button-text="取消"
                            @confirm="dels(scope.row.id)" @cancel="cancel">
                            <template #reference>
                                <el-button type="danger" icon="delete" link size="large">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { getMenuList, delMenu } from '@/api/system/menu'
import type { ResponseMenuListType } from '@/api/types/menuType'
import { ElNotification } from 'element-plus';

const SearchForm = ref({  //搜索框数据
    keyword: ''
})
const tableData = ref<ResponseMenuListType[]>([])  //表格数据

// 封装请求 列表数据
const getMenuListData = async () => {
    const res = await getMenuList(SearchForm.value)
    console.log(res);
    tableData.value = res.data
}
getMenuListData() //调用
// 过滤图表的ele-
const filterMenuIcon = (icon: string) => {
    if (icon) {
        return icon.replace("ele-", "");
    }
};

//删除
const dels = async (id: number) => {
    const res = await delMenu(id)
    console.log(res);
    // 删除成功的提示信息
    ElNotification({
        title: "删除成功!",
        type: "success",
    });

    // 刷新菜单列表
    getMenuListData();
}

// 取消删除
const cancel = () => {
    ElNotification({
        title: "取消删除!",
        type: "info",
    });
}

</script>

<style lang='scss'>
.cell {
    display: flex !important;
    align-items: center !important;
}

.faa-enter-active,
.faa-leave-active {
    transition: all .3s ease;
}

.faa-enter-from,
.faa-leave-to {
    opacity: 0;
}

.faa-enter-from {
    transform: rotate(-180deg);
}

.faa-leave-to {
    transform: rotate(180deg);
}
</style>