
// 全局引入 element-plus 组件库

import ElementPlus, { install } from 'element-plus'
import 'element-plus/dist/index.css'
import type { App } from 'vue'

export default  {
    install (app: App) {
        app.use(ElementPlus)
    }
}