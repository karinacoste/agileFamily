<template>
  <div>
    <NavBar></NavBar>
    <router-view />
  </div>
</template>
<script>
import NavBar from '@/components/nav/NavBar.vue'

export default {
  components: { NavBar },

  setup() {},
}
</script>
