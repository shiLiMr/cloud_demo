<template>
    <el-table :data="tableData" style="width: 100%" border stripe>
        <template v-for="(item, index) in columns" :key="index">

            <el-table-column v-if="!item.type" :prop="item.prop" :label="item.label" :align="item.align" />

            <el-table-column v-if="item.type"  :label="item.label" :align="item.align">
                <template #default="{row}">
                    <slot :name="item.type" :row="row"></slot>
                </template>
            </el-table-column>
        </template>

    </el-table>
</template>
<script setup lang='ts'>

defineProps<{ tableData: any[], columns: any[] }>()

</script>
<style lang='scss' scoped></style>