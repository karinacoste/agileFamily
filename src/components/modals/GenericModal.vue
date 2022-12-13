<template>
  <div>
    <h1 class="text-left text-3xl font-bold">{{ modalTitle }}</h1>
    <keep-alive>
      <component
        :is="modalComponent"
        @onSaveEditedProfile="saveEditedProfile"
        @onSaveUser="saveUser"
        @onSaveObjective="saveObjective"
        @onSaveTask="saveTask"
        :modalData="modalData"
      />
    </keep-alive>
  </div>
</template>

<script>
import { computed, defineAsyncComponent } from '@vue/runtime-core'

import ObjectiveForm from '@/components/forms/ObjectiveForm.vue'
import TaskForm from '@/components/forms/TaskForm.vue'
import UserForm from '@/components/forms/UserForm.vue'
import NewUserForm from '@/components/forms/NewUserForm.vue'

export default {
  components: {
    ObjectiveForm,
    TaskForm,
    UserForm,
    NewUserForm,
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
    function saveTask(payload) {
      context.emit('onSaveTask', payload)
    }
    function saveUser(payload) {
      context.emit('onSaveUser', payload)
    }
    function saveEditedProfile(payload) {
      context.emit('onSaveEditedProfile', payload)
    }
    return {
      modalComponent,
      saveObjective,
      saveTask,
      saveUser,
      saveEditedProfile,
    }
  },
}
</script>
