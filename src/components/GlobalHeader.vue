<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link to='/'
      class="navbar-brand"
      href="#">蘋果專欄</router-link>
    <ul v-if="!user.isLogin"
      class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to='/login'
          class="btn btn-outline-light my-2">登入</router-link>
      </li>
      <li class="list-inline-item">
        <router-link to='/signup'
          class="btn btn-outline-light my-2">註冊</router-link>
      </li>
    </ul>
    <ul v-else
      class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好${user.nickName}`">
          <dropdown-item>
            <router-link to="/creatpost"
              class="dropdown-item">新建文章</router-link>
          </dropdown-item>
          <dropdown-item disabled><a href="#"
              class="dropdown-item">編輯資料</a></dropdown-item>
          <dropdown-item><a href="#"
              @click.prevent="logout"
              class="dropdown-item">退出登入</a></dropdown-item>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import router from '@/router'
import { defineComponent, PropType } from 'vue'
import store, { UserProps } from '../store'
import { useRouter } from 'vue-router'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DrowdownItem.vue'
export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown, DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    const router = useRouter()
    const logout = () => {
      store.commit('logout')
      router.push('/')
    }
    return {
      logout
    }
  }
})
</script>
