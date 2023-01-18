<template>
  <div class="text-left mt-10">
    <label class="ml-1 font-semibold">Definición</label>
    <input
      type="text"
      class="border w-full p-2 pl-3 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"
      v-model="name"
      placeholder="Escribe el objetivo"
    />
    <!-- // ///////////////////////////////// -->

    <label class="ml-1 mt-4 font-semibold">Descripción</label>
    <textarea
      placeholder="Añade una descripción"
      class="border h-48 w-full mt-1 p-2 pl-3 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"
      v-model="description"
    ></textarea>
    <div class="py-4">
      <CustomButton @onEvent="saveObjective" />
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { getISOWeek } from 'date-fns'
import {
  ref,
  computed,
  watchEffect,
  watch,
  defineComponent,
  defineAsyncComponent,
} from 'vue'
import CustomButton from '@/components/buttons/CustomButton.vue'
import { useStore } from 'vuex'
export default {
  components: { CustomButton },
  props: {
    modalData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const name = ref(props.modalData.name)
    const description = ref(props.modalData.description)
    let currentDate = new Date()
    let currentYear = currentDate.getFullYear()
    const store = useStore()
    const sprintById = ref(store.state.sprintById)

    const sprintId = ref(store.state.sprintById.id)
    // if (props.modalData !== null) {
    // }
    const saveObjective = () => {
      let id = ''
      if (props.modalData.id) {
        id = props.modalData.id
      } else {
        id = uuidv4()
      }
      let newObjective = {
        id: id,
        name: name.value,
        description: description.value,
        todo: [],
        progress: [],
        blocked: [],
        completed: [],
      }
      console.log('newObjective', newObjective)
      context.emit('onSaveObjective', newObjective)
    }
    return {
      saveObjective,
      name,
      description,
      sprintId,
      sprintById,
    }
  },
}
</script>

<style></style>
