<template>
    <div class="index index-main">
        <!-- 营业数据统计 -->
        <div class="index_oen">
            <div class="index_oen_title">营业数据统计</div>
            <el-row :gutter="20">
                <el-col :span="6" :lg="6" :md="12" :sm="24" :xs="24">
                    <el-card shadow="hover">
                        <div class="one-contents" style="background-image: linear-gradient(to right,#02ba27,#57d170);">
                            <div style="display: flex; align-items: center;">订单笔数 <svg-icon
                                    icon="QuestionFilled"></svg-icon></div>
                            <div style="width: 100%;text-align: left;">{{ datas?.totalOrderNum }} <span style="font-size: 12px;">笔</span></div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6" :lg="6" :md="12" :sm="24" :xs="24">
                    <el-card shadow="hover">
                        <div class="one-contents" style="background-image: linear-gradient(to right,#f52d13,#f65844);">
                            <div style="display: flex; align-items: center;">销售总额 <svg-icon
                                    icon="QuestionFilled"></svg-icon></div>
                            <div style="width: 100%;text-align: left;">{{ datas?.totalSaleMoney }} <span style="font-size: 12px;">元</span></div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6" :lg="6" :md="12" :sm="24" :xs="24">
                    <el-card shadow="hover" style="background-image: linear-gradient(to right,#fb9a08,#fca82a);">
                        <div class="one-contents">
                            <div style="display: flex; align-items: center;">退款总额 <svg-icon
                                    icon="QuestionFilled"></svg-icon></div>
                            <div style="width: 100%;text-align: left;">{{ datas?.totalReturnedMoney }} <span style="font-size: 12px;">元</span></div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6" :lg="6" :md="12" :sm="24" :xs="24">
                    <el-card shadow="hover">
                        <div class="one-contents" style="background-image: linear-gradient(to right,#2263e6,#779fef);">
                            <div style="display: flex; align-items: center;">综合收入 <svg-icon
                                    icon="QuestionFilled"></svg-icon></div>
                            <div style="width: 100%;text-align: left;">{{ datas?.totalIncomeMoney }} <span style="font-size: 12px;">笔</span></div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <!-- 分类销售以及近30天销售趋势 -->
        <div class="index_tow">
            <el-row :gutter="20">
                <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
                    <el-card shadow="hover">
                        <h3>分类销售统计</h3>
                        <p style="font-size: 13px;">每种商品分类的近30天销售数据</p>
                        <div ref="ones" style="width: 70%;height: 300px;"></div>
                    </el-card>
                </el-col>
                <el-col :span="16" :lg="16" :md="16" :sm="24" :xs="24">
                    <el-card shadow="hover">
                        <!-- <h3>近30天销售趋势</h3> -->
                        <div ref="tows" style="width: 85%;height: 300px;"></div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div class="index_tow">
            <el-row :gutter="20">

                <el-col :span="16" :lg="16" :md="16" :sm="24" :xs="24">
                    <el-card shadow="hover">
                        <!-- 会员消费Top10 -->
                        <div ref="threes" style="width: 85%;height: 300px;"></div>
                    </el-card>
                </el-col>
                <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
                    <el-card shadow="hover">
                        <h3>气温仪表盘℃</h3>
                        <div ref="perature" style="width: 100%; height: 300px;"></div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { reactive, ref, onMounted } from 'vue';
const input = ref('')
import { defineAsyncComponent } from 'vue';
import { oneList,towList,threeList,temperature } from './dataList'

import type { Data, thiretyData,fourDataType } from '@/api/types/indexType'
import { getstatisticsApi, getcategoryDataApi,get30daysApi, getmemberApi} from '@/api/indexs/index'
const datas = ref<Data | any>()
const getData = () => {  // 营业数据统计
    getstatisticsApi().then(res => {
        datas.value = res.data
    })
}
onMounted(() => {
    getData()
    getoneList()  //初始化分类销售统计数据
    gettowList() //近30天销售趋势
    getfourList() //会员消费Top10
    getperatureData()// 气温仪表盘
}) 
// 分类销售统计
const ones = ref()
const getoneList = async () => { // 分类销售统计 数据请求
    const res = await getcategoryDataApi()
    // console.log(res);
    oneList(ones.value, res.data)
}
// 近30天销售趋势
const tows=ref()
const gettowList= async ()=>{
    const res=await get30daysApi()
    // console.log(res.data);
    towList(tows.value,res.data)
}
//会员消费Top10
const threes=ref()
const getfourList= async ()=>{
    const res=await getmemberApi()
    console.log(res.data);
    threeList(threes.value,res.data)
}
// 温度 
const perature=ref()
const getperatureData=()=>{
    temperature(perature.value,[])
}



</script>
<style lang='scss' scoped>
.index {

    .index_oen {
        .index_oen_title {
            font-size: 17px;
            margin: 15px 0;
            border-left: 3px solid #409eff;

            padding-left: 10px;
        }

        .el-row {
            .el-col {
                margin-bottom: 15px !important;

                :deep(.el-card__body) {
                    padding: 0 !important;
                    text-align: center;
                    .one-contents {
                        padding: 20px;
                        color: #fff;
                    }
                }
            }
        }
    }

    .index_tow {
        .el-row {
            .el-col {
                margin-bottom: 15px !important;

                .el-card {
                    height: 380px;
                }
            }
        }
    }
}
</style>