<template>
  <div class="container">
    <!-- 如果元件使用駝峰命名法 template可以改成 用 '-' 連接的小寫單字 -->
    <!-- <column-list :list="list"></column-list> -->
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3"><label class="form-label">電子郵件</label></div>
      <validate-input type="email"
        :rules="emailRules"
        v-model="emailVal"
        placeholder="帳號"
        ref="inputRef"></validate-input>
      <validate-input type="password"
        :rules="passwordRules"
        v-model=" passwordVal"
        placeholder="密碼"></validate-input>
      <!-- v-slot:submit = #submit -->
      <!-- 命名插槽要搭配template來使用 -->
      <template #submit>
        <span class="btn btn-primary">提交</span>
      </template>
    </validate-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import ValidateInput, { RulesProp } from '@/components/VaildateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import createMessage from '@/creareMessage.ts'
export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const emailVal = ref('')
    const passwordVal = ref('')
    const inputRef = ref<any>()
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }
        store.dispatch('loginAndFetch', payload).then(() => {
          createMessage('登入成功2秒以後跳轉到首頁', 'success', 1000)
          setTimeout(() => {
            router.push('/')
          }, 1000)
        }
        ).catch(e => { console.log(e) })
      }
    }
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const emailRules: RulesProp = [
      { type: 'required', message: '請輸入電子信箱' },
      { type: 'email', message: '請輸入正確的電子信箱' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '請輸入密碼' }
    ]
    return {
      emailRef,
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit,
      inputRef
    }
  }

})
</script>
