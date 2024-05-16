<template>
    <el-drawer v-model="drawer" :title="isTitle" direction="rtl" :before-close="handleClose" center size="40%">
        <!-- tree 树 -->
        <el-tree ref="treeRef" style="max-width: 600px" :data="data" show-checkbox node-key="id" highlight-current
            :props="defaultProps">
            <template #default="{ data }">
                <span class="custom-tree-node" style="display: flex; align-items: center; ">
                    <svg-icon v-if="data.meta.icon && data.type == '1'" :icon="data.meta.icon.split('-')[1]"></svg-icon>
                    <svg-icon v-else icon="SwitchButton"></svg-icon>
                    <span>{{ data.meta.title }}</span>
                </span>
            </template>
        </el-tree>

        <!-- footer -->
        <template #footer>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
            <el-button @click="handleCheckAll">全选/全不选</el-button>
            <el-button @click="handleZhan"> 展开/收起</el-button>
            <el-button @click="handleClose">取消</el-button>
        </template>
    </el-drawer>

</template>
<script setup lang='ts'>
import { ref } from 'vue';
import { getMenuList } from '@/api/system/menu'
import { getRoleCheckedMenuApi, setRoleCheckedMenuApi } from '@/api/system/roles'
import type { ResponseMenuListType } from '@/api/types/menuType'



const isTitle = ref('') // 抽屉标题
const drawer = ref(false) //显示隐藏

const handleClose = () => { // 关闭抽屉
    drawer.value = false
}
const treeRef = ref<InstanceType<typeof ElTree>>()

const checkIds = ref<string[]>([]) // 选中的所有 id
const ids = ref<number | string>() //角色id
const handleOpen = async (title: string, id: number | string) => { // 打开抽屉
    drawer.value = true
    isTitle.value = title
    ids.value = id // 
    await getMenuListData() //菜单所有数据

    await getCheckedId()// 选中id 

    // await menuid() // 选中id 赋值给 tree 渲染列表
    await checkIds.value.forEach((id: string) => { // 选中id 赋值给 tree 渲染列表
        treeRef.value?.setChecked(id, true, false);
    });

}
// 暴露方法 子组件
defineExpose({
    handleOpen,
})
const menuid = () => { // 选中id 赋值给 tree 渲染列表
    checkIds.value.forEach((id: string) => { // 选中id 赋值给 tree 渲染列表
        treeRef.value?.setChecked(id, true, false);
    });
}
const data = ref<ResponseMenuListType[]>([]) // 权限菜单所有数据
const defaultProps = {
    id: "id",
    // label: "meta.title",
    children: 'children',
}
const getCheckedId = async () => { // 请求选中id
    try {
        const res = await getRoleCheckedMenuApi(ids.value as number)
        // console.log(res);
        checkIds.value = res.data // 保存选中id
        console.log(checkIds.value);


    } catch (err) {
        console.log(err);
    }
}
const getMenuListData = async () => { // 菜单所有数据
    const res = await getMenuList()
    console.log(res);
    data.value = res.data
}
const ss = ref(false) // 是否全选
const handleCheckAll = () => { // 全选/全不选
    ss.value = !ss.value
    const arr = ref<number[]>([])
    data.value.map(item => { // 获取所有id
        item.id
        arr.value.push(Number(item.id))
    })
    if (ss.value) {
        // console.log('全选');
        treeRef.value!.setCheckedNodes(data.value as any, false)
        // treeRef.value!.setCheckedKeys(arr.value, false)
    } else {
        // console.log('全不选');
        treeRef.value!.setCheckedNodes([], false)
        // treeRef.value!.setCheckedKeys([], false)
    }
}

import { ElMessage, ElNotification, type ElTree } from 'element-plus'
const aa = ref(false) // 是否 展开收起
const handleZhan = () => { // 展开收起
    aa.value = !aa.value
    console.log(treeRef.value?.root);
    treeZhan(treeRef.value?.root)
}
const treeZhan = (node: any) => { // 递归
    for (let i = 0; i < node!.childNodes.length; i++) {
        node!.childNodes[i]!.expanded = aa.value

        if (node!.childNodes[i].childNodes.length > 0) {
            treeZhan(node!.childNodes[i])
        }
    }
}

const emits = defineEmits(['getRoleList'])

const handleSubmit = async () => {
    // 获取选中 子 id
    const checks = treeRef.value?.getCheckedKeys()
    console.log(checks);
    // 获取选中 父 id
    const checksParent = treeRef.value?.getHalfCheckedKeys()
    console.log(checksParent);

    const arr = checksParent!.concat(checks!) // 合并数组 id 
    // 去重
    const arr1 = Array.from(new Set(arr))
    console.log(arr);
    // 发送请求
    const res = await setRoleCheckedMenuApi(ids.value as number, arr1 as string[])
    console.log(res);
    if (res.code === 20000) {

        ElNotification({
            title: 'Success',
            message: res.message,
            type: 'success',
        })
        drawer.value = false
        emits('getRoleList')
    }
    // 关闭抽屉
}


</script>
<style lang='scss' scoped></style>