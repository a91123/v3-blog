<template>
  <div class="container">
    <vaildate-from @form-submit="onFormSubmit">
      <vaildate-input placeholder="電子郵件"
        :rules="emailRules"
        v-model="formData.email"
        type="text"></vaildate-input>
      <vaildate-input placeholder="暱稱"
        :rules="nickNameRules"
        v-model="formData.nickName"
        type="text"></vaildate-input>
      <vaildate-input placeholder="密碼"
        :rules="passwordRules"
        v-model="formData.password"
        type="password"></vaildate-input>
      <vaildate-input placeholder="請再次輸入密碼"
        :rules="repeatPasswordRules"
        v-model="formData.repeatPassword"
        type="password"></vaildate-input>
    </vaildate-from>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import VaildateInput, { RulesProp } from '@/components/VaildateInput.vue'
import VaildateFrom from '@/components/ValidateForm.vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import createMessage from '@/creareMessage.ts'
export default defineComponent({
  components: {
    VaildateInput,
    VaildateFrom
  },
  setup () {
    const router = useRouter()
    const formData = reactive({
      email: '',
      nickName: '',
      password: '',
      repeatPassword: ''
    })
    const emailRules: RulesProp = [
      { type: 'required', message: '請輸入電子郵件' },
      { type: 'email', message: '請輸入正確的電子郵件' }
    ]
    const nickNameRules: RulesProp = [
      { type: 'required', message: '請輸入暱稱' }
    ]
    const passwordRules: RulesProp = [
      { type: 'password', message: '密碼至少要六個字' }
    ]
    const repeatPasswordRules: RulesProp = [
      {
        type: 'custom',
        passwordRepeat: () => {
          return formData.password === formData.repeatPassword
        },
        message: '請輸入相同的密碼'
      }
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: formData.email,
          password: formData.password,
          nickName: formData.nickName
        }
        axios.post('/users', payload).then(() => {
          createMessage('註冊成功', 'success')
          router.push('/login')
        }).catch(e => {
          console.log('123')
        })
      }
    }
    return {
      formData,
      emailRules,
      nickNameRules,
      passwordRules,
      repeatPasswordRules,
      onFormSubmit
    }
  }
})
</script>
