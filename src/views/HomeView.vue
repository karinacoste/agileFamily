<template>
  <div class="w-full h-screen bg-gray-100">
    <!-- <p class="font-bold">showedUser {{ showedUser.email }}</p> -->
    <internal-nav-bar :user="userDisplayName"></internal-nav-bar>
    <h1 class="text-2xl font-bold ml-7 my-5">SPRINT 1 {{ userDisplayName }}</h1>
    <!-- <h1 class="text-5xl">{{ showedUser.email }}</h1> -->
    <!-- <button @click="addUser">Crear user</button>
    <button @click="showUsers">Show user</button> -->

    <div class="w-full flex justify-between p-2 m-auto">
      <div class="w-1/5 px-5">
        <div class="w-full py-2 font-bold border-b-4 border-gray-300">
          OBJETIVOS
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
    <div class="w-full flex justify-between p-2">
      <div class="w-1/5 px-4">
        <div class="w-full h-48 px-2">1. Reformar el baño</div>
      </div>
      <!-- // ////// -->
      <div class="w-1/5 px-5">
        <draggable
          :list="todos"
          item-key="id"
          class="w-full h-48"
          group="my-group"
        >
          <template #item="{ element }">
            <div
              class="list-group-item bg-white shadow-md mb-6 px-6 py-4 hover:cursor-move"
            >
              <div class="font-semibold text-lg pb-12">
                {{ element.id }} - {{ element.name }}
              </div>
              <div class="flex items-center pb-3 pr-4">
                <img
                  :src="require(`@/assets/images/users/${element.userImg}.png`)"
                  alt="user image"
                />

                <span class="ml-2">{{ element.priority }}</span>
                <span class="ml-2">{{ element.estimateTime }}</span>
              </div>
            </div>
          </template>
        </draggable>
      </div>
      <!-- // //// -->
      <div class="w-1/5 px-5">
        <draggable
          :list="inProgress"
          item-key="id"
          class="w-full h-48"
          group="my-group"
        >
          <template #item="{ element }">
            <div
              class="list-group-item bg-white shadow-md mb-6 px-6 py-4 hover:cursor-move"
            >
              <div class="font-semibold text-lg pb-12">
                {{ element.id }} - {{ element.name }}
              </div>
              <div class="flex items-center pb-3 pr-4">
                <img
                  :src="require(`@/assets/images/users/${element.userImg}.png`)"
                  alt="user image"
                />

                <span class="ml-2">{{ element.priority }}</span>
                <span class="ml-2">{{ element.estimateTime }}</span>
              </div>
            </div>
          </template>
        </draggable>
      </div>
      <!-- //////// -->
      <div class="w-1/5 px-5">
        <draggable
          :list="block"
          item-key="id"
          class="w-full h-48"
          group="my-group"
        >
          <template #item="{ element }">
            <div
              class="list-group-item bg-white shadow-md mb-6 px-7 py-3 hover:cursor-move"
            >
              {{ element.name }}
            </div>
          </template>
        </draggable>
      </div>
      <div class="w-1/5 px-5">
        <draggable
          :list="completed"
          item-key="id"
          class="w-full h-48"
          group="my-group"
        >
          <template #item="{ element }">
            <div
              class="list-group-item bg-white shadow-md mb-6 px-7 py-3 hover:cursor-move"
            >
              {{ element.name }}
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <!-- <div class="w-full px-7">
      <div class="h-1 bg-gray-300"></div>
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import TodoList from '@/components/todoList/TodoList'
import TodoItem from '@/components/todoList/TodoItem'
import { ref } from 'vue'
import { useStore } from 'vuex'
import InternalNavBar from '@/components/nav/InternalNavBar.vue'
import { onBeforeMount } from 'vue'
import draggable from 'vuedraggable'
// import NavBar from '../components/nav/NavBar.vue'

export default {
  // components: { InternalNavBar, draggable },
  components: {
    InternalNavBar,
    draggable,
  },

  setup() {
    const store = useStore()
    const userDisplayName = ref(store.state.user.displayName)
    const authUser = ref(store.state.authUser)
    const userIdToken = ref(store.state.userIdToken)
    const showUsers = async () => {
      try {
        store.dispatch('getAppUsers')
      } catch (e) {
        console.error('Error getAppUsers', e)
      }
    }
    console.log('user', store.state.user)

    const inProgress = ref([
      {
        id: 1,
        name: 'Read a book',
        priority: 'baja',
        stimateTime: 2,
        userImg: 'user1',
      },
      {
        id: 2,
        name: 'Cooking dinner',
        priority: 'alta',
        estimateTime: 5,
        userImg: 'user1',
      },
    ])
    const todos = ref([
      {
        id: 3,
        name: 'Pedir presupuestos y comprarlos',
        priority: 'baja',
        estimateTime: 4,
        userImg: 'user1',
      },
      {
        id: 4,
        name: 'Ver modelos de baños',
        priority: 'media',
        estimateTime: 4,
        userImg: 'user1',
      },
    ])
    const block = ref([
      { id: 5, name: 'Eat' },
      { id: 6, name: 'Go to the park' },
    ])
    const completed = ref([
      { id: 7, name: 'Eat' },
      { id: 8, name: 'Go to the park' },
    ])

    return {
      // showedUser,
      // addUser,
      showUsers,
      userDisplayName,
      authUser,
      userIdToken,
      todos,
      inProgress,
      completed,
      block,
    }
  },
}
</script>
