<template>
  <el-dialog v-model="dialogFormVisible" :title="isTitle" width="550" center :before-close="handleClose">
    <el-form :model="form" lable-width="200px" label-suffix="  :" ref="ruleFormRef" :rules="rules" status-icon
      label-width="95px" label-position="right">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" autocomplete="off" placeholder="请输入角色名称" maxlength="30" show-word-limit />
      </el-form-item>
      <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model="form.roleCode" autocomplete="off" placeholder="请保证唯一性，建议以`ROLE_`开头" maxlength="30"
          show-word-limit />
      </el-form-item>
      <el-form-item label="角色状态" prop="status">
        <el-switch v-model="form.status" inline-prompt active-text="启" inactive-text="禁" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" style="width: 100%" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitForm">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang='ts'>
import { reactive, ref, nextTick } from 'vue'
import type { addRole } from '@/api/types/rolesType'
import { ElNotification, type FormInstance, type FormRules } from 'element-plus';
import _ from 'lodash'
import {addRoleApi,editRoleApi} from '@/api/system/roles'


// 表单标题
const isTitle = ref('新增角色')
const dialogFormVisible = ref(false) // 表单显示隐藏
const formType = ref<string>()
const ruleFormRef = ref<FormInstance>()
const form = ref<addRole>({
  remark: '',
  roleCode: '',
  roleName: '',
  status: true
})
const rules = reactive<FormRules<addRole>>({
  roleName: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
  ],
  roleCode: [
    {
      pattern: /^[a-zA-Z0-9_]{2,30}$/,
      message: "只允许输入2-30位英文/数字/下划线", trigger: 'blur'
    },
  ],
  status: [
    { required: true, message: '请选择', trigger: 'change' },
  ],
})
const emits=defineEmits(['getList'])
// 表单提交

// 关闭表单
const handleClose = () => {
  ruleFormRef.value?.resetFields()
  dialogFormVisible.value = false

}
const submitForm = () => {  // 提交表单
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      addForm()
    }
  })
}
// 提交表单方法
const addForm = async () => {
  if(formType.value === 'add'){
    await addRoleApi(form.value)  // 添加接口
  }else{
    await editRoleApi(form.value)  // 修改接口
  }
  ElNotification({
    title: 'Success',
    message: '操作成功',
    type: 'success',
  })
  dialogFormVisible.value = false

  emits('getList')
}

// 打开表单
const openForm = (type: string, title: string, data = {} as any) => {
  dialogFormVisible.value = true
  formType.value = type
  isTitle.value = title
  if (type === 'edit') {  // 编辑回填
    nextTick(() => { // 获取数据 使用nextTick 为了使用 resetFields 方法 清空表单
      form.value = { ...data.row }
    })
  }
}
// 暴露子组件方法
defineExpose({
  openForm,
})



</script>
<style lang='scss' scoped></style>