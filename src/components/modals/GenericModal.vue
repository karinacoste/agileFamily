<template>
  <div>
    <h1 class="text-left text-3xl font-bold">{{ title }}</h1>
    <modalComponent
      :is="modalComponent"
      :modalData="modalData"
      @onCloseModal="callCloseModal"
    />
  </div>
</template>

<script>
import { computed, defineAsyncComponent } from '@vue/runtime-core'
// import InputField from '../forms/commons/InputField.vue'
export default {
  components: {
    modalComponent: defineAsyncComponent(() => {
      return import(`@/components/forms/ObjectiveForm.vue`)
    }),
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    componentName: {
      type: String,
      default: '',
    },
    componentPath: {
      type: String,
      default: '',
    },
    // modalData: {
    //   type: String,
    //   default: '',
    // },
    modalData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    function callCloseModal() {
      context.emit('onCloseModal')
    }
    return { callCloseModal }
  },
}
</script>
