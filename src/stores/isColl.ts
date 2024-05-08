
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useIsCollStore = defineStore('isColl',()=> {
   const isCollapse=ref(false)  // menu 是否折叠

    return { isCollapse }
})