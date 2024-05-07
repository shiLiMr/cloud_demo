
import request from '../utils/htttp.ts'

export const login=()=>{
    return request({
        url:'/',
        method:'get'
    })
}