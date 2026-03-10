import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export type Tag = {
    path: string
    name: string
    label: string
    icon: string
}
type MenuItem = {
    path: string
    name: string
    label: string
    icon: string
    url: string
    children?: MenuItem[]
}

export const useAllDataStore = defineStore("AllData", () => {
    // 管理菜单收展状态
    const isCollapse = ref<boolean>(false)
    function toggleCollapse() {
        isCollapse.value = !isCollapse.value
    }
    // 管理标签状态
    const tags = ref<Tag[]>([
        { path: '/home', name: 'home', label: '首页', icon: 'home' },
    ])
    const currentMenu = ref<Tag | null>(null)

    function selectMenu(val: Tag) {
        if (val.name === 'home') {
            currentMenu.value = null
        } else {
            const index = tags.value.findIndex(item => item.name === val.name)
            if (index === -1) {
                tags.value.push(val)
            }
        }
    }
    function updateTags(item: Tag) {

        let index = tags.value.findIndex(tag => tag.name === item.name)
        tags.value.splice(index, 1)
    }
    // 管理用户权限状态
    const menuList = ref<MenuItem[]>([])
    const token = ref("")

    function updateMenuList(val: MenuItem[]) {
        menuList.value = val
    }
    // 记录用户有权限访问的路径
    const authPaths = ref<string[]>([])
    // 辅助函数，判断是否有子路由，有的话把子路由的path也加进去
    function searchPath(val: MenuItem[]) {
        val.forEach((item: MenuItem) => {
            if (item.path) {
                authPaths.value.push(item.path)
            }
            if (item.children) {
                searchPath(item.children)
            }
        })


    }
    function updateAuthPaths() {
        if (menuList.value) {

            // 每次更新前重置权限数组
            authPaths.value = []
            searchPath(menuList.value)
        }
    }
    // 退出登录时，清除用户数据
    function cleanUserData() {
        menuList.value = []
        token.value = ''
        // 标签数组重置一下，不然会有bug，换一个用户登录会残留上一个用户登录时的标签页
        tags.value = [{ path: '/home', name: 'home', label: '首页', icon: 'home' }]
    }
    return {
        isCollapse, toggleCollapse, selectMenu, tags, currentMenu,
        updateTags, updateMenuList, menuList, token, updateAuthPaths, authPaths, cleanUserData
    }
},
    {
        persist: {
            key: "allData",
            storage: localStorage,
            paths: ["token", "menuList", "tags"]
        } as any
    }
)