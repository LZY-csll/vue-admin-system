<template>
    <div class="header">
        <div class="left-content">
            <!-- 控制左边菜单收展的按钮 -->
            <el-button size="small" @click="handleCollapse">
                <component class="icons" is="menu"></component>
            </el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/" class="bread">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="right-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img :src="getImageUrl('user')"  class="user"/>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click="handleExit()">退出</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
 
</template>

<script setup>

import { useRouter } from 'vue-router';
import { useAllDataStore } from '../stores';


const getImageUrl = (user)=> {
    return new URL(`../assets/images/${user}.png`,import.meta.url).href
}
const store = useAllDataStore()
function handleCollapse() {
    store.toggleCollapse()
}
const router = useRouter()
function handleExit() {
    store.cleanUserData()
    router.push('/login')
}
</script>

<style lang="less" scoped>
.header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:100%;
    height:100%;
    background-color:#333;
}
.icons{
    width:20px;
    height:20px;

}

.left-content{
    display:flex;
    align-items:center;
    .el-button{
        margin-right:20px;
    }
}
.right-content{
    .user{
        width:40px;
        height:40px;
        border-radius:50%;
    }
}
.left-content .bread :deep(span) {
    
    color:#fff !important;
    cursor:pointer !important;
}
</style>

