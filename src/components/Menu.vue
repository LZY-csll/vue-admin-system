<template>
    
        <el-sub-menu v-if="item.children?.length"   :index="item.path" >
          <template #title>
            <component class="icon" :is="item.icon"></component>
            <span>{{ item.label }}</span>
          </template>
          <MenuItem v-for="child in item.children" :key="child.path" :item="child"></MenuItem>
        </el-sub-menu>
        <el-menu-item v-else    :index="item.path" @click="handleMenu(item)">
            <component class="icon" :is="item.icon"></component>
            <span>{{ item.label }}</span>
        </el-menu-item>
    
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { useAllDataStore } from '../stores';
import type { MenuItem as MenuItemType} from "@/api/apiData/loginData";
defineOptions({
    name:"MenuItem"
})

const props = defineProps<{item:MenuItemType}>()
const {item} = toRefs(props)

const store = useAllDataStore()
const handleMenu = (item:MenuItemType)=>{
    
    store.selectMenu(item)
}

</script>

<style lang="less" scoped>
.icon{
    width: 18px;
    height: 18px;
    margin-right: 5px;
}
</style>