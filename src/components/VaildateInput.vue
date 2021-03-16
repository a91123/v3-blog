<template>
  <div class="validate-input-container pb-3">
    <input v-bind:="$attrs"
      class="form-control"
      v-if="tag!=='textarea'"
      :class="{'is-invalid':inputRef.error}"
      @blur="validateInput"
      :value="inputRef.val"
      @input="updateValue"
      autocomplete="current-password"
      aria-autocomplete="on">
    <textarea v-bind:="$attrs"
      class="form-control"
      v-else
      :class="{'is-invalid':inputRef.error}"
      @blur="validateInput"
      :value="inputRef.val"
      @input="updateValue"
      autocomplete />
    <span v-if="inputRef.error"
      class="invalid-feedback">
      {{inputRef.message}}
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from 'vue'
import { emitter } from './ValidateForm.vue'
const emailReg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

interface RuleProp {
  type: 'required' | 'email' | 'custom' | 'password';
  message: string;
  passwordRepeat?: () => boolean;
}
export type RulesProp = RuleProp[]
export type TagType = 'input' | 'textarea'
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  inheritAttrs: false,
  setup (props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules?.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'custom':
              passed = rule.passwordRepeat ? rule.passwordRepeat() : true
              break
            case 'password':
              passed = inputRef.val.length > 5
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>
