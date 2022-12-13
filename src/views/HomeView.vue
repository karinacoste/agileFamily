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
    <internal-nav-bar :user="user"></internal-nav-bar>
    <div class="ml-7 mt-3 mb-4">
      <VDropdown placement="bottom-start">
        <!-- This will be the popover target (for the events and position) -->
        <button
          class="flex border-b pb-1 border-gray-100 hover:border-b hover:border-gray-400"
          @click="openSprintMenu"
        >
          <div class="flex align-middle items-center">
            <span class="text-2xl font-bold">{{ sprintName }}</span>
            <span class="text-lg ml-3"> {{ sprintDescription }}</span>
            <span class="w-5 ml-2 pt-1"
              ><ChevronDownIcon
                class="transition-transform duration-300"
                :class="{ 'rotate-180': isOpenSprintMenu }"
              ></ChevronDownIcon
            ></span>
          </div>
        </button>
        <!-- This will be the content of the popover -->
        <template #popper="{ hide }">
          <div
            class="flex left-0"
            v-if="sprints.length"
            @click="openSprintMenu"
          >
            <ul class="p-2" @click="hide()">
              <li
                class="hover:bg-slate-200 px-2 py-1 cursor-pointer"
                v-for="(sprint, index) in sprints"
                :key="index"
                @click="showSprintById(sprint.id)"
              >
                <span class="font-bold">{{ sprint.name }}</span>
                {{ sprint.description }}
              </li>
            </ul>
          </div>
        </template>
      </VDropdown>
    </div>
    <div class="w-full flex justify-between p-2 m-auto">
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
                    <div class="flex items-center pb-2">
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
                    <div class="font-semibold text-lg pl-1 pb-2">
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
                    <div
                      class="flex 2xl:flex-nowrap flex-wrap items-center border-t border-gray-300 mt-1 pt-0.5 pr-4"
                    >
                      <div class="flex 2xl:flex-nowrap flex-wrap">
                        <span class="2xl:ml-1">Prioridad:</span>
                        <span class="2xl:ml-2 font-bold">
                          {{ nestedItem.priority }}
                        </span>
                      </div>
                      <div class="flex 2xl:flex-nowrap flex-wrap">
                        <span class="2xl:ml-4">Tiempo:</span>
                        <span class="2xl:ml-2 font-bold">
                          {{ nestedItem.estimateTime }}
                        </span>
                      </div>
                    </div>
                  </div>
                </template>
              </draggable>
            </nested-draggable>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
// @ is an alias to /src
import GenericModal from '@/components/modals/GenericModal.vue'
import { Timestamp } from 'firebase/firestore'
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
import ChevronDownIcon from '@/components/icons/ChevronDownIcon.vue'
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
  format,
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
    ChevronDownIcon,
  },

  setup() {
    const store = useStore()
    const sprintById = computed(() => store.state.sprintById)
    const sprintName = computed(
      () => store.state.sprintById.name || `Semana ${weekNumber(new Date())}`
    )
    const sprintDescription = computed(
      () =>
        store.state.sprintById.description ||
        `(del ${startOfWeek(new Date())} al ${endOfWeek(new Date())})`
    )
    async function showSprintById(sprintId) {
      await store.dispatch('getSprintById', sprintId)
    }
    let isOpenSprintMenu = ref(false)
    const openSprintMenu = () =>
      (isOpenSprintMenu.value = !isOpenSprintMenu.value)
    fetchAllSprint()
    async function fetchAllSprint() {
      await store.dispatch('getSprints')
    }
    let currentDate = new Date()
    let selectedYear = (date) => {
      return date.getFullYear() || currentDate.getFullYear()
    }

    const weekNumber = (date) => {
      // const timestamp = dateFromFirebase.toDate()
      return getISOWeek(date)
    }
    const startOfWeek = (date) => {
      return format(startOfISOWeek(date), 'd-M')
    }

    const endOfWeek = (date) => {
      return format(endOfISOWeek(date), 'd-M-Y')
    }
    const daysPerWeeks = new Date(2022, 0, 295)
    const getDate = daysPerWeeks.getDate()
    const end = startOfISOWeek(currentDate)
    const dateTests = formatISO(endOfISOWeek(currentDate), { format: 'basic' })
    allAccountInformation()
    let isWaiting = computed(() => store.getters.getterIsWaiting)
    async function allAccountInformation() {
      try {
        await store.dispatch('fetchAllAccountInformation')
        await store.dispatch(
          'getSprintById',
          `${selectedYear(new Date())}-${weekNumber(new Date())}`
        )
      } catch (error) {
        console.log('Error allAccoount', error)
      }
    }
    function userImage(userId) {
      return userId !== ''
        ? require('@/assets/images/users/' +
            allUsersInfObject.value[userId].img +
            '.png')
        : require('@/assets/images/users/user0.png')
    }
    function userAssignedName(userId) {
      return userId !== ''
        ? allUsersInfObject.value[userId].displayName
        : 'Sin Asignar'
    }
    let allUsersInfObject = computed(() => store.getters.getterUsersInfo)
    let allUsers = computed(() => store.state.allUsersInformations)
    // const priorities = computed(() => store.state.priorities)
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
    const sprints = computed(() => {
      const orederedSprints = store.state.sprints
      return orederedSprints
    })
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
            console.log('count++', count)
            const data = {
              id: `${selectedYear(new Date())}-${weekNumber(new Date())}`,
              creationDate: currentDate,
              name: `Semana ${weekNumber(new Date())}`,
              description: `(del ${startOfWeek(new Date())} al ${endOfWeek(
                new Date()
              )})`,
              objectives: newValue,
            }
            store.dispatch('createSprint', data)
          }
        }
      },
      { deep: true }
    )
    const states = ['todo', 'progress', 'blocked', 'completed']
    const user = computed(() => store.state.user)
    // const sprints = ref(store.getters['getterSprints'])
    // const sprints = ref(store.state.sprints)
    const userAccountId = ref(store.state.user.accountId)
    const authUser = ref(store.state.authUser)
    const userIdToken = ref(store.state.userIdToken)

    return {
      isOpenSprintMenu,
      openSprintMenu,
      showSprintById,
      sprintDescription,
      sprintName,
      startOfWeek,
      endOfWeek,
      weekNumber,
      selectedYear,
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
      isShow,
      showModal,
      closeModal,
      sprintById,
      dateTests,
      watchEffect,
      states,
      sprints,
      userAccountId,
      user,
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
