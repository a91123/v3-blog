<template>
  <teleport to="#back">
    <div class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
      :style="{backgroundColor: background || ''}">
      <div class="loading-content">
        <div class="spinner-border text-primary"
          role="status">
        </div>
        <p class="text-primary small">{{ text || 'loading'}}</p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useDOMCreate from '@/hook/useDOMCreate.ts'
export default defineComponent({
  props: {
    text: {
      type: String
    },
    background: {
      type: String
    }
  },
  setup () {
    useDOMCreate('back')
  }
})
</script>

<style>
.loading-container {
  background: rgba(255, 255, 255, .5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
}
.loading-container {
  text-align: center;
}
</style>
