<template>
    <div class="index index-main">
        <!-- 营业数据统计 -->
        <div class="index_oen">
            <div class="index_oen_title">营业数据统计</div>
            <el-row :gutter="20">
                <el-col :span="6"  :lg="6" :md="12" :sm="24"  :xs="24">
                    <el-card  shadow="hover">1</el-card>
                </el-col>
                <el-col :span="6" :lg="6" :md="12" :sm="24" :xs="24">
                    <el-card shadow="hover">2</el-card>
                </el-col>
                <el-col :span="6" :lg="6" :md="12" :sm="24" :xs="24">
                    <el-card shadow="hover">3</el-card>
                </el-col>
                <el-col :span="6" :lg="6" :md="12" :sm="24" :xs="24">
                    <el-card shadow="hover">4</el-card>
                </el-col>
            </el-row>
        </div>
         <!-- 分类销售以及近30天销售趋势 --> 
        <div class="index_tow">
            <el-row :gutter="20">
                <el-col :span="8"  :lg="8" :md="8" :sm="24"  :xs="24">
                    <el-card  shadow="hover">分类销售统计</el-card>
                </el-col>
                <el-col :span="16" :lg="16" :md="16" :sm="24" :xs="24">
                    <el-card shadow="hover">近30天销售趋势</el-card>
                </el-col>
            </el-row>
        </div>
        <div class="index_tow">
            <el-row :gutter="20">
               
                <el-col :span="16" :lg="16" :md="16" :sm="24" :xs="24">
                    <el-card shadow="hover">会员消费Top10</el-card>
                </el-col>
                <el-col :span="8"  :lg="8" :md="8" :sm="24"  :xs="24">
                    <el-card  shadow="hover">气温仪表盘℃</el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
const input = ref('')

</script>
<style lang='scss' scoped>
.index{
   
    .index_oen{
        .index_oen_title{
            font-size: 17px;
            margin: 15px 0;
            border-left: 3px solid #409eff;

            padding-left: 10px;
        }
        .el-row{
            .el-col{
                margin-bottom: 15px !important;
            }
        }
    }
    .index_tow{
        .el-row{
            .el-col{
                margin-bottom: 15px !important;
                .el-card{
                    height: 380px;
                }
            }
        }
    }
}
</style>