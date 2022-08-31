<template>
  <div class="">
    <!-- <p class="font-bold">showedUser {{ showedUser.email }}</p> -->
    <internal-nav-bar :user="userDisplayName"></internal-nav-bar>
    <h1 class="text-5xl">Estoy logueada!!!!{{ userDisplayName }}</h1>
    <!-- <h1 class="text-5xl">{{ showedUser.email }}</h1> -->
    <button @click="addUser">Crear user</button>
    <button @click="showUsers">Show user</button>
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
    // const addUser = async () => {
    //   try {
    //     store.dispatch('createNewAccount')
    //   } catch (e) {
    //     console.error('ErrorRRRRR ', e)
    //   }
    // }
    const showUsers = async () => {
      try {
        store.dispatch('getAppUsers')
      } catch (e) {
        console.error('Error getAppUsers', e)
      }
    }
    console.log('user', store.state.user)

    return {
      // showedUser,
      // addUser,
      showUsers,
      userDisplayName,
    }
  },
}
</script>
