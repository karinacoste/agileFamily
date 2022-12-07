<template>
  <div class="w-full flex flex-col items-center min-h-max h-full">
    <internal-nav-bar :user="userDisplayName"></internal-nav-bar>
    <div class="flex md:w-7/12 border-b border-gray-300">
      <h1 class="text-2xl font-semibold mt-5 mb-2">Estadísticas</h1>
    </div>

    <div class="flex md:w-7/12 w-full mt-6 items-end">
      <div class="w-2/6 flex flex-col items-baseline h-full">
        <div class="mt-4">
          <div class="text-5xl">
            {{ sprintsAverage.achievedObjectivesAverage }}
          </div>
          <p class="text-lg font-semibold leading-5 mt-2">
            Objetivos alcanzados
          </p>
        </div>
        <div class="mt-4">
          <div v-if="printsAverage" class="text-5xl">
            {{ sprintsAverage.finishedTasksAverage }}
          </div>
          <p class="text-lg font-semibold leading-5 mt-2">Tareas finalizadas</p>
        </div>
        <div class="mt-4 flex flex-col justify-self-end items-baseline">
          <div class="text-5xl">
            {{ sprintsAverage.totalHoursAverage }}
          </div>
          <p class="text-lg font-semibold leading-5 mt-2 mb-6">
            Horas dedicadas
          </p>
        </div>
        <p class="text-lg bg-gray-200 px-2 py-1 w-11/12">MEDIA SEMANAL</p>
      </div>
      <div class="w-2/6 flex flex-col">
        <div>
          <!-- <Doughnut v-if="sprintsAverage" :data="testData" :options="options" /> -->
        </div>
        <div class="text-center m-auto text-lg bg-gray-200 px-2 py-1 w-11/12">
          TOTAL DE TAREAS
        </div>
      </div>

      <div class="w-2/6">
        <p class="text-lg bg-gray-200 px-2 py-1 w-11/12 ml-auto text-right">
          OBJETIVOS Y TAREAS
        </p>
      </div>
    </div>
    <div class="flex flex-col md:w-7/12 mt-16">
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
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
// import { Doughnut } from 'vue-chartjs'
// ChartJS.register(ArcElement, Tooltip, Legend)

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
    // Doughnut,
  },
  setup() {
    const store = useStore()
    const userDisplayName = ref(store.state.user.displayName)
    fetchAllSprint()
    // store.getters['getterSprints']
    const sprints = computed(() => store.getters['getterSprintsTable'] || [])
    const sprintsAverage = computed(() => store.getters['getterSprintsAverage'])

    const options = ref({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    })

    const testData = computed(() => ({
      labels: ['Por hacer', 'En curso', 'Bloqueada', 'Hechas'],
      datasets: [
        {
          backgroundColor: ['#6B7280', '#3B82F6', '#EF4444', '#22C55E'],
          data: [
            45, 60, 60, 60,
            // sprintsAverage.value.totalTodoTasks || 0,
            // sprintsAverage.value.totalProgressTasks || 0,
            // sprintsAverage.value.totalBlockedTasks || 0,
            // sprintsAverage.value.totalFinishedTasks || 0,
          ],
        },
      ],
    }))

    async function fetchAllSprint() {
      await store.dispatch('getSprints')
    }
    return {
      userDisplayName,
      sprints,
      sprintsAverage,
      testData,
      options,
    }
  },
}
</script>

<style></style>
