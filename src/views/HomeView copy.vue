<template>
  <div class="w-full bg">
    <!-- <p class="font-bold">showedUser {{ showedUser.email }}</p> -->
    <internal-nav-bar :user="userDisplayName"></internal-nav-bar>
    <h1 class="text-5xl">Estoy logueada!!!!{{ userDisplayName }}</h1>
    <!-- <h1 class="text-5xl">{{ showedUser.email }}</h1> -->
    <button @click="addUser">Crear user</button>
    <button @click="showUsers">Show user</button>
    <div class="mt-5 flex justify-center items-center">
      <div class="mx-4">
        <div class="w-72 p-2 text-lg font-bold border-b-4 border-gray-300">
          OBJETIVOS
        </div>
        <div class="w-72 h-48 px-2 py-6">Reformar el baño</div>
      </div>
      <div class="mx-4">
        <div
          class="w-72 p-2 bg-gray-500 text-center text-white text-lg font-semibold"
        >
          POR HACER
        </div>
        <draggable
          :list="todos"
          item-key="id"
          class="w-72 h-48 py-6"
          group="my-group"
        >
          <template #item="{ element }">
            <div
              class="list-group-item border border-gray-300 px-7 py-3 hover:cursor-move"
            >
              {{ element.name }}
            </div>
          </template>
        </draggable>
      </div>
      <div class="mx-4">
        <div
          class="w-72 p-2 bg-blue-500 text-center text-white text-lg font-semibold"
        >
          EN CURSO
        </div>
        <draggable
          :list="inProgress"
          item-key="id"
          class="w-72 h-48 py-6"
          group="my-group"
        >
          <template #item="{ element }">
            <div
              class="list-group-item border border-gray-300 px-7 py-3"
              :class="{ 'not-draggable': !enabled }"
            >
              {{ element.name }}
            </div>
          </template>
        </draggable>
      </div>
      <div class="mx-4">
        <div
          class="w-72 p-2 bg-red-500 text-center text-white text-lg font-semibold"
        >
          BLOQUEADO
        </div>
        <draggable
          :list="block"
          item-key="id"
          class="w-72 h-48 py-6"
          group="my-group"
        >
          <template #item="{ element }">
            <div
              class="list-group-item w-full border border-gray-300 px-7 py-3"
              :class="{ 'not-draggable': !enabled }"
            >
              {{ element.name }}
            </div>
          </template>
        </draggable>
      </div>
      <div class="mx-4">
        <div
          class="w-72 p-2 bg-green-500 text-center text-white text-lg font-semibold"
        >
          HECHO
        </div>
        <draggable
          :list="completed"
          item-key="id"
          class="w-72 h-48 py-6"
          group="my-group"
        >
          <template #item="{ element }">
            <div
              class="list-group-item border border-gray-300 px-7 py-3"
              :class="{ 'not-draggable': !enabled }"
            >
              {{ element.name }}
            </div>
          </template>
          <!-- <template #header>
            <button @click="addPeople">Add</button>
          </template> -->
        </draggable>
      </div>
    </div>
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
      { id: 1, name: 'Read a book' },
      { id: 2, name: 'Cooking dinner' },
    ])
    const todos = ref([
      { id: 3, name: 'Hello' },
      { id: 4, name: 'Work' },
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
