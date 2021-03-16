<template>
  <div class="file-upload">
    <div class="file-upload-container"
      v-bind="$attrs"
      @click.prevent=" triggerUpload">
      <h2 v-if="!uploadData">上傳圖片</h2>
      <img v-else
        :src="uploadData&&uploadData.path"
        alt="">
      <!-- <slot v-if="fileStatus==='loading'"
        name="loading"><button class="btn btn-primary"
          disabled>正在上傳</button>
      </slot>
      <slot v-else-if="fileStatus==='success'"
        :uploadData="uploadData"
        name="uploaded"><button class="btn btn-primary">上傳成功</button>
      </slot>
      <slot v-else>
        <slot>
          <button class="btn btn-primary">點擊上傳</button>
        </slot>
      </slot> -->
    </div>
    <input type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange">
  </div>
</template>
<script lang="ts">
import axios from 'axios'
import { defineComponent, PropType, ref } from 'vue'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    }
  },
  emits: ['file-uploaded', 'file-uploaded-error'],
  inheritAttrs: false,
  setup (props, context) {
    const uploadData = ref()
    const fileStatus = ref<UploadStatus>('ready')
    const fileInput = ref<null | HTMLInputElement>(null)
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files)
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) {
            return
          }
        }
        // fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append('file', files[0])
        axios.post(props.action, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then((res) => {
          context.emit('file-uploaded', res.data.path)
          console.log(res.data.path)
          uploadData.value = res.data
          // fileStatus.value = 'success'
        }).catch((error) => {
          // fileStatus.value = error
          context.emit('file-uploaded-error', { error })
        }).finally(() => {
          if (fileInput.value) {
            // 最後把無論成功與否 把 input值歸零清空
            fileInput.value.value = ''
          }
        })
      }
    }
    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileChange,
      uploadData
    }
  }
})
</script>
<style >
.file-upload-container{
  width: 100%;
  height: 500px;
}
</style>
