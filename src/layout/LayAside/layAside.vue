<template>
    <!-- 侧边栏 -->
      <el-aside width="200px" :class="store.isCollapse?'aside-store-60':'aside-store-200'" >
        <!-- login -->
        <Laylogin></Laylogin>
        <!-- meun -->
        <Laymeun></Laymeun>
      </el-aside>

</template>
<script setup lang='ts'>
import { defineAsyncComponent } from 'vue';

const Laylogin = defineAsyncComponent(() => import('./Login.vue'))
const Laymeun = defineAsyncComponent(() => import('./Menulist.vue'))

import { useIsCollStore } from '@/stores/isColl';
const store=useIsCollStore()

</script>
<style lang='scss' scoped>

</style>