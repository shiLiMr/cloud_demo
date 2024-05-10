<template>
    <!--  -->
    

    <el-main class="el-main-main">
        
        <el-scrollbar>
            <!-- 缓存需要缓存的组件 -->
            <!-- <div class="el-main-div"> -->
            <router-view v-slot="{ Component }">
                <Transition mode="out-in" name="main">
                    <keep-alive>
                        <component :is="Component" v-if="$route.meta.cache" />
                    </keep-alive>
                </Transition>
                <Transition mode="out-in" name="main">
                    <component :is="Component" v-if="!$route.meta.cache" />
                </Transition>
            </router-view>
            <!-- </div>   -->
        </el-scrollbar>
    </el-main>

</template>
<script setup lang='ts'>

</script>
<style lang='scss' scoped>
::v-deep .el-scrollbar__view {
    height: 100% !important;
    background-color: #fff;
  
}

.main-enter-active,
.main-leave-active {
    transition: all 0.3s ease;
}

.main-enter-from {
    opacity: 0;
    transform: translateX(-20%);
}

.main-leave-to {
    opacity: 0;
    transform: translateX(20%);
}
</style>