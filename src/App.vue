<template>
  <global-header :user="currentUser"></global-header>
  <loading v-if="isLoading"></loading>
  <router-view></router-view>
  <global-footer></global-footer>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import createMessage from '@/creareMessage.ts'
import axios from 'axios'
import Loading from '@/components/Loading.vue'
import GlobalHeader from './components/GlobalHeader.vue'
import GlobalFooter from './components/GlobalFooter.vue'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    GlobalFooter,
    Loading
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => { return store.state.user })
    const isLoading = computed(() => { return store.state.loading })
    const error = computed(() => { return store.state.error })
    onMounted(() => { console.log(store.state.user) })
    // watch (單個值或是一個getter,callback)
    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createMessage(message, 'error')
      }
    })
    return {
      currentUser,
      isLoading,
      error
    }
  }
})
</script>
