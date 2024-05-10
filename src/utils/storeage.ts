/**
 * 封装数据存储方法
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */

export const Local={
    set(key:string,value:any){
        localStorage.setItem(key,JSON.stringify(value||''))
    },
    get(key:string){
        return JSON.parse(localStorage.getItem(key) as string)
    },
    remove(key:string){
        localStorage.removeItem(key)
    },
    clear(){
        localStorage.clear()
    }
}

//  sessionStorage 存储在浏览器会话中，当会话结束时，数据会被清除   暂时存储
export const Session={
    set(key:string,value:any){
        sessionStorage.setItem(key,JSON.stringify(value))
    },
    get(key:string){
        return JSON.parse(sessionStorage.getItem(key) as string)
    },
    remove(key:string){
        sessionStorage.removeItem(key)
    },
    clear(){
        sessionStorage.clear()
    }
}