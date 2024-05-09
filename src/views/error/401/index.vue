<template>
    <div class="error-401">
        <img src="http://vue3.mengxuegu.com/assets/401-53da0fc8.svg" alt="">
        <div class="error-content">
            <h3>您没有操作权限，请联系管理员!</h3>
            <p>联系方式:https://www.mengxuegu.com</p>

            <el-button round type="primary" @click="$router.push('/login')">重新登陆</el-button>
        </div>
    </div>
</template>
<script setup lang='ts'>


</script>
<style lang='scss' scoped></style>