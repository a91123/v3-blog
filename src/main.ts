import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router.ts'
import store from '@/store'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
const app = createApp(App)
axios.defaults.baseURL = 'http://localhost:3000/'
// 攔截器 發出請求時 loaddin true
axios.interceptors.request.use((config) => {
    store.commit('setLoading', true)
    store.commit('setError', { status: false, message: '' })
    return config
})
axios.interceptors.response.use((config) => {
    store.commit('setLoading', false)
    return config
}, e => {
    const { error } = e.response.data
    console.log(error)
    store.commit('setLoading', false)
    store.commit('setError', { status: true, message: error })
    return Promise.reject(error)
}
)
app.use(router)
app.use(store)
app.mount('#app')
