<template>
    <el-dialog v-model="dialogFormVisible" :title="isTitle" width="550" center :before-close="handleClose" draggable>
        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules"
            label-width="auto" class="demo-ruleForm">
            <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="ruleForm.newPassword" type="password" show-password autocomplete="off"
                    placeholder="请输入新密码" />
            </el-form-item>
            <el-form-item label="确认密码" prop="repPassword">
                <el-input v-model="ruleForm.repPassword" type="password" show-password autocomplete="off"
                    placeholder="请输入确认密码" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="passSubmit">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup lang='ts'>
import { ElNotification, type FormInstance, type FormRules } from 'element-plus';
import { ref } from 'vue'
import type { passwordType } from '@/api/types/userType'
import { resetPasswordApi } from '@/api/system/user'
import { es } from 'element-plus/es/locales.mjs';

const dialogFormVisible = ref(false) // 弹窗显示

const isTitle = ref('') // 弹窗标题


const ruleFormRef = ref<FormInstance>()



const ruleForm = ref<passwordType>({
    userId: 0,
    newPassword: '',
    repPassword: ''
})
const validatorPawwword = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== ruleForm.value.newPassword) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
}
const rules = ref<FormRules<passwordType>>({
    newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
    ],
    repPassword: [
        { validator: validatorPawwword, required: true, trigger: 'blur' },
    ],
})

// 打开弹窗
const openDialog = (title: string, id: number) => {
    isTitle.value = title
    ruleForm.value.userId = id
    dialogFormVisible.value = true
}

defineExpose({
    openDialog
})

// 关闭弹窗
const handleClose = () => {
    dialogFormVisible.value = false
    ruleFormRef.value?.resetFields()
}
// 提交表单
const passSubmit = () => {
    ruleFormRef.value?.validate((valid: boolean) => {
        if (!valid) return
        // 表单验证通过，执行提交逻辑
         resetPasswordApi(ruleForm.value)
        ElNotification.success('密码修改成功')
        dialogFormVisible.value = false
        // 关闭弹窗
    })
}


</script>
<style lang='scss' scoped></style>