<template>
    <div class="common-layout">
        <el-container class="lay-container">
            <!-- 自定义左侧的组件 -->
            <common-aside></common-aside>
            <!-- 右边内容 -->
             <el-container >
                <el-header class="el-header">
                    <common-header></common-header>
                </el-header>
                <CommonTab></CommonTab>
                <el-main class="right-main">
                    <RouterView></RouterView>
                </el-main>
             </el-container>
        </el-container>
    </div>
</template>

<script setup>
import CommonAside from '@/components/CommonAside.vue';
import CommonHeader from '@/components/CommonHeader.vue';
import CommonTab from '@/components/CommonTab.vue';
</script>

<style lang="less" scoped>
.common-layout,.lay-container{
    height: 100vw;
}
.el-header{
    background-color: #333;
}
</style>