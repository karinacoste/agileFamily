<template>
  <div class="">
    <!-- <p class="font-bold">showedUser {{ showedUser.email }}</p> -->
    <internal-nav-bar :user="userDisplayName"></internal-nav-bar>
    <h1 class="text-5xl">Estoy logueada!!!!{{ userDisplayName }}</h1>
    <p>userIdToken{{ authUser }}</p>
    <!-- <h1 class="text-5xl">{{ showedUser.email }}</h1> -->
    <button @click="addUser">Crear user</button>
    <button @click="showUsers">Show user</button>
    <div
      id="drop-zone"
      class="mt-20 min-h-min flex flex-col items-center justify-center bg-slate-200"
      @drop="onDrop($event, 1)"
      @dragover.prevent
      @dragenter.prevent
    >
      <div
        v-for="item in getList(1)"
        :key="item.id"
        id="drag-el"
        class="p-6 bg-slate-400 my-4 w-52 text-center"
        draggable="true"
        @dragstart="startDrag($event, item)"
      >
        {{ item.title }}
      </div>
    </div>
    <div
      id="drop-zone2"
      class="mt-20 min-h-min flex flex-col items-center justify-center bg-slate-200"
      @drop="onDrop($event, 2)"
      @dragover.prevent
      @dragenter.prevent
    >
      <div
        v-for="item in getList(2)"
        :key="item.id"
        id="drag-el"
        class="p-6 bg-slate-400 my-4 w-52 text-center"
        draggable="true"
        @dragstart="startDrag($event, item)"
      >
        {{ item.title }}
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
// import NavBar from '../components/nav/NavBar.vue'

export default {
  components: { InternalNavBar },

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
    const items = ref([
      { id: 0, title: 'Item A', list: 1 },
      { id: 1, title: 'Item B', list: 1 },
      { id: 2, title: 'Item C', list: 2 },
      { id: 3, title: 'Item D', list: 2 },
    ])
    const getList = (list) => {
      return items.value.filter((item) => item.list == list)
    }
    const onDrop = (event, list) => {
      const itemID = event.dataTransfer.getData('itemID')
      const item = items.value.find((item) => item.id == itemID)
      item.list = list
    }
    const startDrag = (event, item) => {
      console.log(item)
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemID', item.id)
    }
    return {
      // showedUser,
      // addUser,
      showUsers,
      userDisplayName,
      getList,
      startDrag,
      onDrop,
      authUser,
      userIdToken,
    }
  },
}
</script>
