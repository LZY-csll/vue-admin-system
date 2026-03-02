import { createApp } from 'vue'

import App from './App.vue'
import "@/assets/less/index.less"
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { createPinia } from 'pinia'

import "@/api/mock.js"

import { setupRouterGuards } from './router'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'  //pinia持久化插件

import { useAllDataStore } from './stores'



const pinia = createPinia()

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
const store = useAllDataStore()       //store里的核心数据做了持久化存储，但是authPaths是派生数据，为避免冗余存储，重新进行计算
if (store.menuList.length) {
    store.updateAuthPaths()
}
app.use(router)
app.use(ElementPlus)
setupRouterGuards(pinia)
app.mount("#app")


