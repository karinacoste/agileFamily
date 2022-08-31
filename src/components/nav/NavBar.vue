<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/LoginView">Login karina</router-link> |
    <router-link to="/SignupView">Signup karina</router-link> |
  </nav>
  <button @click="handleClick">Logout</button>
</template>

<script>
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const handleClick = () => {
      store.dispatch('logout')
    }
    return { store, handleClick }
  },
}
</script>

<style></style>
