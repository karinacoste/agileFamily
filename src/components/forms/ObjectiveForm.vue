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
    description{{ description }}
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
    const name = ref('')
    const description = ref('')
    const weekNumber = ref(getISOWeek(new Date()))
    let currentDate = new Date()
    let currentYear = currentDate.getFullYear()
    const store = useStore()
    const sprintById = ref(store.state.sprintById)
    const sprintId = ref(store.state.sprintById.id)
    // if (props.modalData !== null) {
    // }
    const saveObjective = () => {
      let newObjective = {
        id: uuidv4(),
        name: name.value,
        description: description.value,
        state: 'todo',
        todo: [],
        progress: [],
        blocked: [],
        completed: [],
      }
      if (!sprintId.value) {
        const sprintInfo = {
          id: `${currentYear}-${weekNumber.value}`.replace(/ /g, ''),
          name: `Sprint ${weekNumber.value}`,
          objectives: [newObjective],
        }
        try {
          store.dispatch('createSprint', sprintInfo)
        } catch (error) {
          console.bug(error)
        }
      } else {
        const newArrayObjectives =
          sprintById.value.objectives.unshift(newObjective)
        store.dispatch('updateSprint', newArrayObjectives)
        console.log('addObjective', sprintById.value.objectives)
      }

      context.emit('onCloseModal')
    }
    return { saveObjective, name, description, sprintId, sprintById }
  },
}
</script>

<style></style>
