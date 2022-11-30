<template>
  <div class="text-left mt-10">
    <label class="ml-1 font-semibold">Nombre</label>
    <input
      type="text"
      class="border w-full p-2 pl-3 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"
      v-model="name"
      placeholder="Escribe el objetivo"
    />
    <!-- // ///////////////////////////////// -->
    <div class="flex">
      <div class="flex-col w-1/2">
        <label class="ml-1 block font-semibold">Tiempo estimado</label>
        <input
          type="number"
          class="border w-10/12 p-2 pl-3 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"
          v-model="estimateTime"
          placeholder="Número de horas"
        />
      </div>
      <div class="flex-col w-1/2">
        <label class="ml-1 block font-semibold">Prioridad</label>
        <select
          v-model="priority"
          class="border w-full p-2 pl-3 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"
        >
          <option disabled value="">Selecciona una opción</option>
          <option
            v-for="onePriority in prioritiesSelectOptions"
            :key="onePriority"
            :value="onePriority.value"
          >
            {{ onePriority.text }}
          </option>
        </select>
      </div>
    </div>

    <!-- // ///////////////////////////////// -->

    <label class="ml-1 mt-4 font-semibold">Descripción</label>
    <textarea
      placeholder="Añade una descripción"
      class="border h-48 w-full mt-1 p-2 pl-3 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"
      v-model="description"
    ></textarea>
    <div class="flex w-4/6 items-center">
      <div class="ml-auto w-full">
        <label class="ml-1 mt-4 font-semibold">Asignar a:</label>
        <select
          v-model="userAssigned"
          class="border w-full p-2 pl-3 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"
        >
          <option value="" selected>Selecciona un usuario</option>
          <option
            v-for="oneUser in usersSelectOptions"
            :key="oneUser"
            :value="oneUser.value"
          >
            {{ oneUser.text }}
          </option>
        </select>
      </div>

      <div class="ml-4">
        <img class="pt-1" :src="userImage" alt="user image" />
      </div>
    </div>
    <div class="py-4">
      <CustomButton @onEvent="saveTask" />
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
    const store = useStore()
    fetchPriorities()
    async function fetchPriorities() {
      try {
        await store.dispatch('getPriorities')
      } catch (error) {
        console.log('Error priorities:', error)
      }
    }
    // /////////////////////// data que se pasa como argumento por la modal
    const objectiveId = ref(props.modalData.objectiveId)
    const state = ref(props.modalData.state)
    const allUsers = ref(props.modalData.allUsers)
    const userAssigned = ref(props.modalData.userAssigned)
    const taskId = ref(props.modalData.taskId)
    const name = ref(props.modalData.name)
    const estimateTime = ref(props.modalData.estimateTime)
    const priority = ref(props.modalData.priority)
    const description = ref(props.modalData.description)
    // ///////////////////////
    const priorities = computed(() => store.state.priorities)
    const prioritiesSelectOptions = computed(() => {
      const options = []
      for (let priority in priorities.value) {
        options.push({
          text: priorities.value[priority].name,
          value: priorities.value[priority].name,
        })
      }
      return options
    })
    const usersSelectOptions = computed(() => {
      const options = []
      for (let key in allUsers.value) {
        options.push({
          text: allUsers.value[key].name,
          value: allUsers.value[key].uid,
        })
      }
      return options
    })
    // const usersSelectOptions = computed(() => {
    //   console.log('users', users.value)
    //   const options = [{ text: 'Selecciona una opción', value: '0' }]
    //   for (let user in props.modalData.users) {
    //     options.push({
    //       text: priorities.value[priority].name,
    //       value: priorities.value[priority].id,
    //     })
    //   }
    //   console.log('prio', priorities.value)
    //   return options
    // })
    const sprintById = ref(store.state.sprintById)
    const sprintId = ref(store.state.sprintById.id)

    // if (props.modalData !== null) {
    // }
    const saveTask = () => {
      console.log('newTask')
      let taskId = ''
      if (props.modalData.taskId) {
        taskId = props.modalData.taskId
      } else {
        taskId = uuidv4()
      }
      let newTask = {
        objectiveId: objectiveId.value,
        state: state.value,
        taskProperties: {
          id: taskId,
          name: name.value,
          assigned: userAssigned.value,
          estimateTime: estimateTime.value,
          description: description.value,
          priority: priority.value,
        },
      }
      console.log('newTask', newTask)
      context.emit('onSaveTask', newTask)
    }

    const userImage = computed(() => {
      let image = require('@/assets/images/users/user0.png')
      if (userAssigned.value !== '') {
        let userObject = allUsers.value[userAssigned.value]
        image = require('@/assets/images/users/' + userObject.img + '.png')
      }
      return image
    })
    return {
      userImage,
      objectiveId,
      state,
      allUsers,
      userAssigned,
      taskId,
      name,
      estimateTime,
      priority,
      description,
      fetchPriorities,
      saveTask,
      prioritiesSelectOptions,
      usersSelectOptions,
      priorities,
      sprintId,
      sprintById,
    }
  },
}
</script>

<style></style>
