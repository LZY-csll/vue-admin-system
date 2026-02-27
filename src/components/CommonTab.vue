<template>
    <div class="tags">
        <el-tag 
        v-for="(item,index) in tags" 
        :key="item.name"
        :closable="item.name!=='home'"
        :effect="route.name===item.name?'dark':'plain'"
        @click="handleMenu(item)"
        @close="handleClose(item,index)"
        >
        {{ item.label }}
        </el-tag>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAllDataStore } from '../stores';
import { storeToRefs } from 'pinia';
const route = useRoute()
const router = useRouter()
const store = useAllDataStore()
const {tags} =  storeToRefs(store)
// console.log(tags.value[0].name);
const handleMenu = (tag)=>{
    router.push(tag.name)
    store.selectMenu(tag)     //咋一看感觉多余了，但是里面有个currentMenu变量状态，也许需要跟新
}
const handleClose = (tag,index)=>{
    // 拿到标签数组长度
    const length = tags.value.length
    store.updateTags(tag)
    // 如果删除的标签不是当前路由的标签，直接返回
    if(tag.name!==route.name) return

    if(tag.name === route.name) {
        // 如果删掉的是最后一个标签,往前一个标签跳转
        if(index === length-1) {
            store.selectMenu(tags.value[index-1])
            router.push(tags.value[index-1].name)
        }else {   //如果是中间的标签那就往后一个标签跳，不用考虑标签为空，因为我的首页标签是不会被删掉的
            store.selectMenu(tags.value[index])
            router.push(tags.value[index].name)
        }
    }
}
</script>

<style lang="less" scoped>
.tags{
    margin: 20px 0 0 20px;
}
.el-tag{
    margin-right: 10px;
    cursor: pointer;
}
</style>