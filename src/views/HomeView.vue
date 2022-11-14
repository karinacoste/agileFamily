<template>
  <div class="w-full h-full min-h-screen bg-gray-100">
    <Modal v-model="isShow" :close="closeModal">
      <div class="modal w-3/6 p-12">
        <generic-modal
          :modalTitle="modalTitle"
          :componentName="modalComponent"
          :modalData="modalData"
          @onSaveObjective="saveObjective"
          @onSaveTask="saveTask"
          @onCancelModal="closeModal"
        ></generic-modal>
      </div>
    </Modal>

    <!-- <p class="font-bold">showedUser {{ showedUser.email }}</p> -->
    <internal-nav-bar :user="userDisplayName"></internal-nav-bar>
    <h1 class="text-2xl font-bold ml-7 my-5">SPRINT 1 {{ userDisplayName }}</h1>
    <!-- <h1 class="text-5xl">{{ showedUser.email }}</h1> -->
    <!-- <button @click="addUser">Crear user</button>
    <button @click="showUsers">Show user</button> -->
    <div class="w-full flex justify-between p-2 m-auto">
      <!-- <p>sprints{{ sprints[0].objectives }}</p> -->
      <div class="w-1/5 px-5">
        <div
          class="w-full mt-0.5 pb-1 items-center justify-between flex font-bold border-b-4 border-gray-300"
        >
          <div class="flex justify-center">OBJETIVOS</div>
          <button
            @click="
              showGenericModal('Nuevo objetivo', 'ObjectiveForm', {
                name: '',
                description: '',
              })
            "
            class="flex mb-1 py-0.5 px-3 items-center border border-gray-500 text-xl"
          >
            +
          </button>
        </div>
      </div>
      <!-- //////////////// -->
      <div class="w-1/5 px-5">
        <div
          class="w-full py-2 bg-gray-500 text-center text-white font-semibold"
        >
          POR HACER
        </div>
      </div>
      <!-- //////////////// -->
      <div class="w-1/5 px-5">
        <div
          class="w-full py-2 bg-blue-500 text-center text-white font-semibold"
        >
          EN CURSO
        </div>
      </div>
      <!-- //////////////// -->
      <div class="w-1/5 px-5">
        <div
          class="w-full py-2 bg-red-500 text-center text-white font-semibold"
        >
          BLOQUEADA
        </div>
      </div>
      <!-- //////////////// -->
      <div class="w-1/5 px-5">
        <div
          class="w-full py-2 bg-green-500 text-center text-white font-semibold"
        >
          HECHA
        </div>
      </div>
    </div>
    <!-- // ////////////////////////////////// -->
    <draggable
      v-model="sprintById.objectives"
      item-key="id"
      class="w-full h-full"
      group="my-group"
    >
      <template #item="{ element: item, index }"
        ><div
          class="w-full flex justify-between p-2 border-b-4 pt-6 border-gray-200"
        >
          <div class="w-1/5 px-4">
            <div
              class="w-full h-48 px-2 font-semibold text-lg hover:cursor-move"
            >
              <div
                class="flex justify-between items-start cursor-pointer"
                @click="
                  showGenericModal('Editar objetivo', 'ObjectiveForm', {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    index: index,
                  })
                "
              >
                <div class="flex">
                  {{ item.name }}
                </div>
                <div class="flex">
                  <OptionsIcon class="fill-current w-5 pt-1" />
                </div>
              </div>
              <button
                @click="
                  showGenericModal('Nueva tarea', 'taskForm', {
                    objectiveId: item.id,
                    state: 'todo',
                    allUsers: allUsersInfObject,
                    userAssigned: '',
                    taskId: '',
                    name: '',
                    estimateTime: 0,
                    priority: '',
                    description: '',
                  })
                "
                class="flex mb-1 py-1 mt-4 px-3 items-center border border-gray-500 text-sm"
              >
                + Añadir tarea
              </button>
            </div>
          </div>
          <div v-for="state in states" :key="state" class="w-1/5 px-5">
            <nested-draggable>
              <draggable
                v-model="item[state]"
                item-key="id"
                class="w-full h-full"
                group="my-group2"
              >
                <template #item="{ element: nestedItem }"
                  ><div
                    class="list-group-item bg-white shadow-md mb-6 px-6 py-4 hover:cursor-move"
                  >
                    <div class="flex items-center pb-3">
                      <span>
                        <img
                          :src="userImage(nestedItem.assigned)"
                          alt="user image"
                      /></span>
                      <div class="ml-3 font-semibold">
                        <!-- <span class="font-normal"> Asignada a:</span> -->
                        {{ userAssignedName(nestedItem.assigned) }}
                      </div>
                    </div>
                    <div class="font-semibold text-lg pl-1 pb-4">
                      <span
                        class="cursor-pointer"
                        @click="
                          showGenericModal('Editar tarea', 'taskForm', {
                            objectiveId: item.id,
                            state: state,
                            allUsers: allUsersInfObject,
                            userAssigned: nestedItem.assigned,
                            taskId: nestedItem.id,
                            name: nestedItem.name,
                            estimateTime: nestedItem.estimateTime,
                            priority: nestedItem.priority,
                            description: nestedItem.description,
                          })
                        "
                      >
                        {{ nestedItem.name }}</span
                      >
                    </div>
                    <div class="flex items-center pb-11 pr-4">
                      <span class="ml-2">Prioridad: </span>
                      <span class="ml-2 font-bold">
                        {{ nestedItem.priority }}</span
                      >
                      <span class="ml-4">Tiempo: </span>
                      <span class="ml-2 font-bold"
                        >{{ nestedItem.estimateTime }}h</span
                      >
                    </div>
                  </div>
                </template>
              </draggable>
            </nested-draggable>
          </div>
        </div>
      </template>
    </draggable>

    <!-- <div class="w-full px-7">
      <div class="h-1 bg-gray-300"></div>
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import GenericModal from '@/components/modals/GenericModal.vue'
import {
  data,
  ref,
  computed,
  watchEffect,
  watch,
  defineComponent,
  defineAsyncComponent,
  reactive,
} from 'vue'
import { useStore } from 'vuex'
import InternalNavBar from '@/components/nav/InternalNavBar.vue'
import OptionsIcon from '@/components/icons/OptionsIcon.vue'
// import DynamicIcons from '@/components/icons/DynamicIcons.vue'
import draggable from 'vuedraggable'
import {
  addDays,
  getTime,
  endOfWeek,
  startOfISOWeek,
  endOfISOWeek,
  getWeek,
  getISOWeek,
  formatISO,
} from 'date-fns'
const store = useStore()
// import NavBar from '../components/nav/NavBar.vue'

let count = 0
export default defineComponent({
  // components: { InternalNavBar, draggable },
  components: {
    InternalNavBar,
    draggable,
    GenericModal,
    OptionsIcon,
  },

  setup() {
    const store = useStore()
    let currentDate = new Date()
    let currentYear = currentDate.getFullYear()
    const weekNumber = ref(getISOWeek(new Date()))
    allAccountInformation()
    let isWaiting = computed(() => store.getters.getterIsWaiting)
    async function allAccountInformation() {
      try {
        await store.dispatch('fetchAllAccountInformation')
        await store.dispatch(
          'getSprintById',
          `${currentYear}-${weekNumber.value}`
        )
        console.log('allAccooun')
      } catch (error) {
        console.log(error)
      }
    }
    function userImage(userId) {
      return userId !== ''
        ? require('@/assets/images/users/' +
            allUsersInfObject.value[userId].img +
            '.png')
        : require('@/assets/images/users/generic-photo.png')
    }
    function userAssignedName(userId) {
      return userId !== ''
        ? allUsersInfObject.value[userId].displayName
        : 'Sin Asignar'
    }
    let allUsersInfObject = computed(() => store.getters.getterUsersInfo)
    let allUsers = computed(() => store.state.allUsersInformations)
    // const priorities = computed(() => store.state.priorities)
    const sprintById = computed(() => store.state.sprintById)
    let modalTitle = ref('')
    let modalComponent = ref('')
    let modalData = ref({})

    async function showGenericModal(title, component, data) {
      modalTitle.value = title
      modalComponent.value = component
      modalData.value = data
      showModal()
    }

    function saveObjective(objective) {
      const getObjectiveIndex = sprintById.value.objectives.findIndex(
        (oneObjective) => oneObjective.id === objective.id
      )
      if (getObjectiveIndex >= 0) {
        // Si el objetivo ya existe en el sprint, se actualiza
        sprintById.value.objectives[getObjectiveIndex].name = objective.name
        sprintById.value.objectives[getObjectiveIndex].description =
          objective.description
      } else {
        // Si es un objetivo nuevo se añade al comienzo del array de objetivos
        sprintById.value.objectives.unshift(objective)
      }

      closeModal()
    }
    function saveTask(task) {
      // Se obtiene el index del objetivo al que pertenece la tarea
      const getObjectiveIndex = sprintById.value.objectives.findIndex(
        (oneObjective) => oneObjective.id === task.objectiveId
      )
      // Si el objetivo existe se busca dentro del estado al que pertenece la tarea si ya existe una con el mismo id
      const getTaskIndex = sprintById.value.objectives[getObjectiveIndex][
        task.state
      ].findIndex((oneTask) => oneTask.id === task.taskProperties.id)

      if (getTaskIndex >= 0) {
        sprintById.value.objectives[getObjectiveIndex][task.state][
          getTaskIndex
        ] = task.taskProperties
      } else {
        console.log('Empieza', getObjectiveIndex)
        sprintById.value.objectives[getObjectiveIndex][task.state].unshift(
          task.taskProperties
        )
        console.log('Enrtra', task.taskProperties)
      }
      // Si es un objetivo nuevo se añade al comienzo del array de objetivos

      closeModal()
    }
    const isShow = ref(false)
    function showModal() {
      isShow.value = true
    }
    function closeModal() {
      isShow.value = false
    }

    // const dateTests = getDateOfWeek(weekNumber, currentYear.value)
    // const dateTests = weekNumber
    const daysPerWeeks = new Date(2022, 0, 295)
    const getDate = daysPerWeeks.getDate()
    const end = startOfISOWeek(currentDate)
    // const dateTests = getWeek(currentDate, { weekStartsOn: 1 })
    //const dateTests = formatISO(endOfISOWeek(currentDate), { format: 'basic' })
    const firstDayOfWeek = getTime(new Date(startOfISOWeek(currentDate)))
    const dateTests = addDays(new Date(firstDayOfWeek), 6)

    const birthday = new Date()
    const sprints = computed(() => store.state.sprints)
    const objectives = computed(() => store.state.sprints[0].objectives)

    // const objectives = ref(store.state.sprints[0].objectives)
    watch(
      () => sprintById.value.objectives,
      (newValue, oldValue) => {
        count++
        if (newValue && count > 1) {
          if (sprintById.value.id) {
            // Se comprueba si el sprint actual ya está guardado en la base de datos,
            // si no hay sprintId se crea un nuevo sprint
            try {
              store.dispatch('updateSprint', newValue)
              console.log('updateSprint from watch objectives', count)
            } catch (e) {
              console.error('Error getAppUsers', e)
            }
          } else {
            const data = {
              id: `${currentYear}-${weekNumber.value}`,
              name: `Sprint ${weekNumber.value}`,
              objectives: newValue,
            }
            store.dispatch('createSprint', data)
          }
        }
      },
      { deep: true }
    )
    const states = ['todo', 'progress', 'blocked', 'completed']
    const userDisplayName = ref(store.state.user.displayName)
    // const sprints = ref(store.getters['getterSprints'])
    // const sprints = ref(store.state.sprints)
    const userAccountId = ref(store.state.user.accountId)
    const authUser = ref(store.state.authUser)
    const userIdToken = ref(store.state.userIdToken)
    // const showUsers = async () => {
    //   try {
    //     store.dispatch('getAppUsers')
    //   } catch (e) {
    //     console.error('Error getAppUsers', e)
    //   }
    // }

    return {
      userAssignedName,
      isWaiting,
      userImage,
      allUsers,
      allUsersInfObject,
      saveObjective,
      saveTask,
      modalTitle,
      modalComponent,
      modalData,
      showGenericModal,
      weekNumber,
      isShow,
      showModal,
      closeModal,
      sprintById,
      dateTests,
      currentYear,
      watchEffect,
      objectives,
      states,
      sprints,
      // sprints: computed(() => store.state.sprints),
      userAccountId,
      // showUsers,
      userDisplayName,
      authUser,
      userIdToken,
    }
  },
})
</script>
<style scoped>
.modal h1 {
  font-size: 30px;
}
.vue-universal-modal {
  /* Change dimmed color */
  background-color: rgba(255, 255, 0, 0.3) !important;
}
.vue-universal-modal-content {
  /* Align to top (flex-direction property value is set to column) */
  background-color: rgba(255, 255, 0, 0.3) !important;
}
</style>
