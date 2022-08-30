<template>
  <div>
    <external-nav-bar>
      <span
        class="border border-primary w-24 h-9 rounded-md text-center pt-1 hover:text-primary"
        ><router-link to="/LoginView">Login</router-link></span
      >
      <span
        class="border border-primary ml-4 text-white h-9 w-24 rounded-md text-center pt-1 bg-primary hover:bg-primaryDark"
        ><router-link to="/SignupView">Signup</router-link></span
      >
    </external-nav-bar>

    <text-banner> <h1 class="text-5xl">EXTERNALLLL!!!!</h1></text-banner>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import { useStore } from 'vuex'
// import NavBar from '@/components/nav/NavBar.vue'
import TextBanner from '../components/banners/TextBanner.vue'
import ExternalNavBar from '../components/nav/ExternalNavBar.vue'
import { onBeforeMount, onBeforeUnmount, onMounted } from '@vue/runtime-core'
export default {
  components: {
    TextBanner,
    ExternalNavBar,
  },
  setup() {
    const store = useStore()

    return {}
  },
}
</script>
