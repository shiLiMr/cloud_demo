<template>
    <div class="login">
        <div class="login-main">
            <img src="http://vue3.mengxuegu.com/assets/login-logo-6c42311e.png" alt="">
            <p>账号登陆</p>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm"
                status-icon>
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" prefix-icon="User" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" prefix-icon="Lock" show-password />
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="ruleForm.checked" label="记住密码" size="large" />
                </el-form-item>

                <el-form-item>
                    <el-button style="width: 100%;" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { Local } from '@/utils/storeage'
import { useRouter } from 'vue-router';
const router = useRouter()
import { useAuthStore } from '@/stores/auth'
const store = useAuthStore()


interface RuleForm { // 
    username: string
    password: string
    checked: boolean
}
const ruleFormRef = ref<FormInstance>()

const checked = ref<boolean>(Local.get('checked') || false)  // 是否记住密码
const ruleForm = reactive<RuleForm>({
    checked: Local.get('checked') || false,
    username: Local.get('username') || '17802901987',
    password: Local.get('password') || '123456',
})
const ruleusername = (rule: any, value: any, callback: any) => { // 手机号验证
    const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/ 
    if (value === '' || !reg.test(value)) {
        callback(new Error('请输正确的手机号码'))
    } else {
        callback()
    }
}
const rulepassword = (rule: any, value: any, callback: any) => { //密码验证
    var patrn = /^(\w){6,20}$/;
    if (value === '' || !patrn.test(value)) {
        callback(new Error('请输入密码'))
    } else {
        callback()
    }
}
const rules = reactive<FormRules>({
    username: [
        { validator: ruleusername, trigger: 'blur' },
    ],
    password: [
        { validator: rulepassword, trigger: 'blur' }
    ]
})
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            //存储密码 用户名
            store.setRememberPwd(ruleForm)
            // 调用登录接口
            store.userLogin(ruleForm).then(res => {
                router.push('/home')
            })
            //   跳转主页
        }
    })
}

</script>
<style lang='scss' scoped>
.login {
    width: 100%;
    height: 100%;
    background-image: url(http://vue3.mengxuegu.com/assets/login-bj-514aa045.png);
    background-size: cover;
    position: relative;

    .login-main {
        width: 350px;
        position: absolute;
        top: 50%;
        left: 70%;
        transform: translate(-25%, -60%);
        background-color: #fff;
        box-shadow: 0 0 12px #ccc;
        box-sizing: border-box;
        padding: 40px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 10px;

        >img {
            width: 100px;
        }

        >p {
            font-size: 17px;
            text-align: left;
            width: 100%;
            margin: 10px 0;
        }

        .el-form {
            width: 100%;
        }
    }
}
</style>