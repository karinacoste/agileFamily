<template>
  <div>
    <!-- <NavBar></NavBar> -->
    <router-view />
  </div>
</template>
<script>
import { onBeforeMount } from 'vue'
// import NavBar from '@/components/nav/NavBar.vue'
import { useStore } from 'vuex'
import { auth } from '@/firebase/config'
// import { onAuthStateChanged } from 'firebase/auth'
export default {
  // components: { NavBar },
  setup() {
    const store = useStore()
    onBeforeMount(async () => {
      store.dispatch('fetchAuthUser')
    })

    return {}
  },
}
</script>
