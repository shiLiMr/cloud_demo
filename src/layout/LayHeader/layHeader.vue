<template>
<!-- 头部 -->
<el-header class="layout-header">
    <!-- left -->
    <layheaderleft class="layout-header-left"></layheaderleft>
    <!-- right -->
    <layheaderright class="layout-header-right"></layheaderright>
</el-header>

</template>
<script setup lang='ts'>
import { defineAsyncComponent } from 'vue';
const layheaderleft = defineAsyncComponent(() => import('./headerleft.vue'))
const layheaderright = defineAsyncComponent(() => import('./headerright.vue'))

</script>
<style lang='scss' scoped>

</style>