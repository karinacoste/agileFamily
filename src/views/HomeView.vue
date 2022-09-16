<template>
  <div class="">
    <!-- <p class="font-bold">showedUser {{ showedUser.email }}</p> -->
    <internal-nav-bar :user="userDisplayName"></internal-nav-bar>
    <h1 class="text-5xl">Estoy logueada!!!!{{ userDisplayName }}</h1>
    <p>userIdToken{{ authUser }}</p>
    <!-- <h1 class="text-5xl">{{ showedUser.email }}</h1> -->
    <button @click="addUser">Crear user</button>
    <button @click="showUsers">Show user</button>
    <div class="mt-5 container">
      <div class="flex justify-content-center border py-5">
        <div class="mx-6">
          <h4 class="mb-3">Draggable 1</h4>
          <draggable
            class="draggable-list bg-slate-400 w-52 h-48 p-10 bg-amber-200"
            :list="list1"
            group="my-group"
          >
            <template #item="{ element }">
              <div
                class="list-group-item bg-red-400"
                :class="{ 'not-draggable': !enabled }"
              >
                {{ element.name }}
              </div>
            </template>
          </draggable>
        </div>

        <div class="">
          <h4 class="mb-3">Draggable 2</h4>
          <draggable
            class="draggable-list h-52 p-10 bg-lime-500 w-52"
            :list="list2"
            group="my-group"
          >
            <template #item="{ element }">
              <div class="list-item p-4" :key="element.name">
                {{ element.name }}
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import { useStore } from 'vuex'
import InternalNavBar from '@/components/nav/InternalNavBar.vue'
import { onBeforeMount } from 'vue'
import draggable from 'vuedraggable'
// import NavBar from '../components/nav/NavBar.vue'

export default {
  components: { InternalNavBar, draggable },

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
    const list1 = ref([{ name: 'Drag Me!' }, { name: 'Dos' }])
    const list2 = ref([{ name: 'Drag Me Too!' }, { name: 'Dos' }])

    return {
      // showedUser,
      // addUser,
      showUsers,
      userDisplayName,
      authUser,
      userIdToken,
      list1,
      list2,
    }
  },
}
</script>
