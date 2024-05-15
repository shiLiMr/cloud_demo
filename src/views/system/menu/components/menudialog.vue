<template>
    <div class="menudialog">
        <el-drawer v-model="drawer" ref="ruleFormRef" size="650px" :title="menuTitle" direction="rtl"
            :before-close="handleClose">
            <el-form ref="ruleFormRef"  :model="ruleForm" label-width="85" class="demo-ruleForm"
                status-icon>
                <el-form-item label="上级菜单" prop="parentId">
                    <el-cascader placeholder="请选择上级菜单" v-model="ruleForm.parentId" :options="options" :props="props"
                        clearable style="width: 100%" />
                </el-form-item>
                <el-form-item label="菜单类型" prop="type" :rules="{
                    required: true,
                    message: '请选择菜单类型',
                    trigger: 'blur',
                }">
                    <el-radio-group v-model="ruleForm.type">
                        <el-radio value="1" border>菜单</el-radio>
                        <el-radio value="2" border>按钮</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="菜单名称" :rules="{
                    required: true,
                    message: '请选择菜单名称',
                    trigger: 'blur',
                }" prop="meta.title" >
                    <el-input v-model="ruleForm.meta.title" maxlength="10" placeholder="请输入菜单名称" show-word-limit
                        type="text" />
                </el-form-item>
                <el-form-item label="权限标识" v-if="ruleForm.type == '2'" prop="code">
                    <el-input v-model="ruleForm.code" maxlength="50" placeholder="请输入权限标识" show-word-limit
                        type="text" />
                </el-form-item>
                <el-form-item label="路由地址" prop="path" v-if="ruleForm.type == '1'">
                    <el-input v-model="ruleForm.path" maxlength="200" placeholder="请输入地址path值" show-word-limit
                        type="text" />
                </el-form-item>
                <el-form-item label="路由名称" prop="name" v-if="ruleForm.type == '1'">
                    <el-input v-model="ruleForm.name" maxlength="50" placeholder="路由名称" show-word-limit type="text" />
                </el-form-item>
                <el-form-item label="组件路径" prop="component" v-if="ruleForm.type == '1'">
                    <el-input v-model="ruleForm.component" maxlength="390" placeholder="路由组件相对路径" show-word-limit
                        type="text" />
                </el-form-item>
                <el-form-item label="菜单图标" prop="meta.icon" v-if="ruleForm.type == '1'">
                    <el-input v-model="ruleForm.meta.icon" maxlength="200" placeholder="请输入图标名ele-开头" show-word-limit
                        type="text" />
                </el-form-item>
                <el-form-item label="重定向" prop="redirect" v-if="ruleForm.type == '1'">
                    <el-input v-model="ruleForm.redirect" maxlength="100" placeholder="路由重定向地址redirect值" show-word-limit
                        type="text" />
                </el-form-item>
                <el-row v-if="ruleForm.type == '1'">
                    <el-col :span="12">
                        <el-form-item label="是否隐藏" :rules="{
                            required: true,
                            message: '请选择',
                            trigger: 'change',
                        }" prop="meta.hidden">
                            <el-radio-group v-model="ruleForm.meta.hidden" class="ml-4">
                                <el-radio :value="false">不隐藏</el-radio>
                                <el-radio :value="true">隐藏</el-radio>
                            </el-radio-group>
                        </el-form-item>

                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否缓存" :rules="{
                            required: true,
                            message: '请选择',
                            trigger: 'change',
                        }" prop="meta.cache">
                            <el-radio-group v-model="ruleForm.meta.cache" class="ml-4">
                                <el-radio :value="false">不缓存</el-radio>
                                <el-radio :value="true">缓存</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="排序" prop="sort">
                    <el-input-number style="width: 300px" v-model="ruleForm.sort" :min="1" :max="100000" />
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="ruleForm.remark" type="textarea" placeholder="请输入备注" maxlength="50"
                        show-word-limit />
                </el-form-item>

            </el-form>

            <template #footer>
                <el-row justify="center">
                    <el-button @click="handleClose">取消</el-button>
                    <el-button type="primary" @click="submitForm">确定</el-button>
                </el-row>
            </template>
        </el-drawer>
    </div>
</template>
<script setup lang='ts'>
import { selectMenu, addMenu, editMenu } from '@/api/system/menu';
import { ElNotification, type FormInstance } from 'element-plus';
import { ref,nextTick } from 'vue';
import _ from "lodash";
import type { MenuParamsType } from '@/api/types/menuType';


// 操作类型
const darType = ref('')
// 抽屉显隐
const drawer = ref(false);
// 标题
const menuTitle = ref('新增菜单')

const ruleFormRef = ref<FormInstance>()
// form表单
const ruleForm = ref<MenuParamsType>({
    parentId: "",
    type: '1',
    meta: {
        title: '',
        hidden: false,
        cache: false,
        icon: '',
    },
    sort: 1,
    remark: '',
    component: '',
    redirect: '',
    name: '',
    path: '',
    code: '',
})
const options = ref<any>()
// 层级 连选器 映射
const props = {
    checkStrictly: true,
    value: "id",
    label: "title",
    emitPath: false,
};
// 取消  关闭抽屉
const handleClose = () => {    
    ruleFormRef.value?.resetFields()
    drawer.value = false
}
const emits = defineEmits(['getMenuLists'])
// 提交表单数据
const submitForm = () => {
    ruleFormRef.value?.validate((valid: boolean) => {
        console.log(valid);
        if (valid) {
            if (ruleForm.value.type === '2') {
                ruleForm.value.path = "";
                ruleForm.value.component = "";
                ruleForm.value.redirect = "";
                ruleForm.value.name = "";
                ruleForm.value.meta.icon = "";
                ruleForm.value.meta.hidden = false;
                ruleForm.value.meta.cache = false;
                
            } 
            submit()
        }

    })
}
// 提交数据
const submit = async () => {
    if (darType.value === "add") {
        // 新增
        delete ruleForm.value.code
        await addMenu(ruleForm.value)
    } else {
        // 修改
        await editMenu(ruleForm.value)
    }
    drawer.value = false
    ElNotification({
        title: '成功',
        message: '操作成功',
        type: 'success',
    })

    // 关闭抽屉 清空
    handleClose()
    // 重新请求数据
    emits('getMenuLists')
}


// 请求选择菜单数据
const getslece = async () => {
    const res = await selectMenu()
    console.log(res);
    options.value = res.data
}

// 
const openDrawer = (type: string, title: string, data = {} as any) => {
    getslece() // 调用 请求选择菜单数据
    drawer.value = true
    darType.value = type //  操作类型
    menuTitle.value = title // 标题
   ruleForm.value.parentId = data.parentId
    if (type === "edit") {
        // ruleForm.value = {...data.row}
        nextTick(()=>{
            ruleForm.value = _.cloneDeep(data.row) // 深拷贝
        })
    }
}

// 暴露子组件方法
defineExpose({
    openDrawer,
})



</script>
<style lang='scss' scoped></style>