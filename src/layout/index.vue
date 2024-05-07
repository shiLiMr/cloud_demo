<template>
 
 <div class="common-layout">
    <el-container>
      <!-- 侧边栏 -->
      <LayAside></LayAside>
      <el-container direction="vertical">
        <!-- 头部 -->
        <LayHeader></LayHeader>
        <!-- 主要 -->
        <LayMain></LayMain>
      </el-container>
    </el-container>
  </div>

</template>
<script setup lang='ts'>  
import { defineAsyncComponent } from 'vue';
const LayAside= defineAsyncComponent(()=>import('./LayAside/layAside.vue'))
const LayHeader= defineAsyncComponent(()=>import('./LayHeader/layHeader.vue'))
const LayMain= defineAsyncComponent(()=>import('./LayMain/laymain.vue'))

</script>
<style lang='scss' scoped>

</style>