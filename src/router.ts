import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import CreatePost from '@/views/CreatePost.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'
import Signup from '@/views/Signup.vue'
import PostDetail from '@/views/PostDetail.vue'
import store from '@/store.ts'
import axios from 'axios'
const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup,
            meta: { redirectAlreadyLogin: true }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: { redirectAlreadyLogin: true }
        },
        {
            path: '/column/:id',
            name: 'column',
            component: ColumnDetail
        },
        {
            path: '/creatpost',
            name: 'creatpost',
            component: CreatePost,
            meta: { requiredLogin: true }
        },
        {
            path: '/postdetail/:id/:key',
            name: 'postdetail',
            component: PostDetail
        }
    ]
})
router.beforeEach((to, from, next) => {
    const { user, token } = store.state
    const { requiredLogin, redirectAlreadyLogin } = to.meta
    if (!user.isLogin) {
        if (token) {
            axios.defaults.headers.common.authorization = token
            store.dispatch('fetchCurrentUser').then(() => {
                if (redirectAlreadyLogin) {
                    next('/')
                } else {
                    next()
                }
            }).catch(e => {
                console.error(e)
                store.commit('logout')
                next('login')
            })
        } else {
            if (requiredLogin) {
                next('login')
            } else {
                next()
            }
        }
    } else {
        if (redirectAlreadyLogin) {
            next('/')
        } else {
            next()
        }
    }
})
export default router
