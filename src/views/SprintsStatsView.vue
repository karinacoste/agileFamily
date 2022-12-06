<template>
  <div class="w-full flex flex-col items-center min-h-max h-full">
    <internal-nav-bar :user="userDisplayName"></internal-nav-bar>
    <div class="flex md:w-7/12 border-b border-gray-300">
      <h1 class="text-2xl font-semibold ml-7 mt-5 mb-2">Estadísticas</h1>
    </div>
    <p>achievedObjectives{{ sprintsAverage.achievedObjectivesAverage }}</p>
    <p>finishedTasks{{ sprintsAverage.finishedTasksAverage }}</p>
    <p>totalHours{{ sprintsAverage.totalHoursAverage }}</p>
    <div class="flex flex-col md:w-7/12 mt-4">
      <div
        class="flex w-full items-center font-semibold pb-1 border-b border-gray-500"
      >
        <div class="w-64"></div>
        <div class="w-44 leading-5 text-center">Objetivos Alcanzados</div>
        <div class="w-44 leading-5 text-center">Tareas Acabadas</div>
        <div class="w-44 leading-5 text-center">T. En curso</div>
        <div class="w-44 leading-5 text-center">T. Por hacer</div>
        <div class="w-44 leading-5 text-center">T. Bloqueadas</div>
        <div class="w-44 leading-5 text-center">Total de horas</div>
      </div>
      <div
        v-for="sprint in sprints"
        :key="sprint"
        class="flex items-center w-full py-2 border-b border-gray-200"
      >
        <div class="w-64">
          <p class="font-semibold text-lg">{{ sprint.week }}</p>
          <p class="text-sm">{{ sprint.description }}</p>
        </div>
        <div class="w-44 text-center">
          {{ sprint.achievedObjectives }} de {{ sprint.objectives }}
        </div>
        <div class="w-44 text-center">
          {{ sprint.tasks.completedTasks }} de {{ sprint.tasks.totalTasks }}
        </div>
        <div class="w-44 text-center">{{ sprint.tasks.progressTasks }}</div>
        <div class="w-44 text-center">{{ sprint.tasks.todoTasks }}</div>
        <div class="w-44 text-center">{{ sprint.tasks.blockedTasks }}</div>
        <div class="w-44 text-center">{{ sprint.hours }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import InternalNavBar from '@/components/nav/InternalNavBar.vue'
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
export default {
  components: {
    InternalNavBar,
  },
  setup() {
    const store = useStore()
    const userDisplayName = ref(store.state.user.displayName)
    fetchAllSprint()
    // store.getters['getterSprints']
    const sprints = computed(() => store.getters['getterSprintsTable'])
    const sprintsAverage = computed(() => store.getters['getterSprintsAverage'])
    async function fetchAllSprint() {
      await store.dispatch('getSprints')
    }
    return { userDisplayName, sprints, sprintsAverage }
  },
}
</script>

<style></style>
