<template>
    <div style="display: flex;align-items: center; height: inherit; ">
        <div class="header-right-icon">
            <svg-icon size="21" icon="FullScreen"></svg-icon>
        </div>
        <div class="header-right-switch">
            <el-switch v-model="input" class="mt-2" style="--el-switch-on-color: #333333;
             --el-switch-off-color: #dcdfe6" inline-prompt active-icon="Moon" size="large" inactive-icon="Sunny" />
        </div>
        <div class="header-right-user">
            <el-dropdown  @command="handleCommand">
                
                <span class="el-dropdown-link">
                    <el-avatar class="rgiht-user" :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                    <span>黎娜</span>
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="a">首页</el-dropdown-item>
                        <el-dropdown-item command="b">404</el-dropdown-item>
                        <el-dropdown-item command="c">401</el-dropdown-item>
                        <el-dropdown-item command="e" divided>退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue'
const input = ref(false)
const handleCommand = (command: string) => {
    console.log(command)
}
</script>
<style lang='scss' scoped></style>