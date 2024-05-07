<template>
    <!-- 侧边栏 -->
      <el-aside width="200px" style="">
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


</script>
<style lang='scss' scoped>

</style>