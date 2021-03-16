<template>
  <div class="container">
    <div class='row'>
      <div class='col-12 mb-4 col-sm-6 col-md-4'
        v-for='column in ColumnList'
        :key='column._id'>
        <div class='card h-100 shadow-sm'>
          <div class='card-body text-center'>
            <img class='img-fulid rounded-cirle border-light w-25 my-3'
              :src='column.avatar' />
            <h5 class='card-title'>{{ column.nickName }}</h5>
            <p class='card-text text-left'>{{ column.description }}</p>
            <router-link :to="`/column/${column._id}`"
              class='btn btn-outline-primary'>進入專欄</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, PropType } from 'vue'
import { ColumnProps } from '../store'
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>, // Array是構造函數 無法斷言類型 用PropTy
      required: true
    }
  },
  setup (props) {
    onMounted(() => {
      console.log(props.list, 123)
    })
    const ColumnList = computed(() => {
      return props.list.map((column) => {
        if (!column.avatar) {
          column.avatar = require('@/assets/column.jpg')
        }
        return column
      })
    })
    return {
      ColumnList,
      dafaultImg: require('@/assets/column.jpg')
    }
  }
})
</script>
