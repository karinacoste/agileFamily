<template>
  <div>
    <h1 class="text-left text-3xl font-bold">{{ modalTitle }}</h1>
    <keep-alive>
      <component
        :is="modalComponent"
        @onSaveObjective="saveObjective"
        :modalData="modalData"
      />
    </keep-alive>
  </div>
</template>

<script>
import { computed, defineAsyncComponent } from '@vue/runtime-core'

import ObjectiveForm from '@/components/forms/ObjectiveForm.vue'

export default {
  components: {
    ObjectiveForm,
  },
  props: {
    modalTitle: {
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
    const modalComponent = computed(() => {
      let modalContent = props.componentName
      return modalContent
    })
    function saveObjective(payload) {
      context.emit('onSaveObjective', payload)
    }
    return { modalComponent, saveObjective }
  },
}
</script>
