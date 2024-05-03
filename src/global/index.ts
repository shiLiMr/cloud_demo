
// 
import type { App } from "vue";
import registerElementPlus from "./registerElementPlus.";
import registerElementPlusIcon from "./registerElementPlusIcon";

export default {
    install(app: App) {
        app.use(registerElementPlus)  
        app.use(registerElementPlusIcon)  // 使用icon
    }
}