import { createRouter, createWebHashHistory } from "vue-router"
import { useAllDataStore } from "../stores"
const routes = [
    {
        path: "/",
        name: "main",
        component: () => import("@/views/Main.vue"),
        redirect: "/home",
        children: [
            {
                path: "home",
                name: "home",
                component: () => import("@/views/Home.vue"),
            },
            {
                path: "user",
                name: "user",
                component: () => import("@/views/User.vue"),
            },
            {
                path: "mall",
                name: "mall",
                component: () => import("@/views/Mall.vue"),
            },
            {
                path: "page1",
                name: "page1",
                component: () => import("@/views/Page1.vue"),
            },
            {
                path: "page2",
                name: "page2",
                component: () => import("@/views/Page2.vue"),
            },

        ]
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: () => import("@/views/NotFound.vue"),
    },
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})




export function setupRouterGuards(pinia) {
    const store = useAllDataStore(pinia)


    router.beforeEach((to, from) => {


        if (!store.token) {
            if (to.path !== '/login')
                return '/login'
        }
        if (store.token) {
            //  防止越权访问
            if (store.authPaths.findIndex(item => item == to.path) === -1) {
                if (to.path !== '/:pathMatch(.*)*') {
                    return '/:pathMatch(.*)*'
                }
            }
            if (to.path === '/login') {
                return '/home'
            }
        }

    })
}

export default router