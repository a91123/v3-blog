<template>
  <div class="post-list">
    <article v-for="post in list"
      :key="post.column"
      class="card mb-3 shadow-sm">
      <div class="card-body">
        <h2>
          <router-link :to="`/postdetail/${post.author}/${post._key}`">
            {{post.title}}
          </router-link>
        </h2>
        <div class="cartcon row my-3 align-items-center">
          <div v-if="post.image"
            class="col-4">
            <img :src="post.image"
              :alt="post.title"
              class="rounded-lg w-100">
          </div>
          <p class="content"
            :class="{'col-6': post.image}">{{post.excerpt}}</p>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType } from 'vue'
import { PostProps } from '@/store'

export default defineComponent({
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>
    }

  },
  setup (props) {
    onMounted(() => console.log(props.list))
    return {
      post: props.list
    }
  }
})
</script>

<style scoped>
a{
  text-decoration: none;
  color:#1a1a1a;
}
.post-list h4 a:hover {
  color:#0d6efd;
}
</style>
