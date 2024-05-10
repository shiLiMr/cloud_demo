<template>
    <div style="display: flex;align-items: center; height: inherit; ">
        <!-- toggle() 方法切换全屏 -->
        <div class="header-right-icon" @click="toggle()">
            <!-- {{ isFullscreen }} -->
            <svg-icon size="21" :icon="isFullscreen ? 'Aim' : 'FullScreen'" ></svg-icon>
        </div>
        <div class="header-right-switch">
            <el-switch v-model="isDark" class="mt-2" style="--el-switch-on-color: #333333;
             --el-switch-off-color: #dcdfe6" inline-prompt active-icon="Moon" size="large" inactive-icon="Sunny" />
        </div>
        <div class="header-right-user">
            <el-dropdown >
                
                <span class="el-dropdown-link" v-if="store.user">
                    <el-avatar class="rgiht-user" :size="30" :src="store.user?.imageUrl" />
                    <span>{{store.user?.username}}</span>
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item  @click="$router.push('/')">首页</el-dropdown-item>
                        <el-dropdown-item @click="$router.push('/404')">404</el-dropdown-item>
                        <el-dropdown-item @click="$router.push('/401')">401</el-dropdown-item>
                        <el-dropdown-item @click="loginout" divided>退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue'
import {useAuthStore} from '@/stores/auth'
const store=useAuthStore()

// 切换全屏
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()
// 主题切换
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark({
    valueDark: "dark dark2", //暗黑模式下的类名
    valueLight: "", //亮模式下的类名
})



const loginout=()=>{

    store.userLogout()
}


const input = ref(false)

</script>
<style lang='scss' scoped></style>