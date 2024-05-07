
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style/index.scss'

// 引入 element-plus 全局样式
import Ele from './global' 

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Ele)

app.use(createPinia())
app.use(router)

console.log('main',import.meta.env.VITE_APP_BASE_API)

app.mount('#app')
