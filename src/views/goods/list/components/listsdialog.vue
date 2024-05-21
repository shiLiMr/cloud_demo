<template>
    <el-drawer v-model="drawer" size="800px" :title="isTitle" direction="rtl" :before-close="handleClose">
        <el-form class="list-dialog" :model="form" label-width="90px" label-suffix=" :" inline status-icon
            ref="ruleformRef" :rules="rules">
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入商品名称" show-word-limit maxlength="30" clearable
                    @clear="Clear" />
            </el-form-item>
            <el-form-item label="商品分类" prop="categoryId">
                <el-select v-model="form.categoryId" placeholder="请选择商品分类" style="width: 240px" clearable>
                    <el-option v-for="item in options" :key="item.categoryId" :label="item.categoryName"
                        :value="item.categoryId" />
                </el-select>
            </el-form-item>
            <el-form-item label="商品编码" prop="code">
                <el-input v-model="form.code" placeholder="请输入(支持条码枪)" clearable />
            </el-form-item>
            <el-form-item label="商品规格" prop="specsName">
                <el-input v-model="form.specsName" placeholder="请输入商品规格名称" show-word-limit maxlength="20" clearable />
            </el-form-item>
            <el-form-item label="库存数量" prop="stockNum">
                <el-input-number style="width: 100%;" v-model="form.stockNum" placeholder="请输入库存数量" :precision="2"
                    :min="1" clearable />
            </el-form-item>
            <el-form-item label="商品单位" prop="unitName">
                <el-input v-model="form.unitName" placeholder="请输入商品单位" />
            </el-form-item>
            <el-form-item label="销售价格" prop="price">
                <el-input-number style="width: 100%;" placeholder="0.00" v-model="form.price" :precision="2" :min="1" />
            </el-form-item>
            <el-form-item label="商品特价" prop="discountPrice">
                <el-input-number style="width: 100%;" placeholder="0.00" v-model="form.discountPrice" :precision="2"
                    :min="1" />
            </el-form-item>
            <el-form-item label="成本价格" prop="cost">
                <el-input-number style="width: 100%;" placeholder="0.00" v-model="form.cost" :precision="2" :min="1" />
            </el-form-item>
            <el-form-item label="获得积分" prop="score">
                <el-input-number style="width: 100%;" placeholder="请输入获得积分" v-model="form.score" :precision="2"
                    :min="1" />
            </el-form-item>
            <el-form-item label="商品状态" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio value="1" border>上架</el-radio>
                    <el-radio value="0" border>下架</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="品牌名称" prop="brand">
                <el-input v-model="form.brand" placeholder="请输入品牌名称" show-word-limit maxlength="30" clearable />
            </el-form-item>
            <el-form-item label="品牌简码" prop="quickCode">
                <el-input v-model="form.quickCode" placeholder="方便快速搜索产品" show-word-limit maxlength="30" clearable />
            </el-form-item>
            <el-form-item label="商品产地" prop="address">
                <el-input v-model="form.address" placeholder="商品产地最多100个字" show-word-limit maxlength="100" clearable />
            </el-form-item>
            <el-form-item label="排序号" prop="sort">
                <el-input-number style="width: 100%;" placeholder="请输入" v-model="form.sort" :min="1" />
            </el-form-item>
            <el-form-item label="备注信息" prop="remark">
                <el-input v-model="form.remark" placeholder="备注信息最多100个字" show-word-limit maxlength="100" clearable />
            </el-form-item>
            <el-form-item style="width: 600px;" label="商品主图" prop="">
                <el-upload class="avatar-uploader" action="" :http-request="handleUpdate" :show-file-list="false">
                    <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
                <p style="font-size: 12px;">上传的图片大小不能超过1MB，格式为 png/jpg/ipeg 的文件。</p>
            </el-form-item>
            <el-form-item style="width: 95%;" label="商品详情" prop="goodsDetail">
                <!-- 富文本 -->
                <div style="border: 1px solid #ccc">
                    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                        mode="default" />
                    <Editor style="height: 500px; overflow-y: hidden;" v-model="form.remark"
                        :defaultConfig="editorConfig" mode="default" @onCreated="handleCreated" />
                </div>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-row justify="center" style="margin-top: 20px;">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="addSubmit">确 定</el-button>
            </el-row>

        </template>
    </el-drawer>
</template>
<script setup lang='ts'>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

import { nextTick, reactive, ref } from 'vue';
import { getGoodsCategoryApi, } from '@/api/goods/list';
import type { getGoodsCategory, Datumcate, addListType } from '@/api/types/listType'
import _ from 'lodash'
import { ElNotification, type FormInstance, type FormRules, type UploadRequestOptions } from 'element-plus';
import { getGoodsCategoryAddApi, getGoodsCategoryEditApi, getImagesApi } from '@/api/goods/list'

const drawer = ref(false);  // 是否关闭 抽屉
const isTitle = ref<string>(' ')// 弹窗标题
const DiaType = ref<string>(' ') // 弹窗类型
const handleUpdate = async (options: UploadRequestOptions) => { //图片上传
    console.log(options);
    // 1.. 打开弹出框
    // 2..获取选择的文件
    const file = options.file;
    // 3.. 判断文件大小
    if (file.size > 1 * 1024 * 1024) {
        ElNotification.error('上传大小不能超过1MB')
        return;
    }
    // 4.。判断文间 类型
    const type = file.type;
    const arr = ['image/png', 'image/jpg', 'image/jpeg'];
    if (!arr.includes(type)) {
        ElNotification.error('上传图片格式不正确')
        return;
    }
    // 5. 创建formdata对象
    const formdata = new FormData();
    // 6. 添加文件
    formdata.append('file', file);
    formdata.append('data', JSON.stringify({ sourceType: "goods_img" }))
    // 7. 发送请求
    const res = await getImagesApi()
    // 8.. 将返回的图片地址赋值给imageUrl
    form.value.imageUrl = res.data;
    ElNotification.success('图片上传成功！')
}


const options = ref<Datumcate[]>() // 商品分类列表
const getcateLists = async () => { //获取商品分类数据
    const res = await getGoodsCategoryApi()
    console.log(res);
    options.value = res.data
}
const handleClose = () => { // 关闭抽屉
    drawer.value = false;
    form.value.imageUrl = ''
    ruleformRef.value?.resetFields();//重置表单
};
const ruleformRef = ref<FormInstance>()//表单ref
const form = ref<addListType>({
    status: '1',//商品状态
    sort: 1,//排序号
    name: "",//商品名称
    quickCode: "",//商品简码
    categoryId: null,//商品分类id
    code: "",//商品编码
    specsName: "",//商品规格
    stockNum: null,//库存数量
    unitName: "",//商品单位
    price: null,//商品价格
    discountPrice: null,//商品折扣价格
    cost: null,//商品成本价
    score: null,//商品积分
    brand: "",//商品品牌
    address: "",//商品产地
    remark: "", //商品备注
    goodsDetail: "",//商品详情
    imageUrl: '',//商品图片
    id: 0,
})
import pinyin from 'js-pinyin';
const validatorName = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('商品分类为必填项！'))

    } else {
        callback()
        //验证是否是中文
        var pattern1 = new RegExp("[\u4E00-\u9FA5]+");
        if(pattern1.test(value)){
            pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
            form.value.quickCode=pinyin.getCamelChars(value)
        }
        //验证是否是英文
        var pattern2 = new RegExp("[A-Za-z]+");
        if(pattern2.test(value)){
            form.value.quickCode=value.toUpperCase()
        }
        //验证是否是数字
        var pattern3 = new RegExp("[0-9]+");
        if(pattern3.test(value)){
            form.value.quickCode = value
        } 
    }
}
const Clear=()=>{
    form.value.quickCode=''
}
const rules = reactive<FormRules<addListType>>({
    name: [{ validator: validatorName, required: true, trigger: 'blur' }],
    categoryId: [{ required: true, message: '商品分类为必填项！', trigger: 'change' }],
    code: [{ required: true, message: '商品编码为必填项！', trigger: 'blur' }], // 
    stockNum: [{ required: true, message: '库存数量为必填项！', trigger: 'blur' }],
    price: [{ required: true, message: '商品价格为必填项！', trigger: 'blur' }],
})

// 打开 抽屉
const openDrawer = (type: string, title: string, data = {} as any) => {
    getcateLists()// 获取商品分类数据
    isTitle.value = title
    DiaType.value = type
    drawer.value = true
    if (type === 'edit') {
        nextTick(() => {
            console.log(data);
            form.value = _.cloneDeep(data)
            form.value.status = data.status.toString()
        })
    }
}
// 暴露子组件方法
defineExpose({
    openDrawer,
})
const emits = defineEmits(['getGoodsList'])

const addSubmit = () => { //提交按钮
    ruleformRef.value!.validate(async (valid: boolean) => {
        if (!valid) return
        if (DiaType.value === 'add') {
            const res = await getGoodsCategoryAddApi(form.value)
            console.log(res);
            if (res.code === 20000) {
                ElNotification.success(res.message)
                drawer.value = false
            }
        } else {
            const res = await getGoodsCategoryEditApi(form.value)
            console.log(res);
            if (res.code === 20000) {
                ElNotification.success(res.message)
                drawer.value = false
            }
        }
        emits('getGoodsList')
    })
}
const handleBlur = () => {  //输入框失焦事件      
    form.value.quickCode = form.value.name
}
</script>
<style lang='scss' scoped>
.list-dialog {
    >.el-form-item {
        width: 45%;
    }
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader {
    border: 1px dashed #ccc !important;
    border-radius: 6px;
    width: 178px;
    height: 178px;
}

.avatar-uploader:hover {
    border-color: #409eff !important;
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>