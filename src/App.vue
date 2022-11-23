<template>
  <div class="h-full">
    <div id="modals" class="z-50"></div>
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
<style>
.modal {
  width: 300px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
}
.vue-universal-modal {
  background-color: rgba(0, 0, 0, 0.5) !important;
}
</style>
