
import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import pinia from './stores/index' //pinia持久化存储

import './style/index.scss'

// 引入 element-plus 全局样式  及自封装icon图标
import Ele from './global' 

import App from './App.vue'
import router from './router'

import "./permission"// 权限控制

const app = createApp(App)

app.use(Ele)

app.use(pinia) // pinia持久化存储
app.use(router)

console.log('main',import.meta.env.VITE_APP_BASE_API)

app.mount('#app')
