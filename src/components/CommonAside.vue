<template>
    
    <el-aside :width="width">
        <el-menu
        background-color="#545c64"
        text-color="#fff"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="route.path"
        :router="true"
        
      >
        <h3 v-show="!isCollapse">通用后台管理系统</h3>
        <h3 v-show="isCollapse">后台</h3>
       
        
        <Menu v-for="item in list" :key="item.path" :item="item"></Menu>
    </el-menu>
    </el-aside>
</template>

<script setup>
import Menu from "./Menu.vue"
import {ref,computed} from "vue"
import { useAllDataStore } from "../stores";
import { useRoute } from "vue-router";

const route = useRoute()
const store = useAllDataStore()
// const list =ref([
//       	{
//           path: '/home',
//           name: 'home',
//           label: '首页',
//           icon: 'house',
//           url: 'Home'
//       	},
//         {
//             path: '/mall',
//             name: 'mall',
//             label: '商品管理',
//             icon: 'video-play',
//             url: 'Mall'
//         },
//         {
//             path: '/user',
//             name: 'user',
//             label: '用户管理',
//             icon: 'user',
//             url: 'User'
//         },
//         {
//             path: 'other',
//             label: '其他',
//             icon: 'location',
//             children: [
//                 {
//                     path: '/page1',
//                     name: 'page1',
//                     label: '页面1',
//                     icon: 'setting',
//                     url: 'Page1'
//                 },
//                 {
//                     path: '/page2',
//                     name: 'page2',
//                     label: '页面2',
//                     icon: 'setting',
//                     url: 'Page2'
//                 }
//             ]
//         }
// ])
// const noChildren = computed(()=>list.value.filter((item)=>!item.children))
// const hasChildren = computed(()=>list.value.filter((item)=>item.children))
// const list = ref([])
// list.value = store.menuList

const list = computed(()=>store.menuList)
const isCollapse = computed(()=>store.isCollapse)
const width = computed(()=>store.isCollapse?"64px":"180px")

</script>

<style lang="less" scoped>

.el-menu{
    
    border-right: none;
    h3{
        line-height: 48px;
        color: #fff;
        text-align: center;
    }
    
}
.el-aside{
    height: 100%;
    // width: 180px;   这个宽度不在样式里写死，折叠后会变化是动态的，直接动态绑定到组件上
    background-color: #545c64;
}
</style>

