<template>
  <div class="relative h-16 w-full bg-white">
    <div
      class="absolute flex inset-x-0 top-0 h-16 p-4 shadow-md items-center justify-center"
    >
      <div class="flex w-full">
        <nav class="w-full relative flex items-center mx-2">
          <figure>
            <img
              src="../../assets/images/navBarLogo.png"
              alt="agileFamily Logo"
            />
          </figure>
          <div class="flex ml-auto mt-1">
            <nav>
              <router-link to="/">Home</router-link> | <span>{{ user }}</span
              >|
              <!-- <router-link to="/LoginView">Login karina</router-link> |
              <router-link to="/SignupView">Signup karina</router-link> | -->
            </nav>
            <button @click="handleClick">Logout</button>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  props: {
    user: {
      type: String,
      default: 'email',
    },
  },
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
