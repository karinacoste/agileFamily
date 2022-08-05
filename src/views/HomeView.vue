<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    {{ points }}
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import LoginForm from '@/components/forms/LoginForm.vue'

export default {
  components: {},
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
