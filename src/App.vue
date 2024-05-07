<script setup lang="ts">
import { RouterView } from 'vue-router'

import SvgIcon from './components/SvgIcon.vue';

import axios from 'axios';

// import http from './utils/htttp';
import {loginApi,getMenuApi} from '@/api';
const add=async ()=>{
//  const https=await axios.get('https://mock.mengxuegu.com/mock/66389f12cab9671f88bd30ef/api/login')
// console.log(https);
// const ser =await login()
const ser=await loginApi()
 console.log(ser)
}
const adds=()=>{
  getMenuApi().then(res=>{
    console.log(res)
  })
}


</script>

<template>

  <SvgIcon icon="Edit" color="red" size="30" @click="add" />
  <el-button @click="adds">按钮</el-button>

  <RouterView />
</template>

<style scoped lang="scss"></style>
