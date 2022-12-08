<template>
  <div class="w-full flex flex-col items-center min-h-max h-full">
    <internal-nav-bar :user="userDisplayName"></internal-nav-bar>
    <div class="flex md:w-8/12 border-b border-gray-300">
      <h1 class="text-2xl font-semibold mt-5 mb-2">Estadísticas</h1>
    </div>

    <div class="flex md:w-8/12 w-full mt-6 items-end">
      <div class="w-1/6 flex flex-col items-baseline h-full">
        <div class="mt-4">
          <div class="text-5xl">
            {{ sprintsAverage.achievedObjectivesAverage }}
          </div>
          <p class="text-lg w-11/12 font-semibold leading-5 mt-2">
            Objetivos alcanzados
          </p>
        </div>
        <div class="mt-4">
          <div class="text-5xl">
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
        <p class="bg-gray-200 text-center px-2 py-2 w-11/12">MEDIA SEMANAL</p>
      </div>
      <!-- ///////////////////////////////////// -->
      <div class="w-5/6 flex items-baseline h-full">
        <!-- ////////////////////////// -->
        <div class="w-3/6 flex flex-col">
          <div class="mb-6">
            <Doughnut
              v-if="sprintsAverage"
              :data="doughnutDataChart"
              :options="options"
              width="230"
            />
          </div>
          <div class="text-center mx-auto bg-gray-200 px-2 py-2 w-11/12">
            TOTAL DE TAREAS
          </div>
        </div>
        <!-- ////////////////////////// -->
        <div class="w-3/6 flex flex-col">
          <div class="mb-6 w-full px-6 mx-auto">
            <Bar
              :data="barDataChart"
              :options="barChartOptions"
              height="250"
              width="100"
            />
          </div>
          <p class="bg-gray-200 px-2 py-2 w-12/12 text-center ml-4">
            OBJETIVOS POR SEMANA
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-col md:w-8/12 mt-16">
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
        v-for="(sprint, index) in sprintsTable"
        :key="index"
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
          {{ sprint.tasks.completedTasks }} de
          {{ sprint.tasks.totalTasks }}
        </div>
        <div class="w-44 text-center">
          {{ sprint.tasks.progressTasks }}
        </div>
        <div class="w-44 text-center">{{ sprint.tasks.todoTasks }}</div>
        <div class="w-44 text-center">
          {{ sprint.tasks.blockedTasks }}
        </div>
        <div class="w-44 text-center">{{ sprint.hours }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import InternalNavBar from '@/components/nav/InternalNavBar.vue'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js'
import { Doughnut, Bar } from 'vue-chartjs'
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
)

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
    Doughnut,
    Bar,
  },
  setup() {
    const store = useStore()
    fetchAllSprint()
    const userDisplayName = ref(store.state.user.displayName)
    const sprintsAverage = computed(() => store.getters['getterSprintsAverage'])
    const sprintsTable = computed(() => store.getters['getterSprintsTable'])

    // store.getters['getterSprints']

    const options = ref({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    })
    const barChartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    })
    const barDataChart = computed(() => {
      const objectiveInfoArray = sprintsTable.value.slice(-4)

      return {
        labels: objectiveInfoArray.map((item) => item.week),
        datasets: [
          {
            label: 'Obj. no alcanzados',
            data: objectiveInfoArray.map(
              (item) => item.objectives - item.achievedObjectives
            ),
            backgroundColor: '#6B7280',
            stack: 'Stack 0',
          },
          {
            label: 'Obj. alcanzados',
            data: objectiveInfoArray.map((item) => item.achievedObjectives),
            backgroundColor: '#22C55E',
            stack: 'Stack 0',
          },
        ],
      }
    })

    const doughnutDataChart = computed(() => ({
      labels: ['Por hacer', 'En curso', 'Bloqueada', 'Hechas'],
      datasets: [
        {
          backgroundColor: ['#6B7280', '#3B82F6', '#EF4444', '#22C55E'],
          data: [
            sprintsAverage.value.totalTodoTasks || 0,
            sprintsAverage.value.totalProgressTasks || 0,
            sprintsAverage.value.totalBlockedTasks || 0,
            sprintsAverage.value.totalFinishedTasks || 0,
          ],
        },
      ],
    }))

    async function fetchAllSprint() {
      await store.dispatch('getSprints')
    }
    return {
      userDisplayName,
      sprintsTable,
      sprintsAverage,
      barDataChart,
      doughnutDataChart,
      options,
      barChartOptions,
    }
  },
}
</script>

<style></style>
