<template>
  <div class="post-detail-page">
    <article class="w-75 mx-auto mb-5 pb-3"
      v-if="list">
      <h2 class="mb-4 pb-2 mt-4 text-center border-bottom">{{list.title}}</h2>
      <div class="user-profile d-flex align-items-center pb-2 border-bottom">
        <img :src="author.avatar"
          class="authorImg"
          alt="">
        <div>
          <h6>{{author.nickName}}</h6>
          <p>{{author.description}}</p>
        </div>
      </div>
      <div class="content">{{list.content}}</div>
    </article>
  </div>
</template>
<script lang='ts'>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import { PostDetailProps, AuthorProps, GlobalDataProps } from '@/store.ts'
export default defineComponent({
  setup () {
    const route = useRoute()
    console.log(route.params)
    const store = useStore<GlobalDataProps>()
    store.dispatch('fetchPostDetail', route.params)
    store.dispatch('fetchAuthor', route.params.id)
    const author = computed<AuthorProps>(() => {
      return store.state.Author
    })

    const list = computed<PostDetailProps>(() => {
      return store.state.postdetail
    })
    return {
      list,
      author
    }
  }
})
</script>
<style>
    .headerImg img{
    height: 400px;
    margin:auto;
    object-fit: cover;
    }
   .headerImg{
    display: flex;
         }
    .authorImg{
        max-width: 20%;
    }
    .content{
      white-space: pre-line;
          }
</style>
