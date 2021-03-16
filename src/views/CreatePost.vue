<template>
  <div class="create-post-page container">
    <div class="out"></div>
    <h4>新建文章</h4>
    <uploader action="/upload"
      @file-uploaded="handleImgpath"
      :beforeUpload="uploadCheck"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4">
      <!-- <div class="defaultHeight">
        <h2>點擊上傳</h2>
      </div> -->
      <!-- <template #loading>
        <div class="d-flex">
          <span>Loading...</span>
          <div class="spinner-border text-secondary"
            role="status">
            <span class="sr-only"></span>
          </div>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadData.path">
      </template> -->
    </uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章標題：</label>
        <validate-input :rules="titleRules"
          v-model="titleVal"
          placeholder="請輸入標題"
          type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">文章詳情：</label>
        <validate-input tag="textarea"
          rows="10"
          placeholder="請輸入文章詳情"
          :rules="contentRules"
          v-model="contentVal" />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">發表文章
        </button>
      </template>
    </validate-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { beforeUploadCheck } from '@/helper.ts'
import { useRouter, useRoute } from 'vue-router'
import { GlobalDataProps, PostProps } from '@/store'
import ValidateInput, { RulesProp } from '@/components/VaildateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import Uploader from '@/components/Uploader.vue'
import createMessage from '@/creareMessage.ts'
export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm,
    Uploader
  },
  setup () {
    let ImgPath = ''
    const titleVal = ref('')
    const contentVal = ref('')
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    const titleRules: RulesProp = [
      { type: 'required', message: '請輸入標題' }
    ]
    const contentRules: RulesProp = [
      { type: 'required', message: '文章詳情不能空白唷' }
    ]
    const handleImgpath = (Img: string) => {
      if (Img) {
        ImgPath = Img
        console.log(Img, '我是')
      }
    }
    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'] })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('只能上傳JPG/PNG格式的圖片', 'error')
      }
      return passed
    }
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column,
            author: _id
          }
          if (ImgPath) {
            newPost.image = ImgPath
          }
          store.dispatch('createPost', newPost).then(() => {
            createMessage('上傳成功!!', 'success', 1000)
            setTimeout(() => {
              router.push(`/column/${_id}`)
            }, 1000)
          })
        }
      }
    }
    return {
      titleRules,
      titleVal,
      contentVal,
      contentRules,
      onFormSubmit,
      uploadCheck,
      handleImgpath
    }
  }
})
</script>
<style>
.defaultHeight {
 padding: 50px;
}
.create-post-page .file-upload-container {
  max-height: 400px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
