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
            <slot></slot>
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
