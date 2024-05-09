<template>
    <div class="error-401">
        <img src="http://vue3.mengxuegu.com/assets/link-3a8f36f6.svg" alt="">
        <div class="error-content error-usian">
            <h3>即将跳转到外部网站[{{ $route.meta.title }}]</h3>
            <p>您将要访问的链接不属于 {{ hostname }}，请关注您的帐号安全!</p>
            <p>联系方式:https://www.mengxuegu.com</p>

            <el-button round style="float: right;">继续前往访问</el-button>
        </div>
    </div>
</template>
<script setup lang='ts'>

//获取当前域名
const hostname = window.location.hostname;
</script>
<style lang='scss' scoped></style>