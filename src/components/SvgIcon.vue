<!-- 自定义封装 icon 图标 -->

<template>
    <!-- <el-icon :size="size" :color="color">
        <component :is="icon"></component>
    </el-icon> -->

    <rander />

</template>
<script setup lang='ts'>
import { h, resolveComponent } from 'vue'

// withDefaults(
//     defineProps<{ icon: string; color?: string; size?: string | number }>(), {
//     color: '#000',
//     size: '16px'
// }
// )
const props = withDefaults(
    defineProps<{ icon: string; color?: string; size?: string | number }>(), {
    size: '16px'
}
)
const rander = () => {
    if (props.icon) {
        return h(resolveComponent('el-icon'), {
            size: props.size,
            color: props.color
        }, () => h(resolveComponent(props.icon))
        )
    } else {
        return h('i')
    }

}


</script>
<style lang='scss' scoped></style>