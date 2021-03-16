<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <img :src="author.avatar"
          :alt="author.title"
          class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{author.nickName}}</h4>
        <p class="text-muted">{{author.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import PostList from '@/views/PostList.vue'
import MarkdownIt from 'markdown-it'
export default defineComponent({
  name: 'column',
  components: {
    PostList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const md = new MarkdownIt()
    const curentId = route.params.id
    const author = computed(() => { return store.state.Author })
    const list = computed(() => { return store.state.posts })
    store.dispatch('fetchColumn', curentId)
    store.dispatch('fetchAuthor', curentId)
    onMounted(() => { console.log('list', list) })
    return {
      author,
      list: list
    }
  }
})
</script>
