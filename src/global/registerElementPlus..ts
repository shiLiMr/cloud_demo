
// 全局引入 element-plus 组件库

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import type { App } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import "element-plus/theme-chalk/dark/css-vars.css";

export default  {
    install (app: App) {
        app.use(ElementPlus, {
            locale: zhCn,
          })
    }
}