<template>
    <div class="header-left-sty">
        <div class="lay-header-left-icon">
            <svg-icon :icon="store.isCollapse ? 'Expand' : 'Fold'" @click="handleIsCollapse"></svg-icon>

        </div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item, index) in breadlist" :key="index">
                    <span style="display: flex;align-items: center;" v-if="index === breadlist!.length - 1">
                        <svg-icon :icon="item.meta.icon"></svg-icon>
                        {{ item.meta.title }}
                    </span>
                    <a v-else style="display: flex;align-items: center;cursor: pointer;" @click.prevent="handleBread(item)">
                        <svg-icon :icon="item.meta.icon"></svg-icon>
                        {{ item.meta.title }}
                    </a>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>
<script setup lang='ts'>
// import SvgIcon from '@/components/SvgIcon.vue';
import { useIsCollStore } from '@/stores/isColl';
const store = useIsCollStore()
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate, type RouteRecordNormalized, type RouteLocationNormalized } from 'vue-router';
const router = useRouter()
const route = useRoute()

// 存放面包屑数据
const breadlist = ref<RouteRecordNormalized[]>()
// 路由更新时触发函数
onBeforeRouteUpdate((to, from) => {
    // console.log(to)
    getBreadlist(to)
})
// 监听路由变化
const getBreadlist = (to: RouteLocationNormalized) => {
    const wer = to.matched.filter((item) => item.meta && item.meta.title && item.meta.icon)
    breadlist.value = wer
    console.log(breadlist.value);
}
// 初始化时触发函数
onMounted(() => {
    getBreadlist(route)
})
// watch(route,(newval,oldval)=>{
//     console.log(newval)
// },{deep:true,immediate:true})

// 点击面包屑跳转
const handleBread = (item: RouteRecordNormalized) => {
    console.log(item);
    const { path, redirect } = item;
    console.log(path,redirect);
    if (redirect) router.push(redirect as string)
    else router.push(path)
    // router.push(item.path)
}



const handleIsCollapse = () => {
    store.isCollapse = !store.isCollapse
}

</script>
<style lang='scss' scoped></style>