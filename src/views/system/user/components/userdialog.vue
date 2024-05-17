<template>
    <el-dialog v-model="dialogFormVisible" :title="isTitle" width="720" center :before-close="handleClose">
        <el-form :rules="rules" ref="ruleFormRef" class="ell" :model="form" label-width="autn" inline status-icon
            style="text-align: center;" label-suffix=" :">
            <el-form-item label="用户昵称" prop="nickName">
                <el-input v-model="form.nickName" placeholder="请输入用户昵称" maxlength="30" show-word-limit clearable />
            </el-form-item>
            <el-form-item label="用户账号" prop="username">
                <el-input v-model="form.username" placeholder="请输入4~30位用户账号" maxlength="30" show-word-limit clearable />
            </el-form-item>
            <el-form-item label="手机号码" prop="mobile">
                <el-input v-model="form.mobile" placeholder="请输入手机号码" maxlength="20" show-word-limit clearable />
            </el-form-item>
            <el-form-item label="登陆密码" prop="password">
                <el-input :disabled="dialogType == 'edit'" v-model="form.password" placeholder="请输入6~30位登陆密码" 
                type="password" show-password clearable />
            </el-form-item>
            <el-form-item label="分配角色" prop="">
                <el-select v-model="form.roleIds" multiple placeholder="请选择角色" style="width: 240px">
                    <el-option v-for="item in options" :key="item.id" :label="item.roleName" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入电子邮箱" maxlength="30" show-word-limit clearable />
            </el-form-item>
            <el-form-item label="账号锁定" prop="accountNonLocked">
                <el-radio-group v-model="form.accountNonLocked">
                    <el-radio :value="true" border>未绑定</el-radio>
                    <el-radio :value="false" border>已锁定</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="账号过期" prop="accountNonExpired">
                <el-radio-group v-model="form.accountNonExpired">
                    <el-radio :value="true" border>未过期</el-radio>
                    <el-radio :value="false" border>已过期</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="密码过期" prop="credentialsNonExpired">
                <el-radio-group v-model="form.credentialsNonExpired">
                    <el-radio :value="true" border>未过期</el-radio>
                    <el-radio :value="false" border>已过期</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="备注信息" prop="remark">
                <el-input v-model="form.remark" maxlength="100" placeholder="请输入备注信息" show-word-limit type="textarea" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="handleAddUserSubmit">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup lang='ts'>
import { ref } from 'vue'
import { getRoleListApi, addUserApi,updateUserApi } from '@/api/system/user'
import type { addUserlist, Userlust, Datum } from '@/api/types/userType'
import { nextTick } from 'vue';
import { ElNotification, type FormInstance, type FormRules } from 'element-plus';

import _ from 'lodash'


const dialogFormVisible = ref(false) //控制dialog 显示隐藏
const options = ref<Datum[]>() // 角色下拉框数据

const ruleFormRef = ref<FormInstance>()
const dialogType = ref('') // dialog 类型 add emit
const form = ref<addUserlist>({  // 表单数据
    username: '',
    nickName: '',
    mobile: '',
    password: '',
    roleIds: [],
    email: '',
    accountNonLocked: true,
    accountNonExpired: true,
    credentialsNonExpired: true,
    remark: '',

})
const rules = ref<FormRules<addUserlist>>({  // 表单验证规则
    username: [
        { required: true, message: '用户昵称不能为空', trigger: 'blur' },
        { min: 6, max: 30, message: '帐号必须为6~30位数字、字母、下划线！', trigger: 'blur' }
    ],
    nickName: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
    ],
    mobile: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
    ],
    password: [
        { required: true, min: 6, max: 30, message: '密码必须为6~30位数字、字母、下划线！', trigger: 'blur' }
    ],
    accountNonLocked: [{ required: true, message: '请选择账号是否锁定', trigger: 'blur' }],
    accountNonExpired: [{ required: true, message: '请选择账号是否过期', trigger: 'blur' }],
    credentialsNonExpired: [{ required: true, message: '请选择密码是否过期', trigger: 'blur' }],
})

const isTitle = ref('新增用户')
const handleClose = () => {
    dialogFormVisible.value = false
    form.value.roleIds=[]  // 清空分配角色
    ruleFormRef.value?.resetFields() //清空表单
}
const openDialog = async (type: string, title: string, data = {} as any) => { // 打开dialog
    isTitle.value = title
    dialogType.value = type
    dialogFormVisible.value = true
    await getroleslist() // 调用请求 分配角色数据

    if (type === 'edit') {
        nextTick(() => {  // 数据回显
            // form.value = { ...data }
            form.value = _.cloneDeep(data)
        })
    }
}
// 暴露 子组件
defineExpose({
    openDialog,
})
const getroleslist = async () => {  //请求 分配角色数据
    const res = await getRoleListApi()
    console.log(res);
    options.value = res.data
}

const emits = defineEmits(['getUserList'])

// 提交表单
const handleAddUserSubmit = async () => {
    ruleFormRef.value?.validate(async (valid) => {  // 验证表单
        if (!valid) return
        if (dialogType.value === 'add') {
            const res = await addUserApi(form.value)
            console.log(res);
            dialogFormVisible.value = false
            ElNotification({
                message: res.message,
                type: 'success',
            })
        } else {
            await updateUserApi(form.value)
             dialogFormVisible.value = false
            ElNotification({
                message: '修改成功',
                type: 'success',
            })
        }
        // 刷新表单
        emits('getUserList')
    })
}


</script>
<style lang='scss' scoped>
.ell>.el-form-item {
    width: 45%;
    margin-right: 18px !important;
}
</style>