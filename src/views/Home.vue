<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg"
            alt="callout"
            class="w-50" />
          <h2 class="font-weight-light">隨心寫作，自由表達</h2>
          <p>
            <a href="#"
              class="btn btn-primary my-2">開始寫文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">發現精彩</h4>
    <column-list :list="list"></column-list>
    <button class="mx-auto mb-3 mt-2 btn ml-auto btn-primary d-flex">發現更多
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import ColumnList from '@/components/ColumnList.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

import createMessage from '@/creareMessage.ts'
export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const beforeUpload = (file: File) => {
      const isJpg = file.type === 'image/jpeg'
      if (!isJpg) {
        createMessage('只能上傳jpg檔案', 'error')
      }
      return isJpg
    }
    const onFileUpload = () => {
      createMessage('上傳圖片成功', 'success')
    }
    const onFileUploadedError = ({ error }: any) => {
      createMessage('上傳失敗' + error, 'error')
    }
    onMounted(() => {
      store.dispatch('fetchColumns')
      console.log(store.state.user.isLogin)
      console.log()
    })
    const list = computed(() => { return store.state.columns })
    return {
      list: list,
      beforeUpload,
      onFileUpload,
      onFileUploadedError
    }
  }
})
</script>
