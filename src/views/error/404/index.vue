<template>
    <div class="error-401">
        <img src="http://vue3.mengxuegu.com/assets/404-b5333228.svg" alt="">
        <div class="error-content">
            <h3>您所访问的页面不存在!</h3>
            <p>请检查您输入的网址是否正确，或点击下面的按钮返回首页。</p>

            <el-button round type="primary" @click="$router.push('/home')">返回首页</el-button>
        </div>
    </div>
</template>
<script setup lang='ts'>


</script>
<style lang='scss' scoped></style>