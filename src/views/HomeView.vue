<template>
  <div class="w-full min-h-max h-full bg-gray-100">
    <!-- <p class="font-bold">showedUser {{ showedUser.email }}</p> -->
    <internal-nav-bar :user="userDisplayName"></internal-nav-bar>
    <h1 class="text-2xl font-bold ml-7 my-5">SPRINT 1 {{ userDisplayName }}</h1>
    <!-- <h1 class="text-5xl">{{ showedUser.email }}</h1> -->
    <!-- <button @click="addUser">Crear user</button>
    <button @click="showUsers">Show user</button> -->

    <div class="w-full flex justify-between p-2 m-auto">
      <!-- <p>sprints{{ sprints[0].objectives }}</p> -->
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

    <draggable
      v-model="sprints[0].objectives"
      item-key="id"
      class="w-full h-full"
      group="my-group"
    >
      <template #item="{ element: item }"
        ><div
          class="w-full flex justify-between p-2 border-b-4 pt-6 border-gray-200"
        >
          <div class="w-1/5 px-4">
            <div
              class="w-full h-48 px-2 font-semibold text-lg hover:cursor-move"
            >
              {{ item.name }}
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
                <template #item="{ element: item }"
                  ><div
                    class="list-group-item bg-white shadow-md mb-6 px-6 py-4 hover:cursor-move"
                  >
                    <div class="font-semibold text-lg pb-12">
                      {{ item.id }} - {{ item.name }}
                    </div>
                    <div class="flex items-center pb-3 pr-4">
                      <!-- <img
                      :src="
                        require(`@/assets/images/users/${element.userImg}.png`)
                      "
                      alt="user image"
                    /> -->

                      <span class="ml-2">{{ item.priority }}</span>
                      <span class="ml-2">{{ item.estimateTime }}</span>
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
import TodoList from '@/components/todoList/TodoList'
import TodoItem from '@/components/todoList/TodoItem'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import InternalNavBar from '@/components/nav/InternalNavBar.vue'
import { onBeforeMount } from 'vue'
import draggable from 'vuedraggable'
import mock from '@/assets/mock2.json'
// import NavBar from '../components/nav/NavBar.vue'

export default {
  // components: { InternalNavBar, draggable },
  components: {
    InternalNavBar,
    draggable,
  },
  async beforeCreate() {
    // const store = useStore()
    // await store.dispatch('getSprints')
  },
  async mounted() {
    const store = useStore()
    store.dispatch('getSprints')

    // await store.dispatch('getSprints')
    // try {
    //   store.dispatch('getObjectives')
    //   console.log('Holaaa')
    //   console.log('store.state', store.state.objectives)
    // } catch (e) {
    //   console.error('Error getObjectives', e)
    // }
  },

  setup() {
    const states = ['todo', 'progress', 'blocked', 'completed']
    const store = useStore()
    const getObjectives = ref(store.state.objectives)

    async function getToDos() {
      try {
        await store.dispatch('getSprints')
        console.log('Holaaa')
        prueba = [9, 9]
      } catch (e) {
        console.error('Error getAppUsers', e)
      }
      return [1, 2, 3]
    }
    async function changeState(data, state) {
      console.log('ccc', data[0].id, state)
      console.log('object', data[0])
    }

    const userDisplayName = ref(store.state.user.displayName)
    const sprints = ref(store.getters['getterSprints'])
    // const sprints = ref(store.state.sprints)
    const userAccountId = ref(store.state.user.accountId)
    const authUser = ref(store.state.authUser)
    const userIdToken = ref(store.state.userIdToken)
    const showUsers = async () => {
      try {
        store.dispatch('getAppUsers')
      } catch (e) {
        console.error('Error getAppUsers', e)
      }
    }

    const list = ref(mock)

    return {
      // showedUser,
      // addUser,
      states,
      sprints: computed(() => store.state.sprints),
      userAccountId,
      showUsers,
      userDisplayName,
      authUser,
      userIdToken,
      getObjectives,
      list,
    }
  },
}
</script>
