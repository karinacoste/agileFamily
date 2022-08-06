<template>
  <div class="home">
    <NavBar></NavBar>
    <img alt="Vue logo" src="../assets/images/logo.png" />
    {{ points }}
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import NavBar from '@/components/nav/NavBar.vue'

export default {
  components: { NavBar },
  setup() {
    const blogs = ref([
      { title: 'Título 1', id: 1 },
      { title: 'Título 2', id: 2 },
      { title: 'Título 3', id: 3 },
    ])
    return {
      blogs,
    }
  },
  methods: {},
  computed: {
    points() {
      return this.$store.state.points
    },
  },
}
</script>
