import { defineStore } from 'pinia'   // 登录 token  用户信息  持久化存储
import { loginApi,userInfo,userLogoutApi } from '@/api/index'
import { ref } from 'vue'
import type { UserInfo, MenuList } from '@/api/types/authType'

import { Local } from "@/utils/storeage";



// pinia 组合式Api写法
export const useAuthStore = defineStore('auth', () => {
    // 令牌
    const token = ref<string>();
    // 用户信息
    const user = ref<UserInfo>();
    // 菜单数据
    const menuList = ref<MenuList[]>([]);
    // 按钮权限数据
    const buttonList = ref<string[]>([]);

    // 存储token
    const setToken = (value: string) => {
        token.value = value;
    };
    // 删除token
    const removeToken = () => {
        token.value = "";
    };

    type StateType = {
        checked: boolean;

        username: string;
        password: string;

    }
    // 存储账号与密码
    const setRememberPwd = (state: StateType) => {
        if (state.checked) {
            Local.set("username", state.username);
            Local.set("password", state.password);
            Local.set("isRemember", state.checked);
        } else {
            Local.remove("username");
            Local.remove("password");
            Local.remove("isRemember");
        }
    };
    //登录接口 
    const userLogin = async (userInfo: any) => {
        try {
            const login = await loginApi(userInfo)
            // 存储token
            console.log(login);
            token.value=login.data.access_token
            return login
        } catch (err) {
            console.log(err);

        }

    }

    // 请求用户信息
    const getUserInfo=async ()=>{
        try{
            const res=await userInfo()
            console.log(res);
            user.value = res.data.userInfo;
            menuList.value = res.data.menuList;
            buttonList.value = res.data.buttonList;
            return res
            
        }catch(err){
            console.log(err);
        }
    }

    // 用户退出登录
    const userLogout = async () => {
        try {
            await userLogoutApi()
            removeToken()
            user.value = null;
            menuList.value = [];
            buttonList.value = [];
            // router.push('/login')
            window.location.reload()
           
        } catch (err) {
            console.log(err);
        }
    }

    return {
        menuList,buttonList,userLogin,getUserInfo, token, setToken, removeToken, user, setRememberPwd,userLogout
    }
}, { persist: true },)