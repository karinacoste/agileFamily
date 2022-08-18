<template>
  <div class="relative h-16 w-full">
    <div
      class="absolute flex inset-x-0 top-0 h-16 p-4 shadow-md items-center justify-center"
    >
      <div class="flex w-full md:w-5/6">
        <nav class="w-full relative flex items-center">
          <figure>
            <img
              src="../../assets/images/navBarLogo.png"
              alt="agileFamily Logo"
            />
          </figure>
          <div class="flex ml-auto mt-1">
            <span
              class="border border-primary w-24 h-9 rounded-md text-center pt-1 hover:text-primary"
              ><router-link to="/LoginView">Login</router-link></span
            >
            <span
              class="border border-primary ml-4 text-white h-9 w-24 rounded-md text-center pt-1 bg-primary hover:bg-primaryDark"
              ><router-link to="/SignupView">Signup</router-link></span
            >
          </div>
        </nav>
      </div>
    </div>
  </div>
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
