<template>
  <div class="">
    <external-nav-bar></external-nav-bar>

    <text-banner> <h1 class="text-5xl">EXTERNALLLL!!!!</h1></text-banner>
    <div v-for="blog in blogs" :key="blog.id"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import { useStore } from 'vuex'
// import NavBar from '@/components/nav/NavBar.vue'
import TextBanner from '../components/banners/TextBanner.vue'
import ExternalNavBar from '../components/nav/ExternalNavBar.vue'

export default {
  components: {
    TextBanner,
    ExternalNavBar,
  },
  setup() {
    const blogs = ref([
      { title: 'Why Coffee is Better than Tea', id: 1 },
      { title: '...Then I Took an Arrow in the Knee', id: 2 },
      { title: 'Mario vs Luigi, Ultimate Showdown', id: 3 },
    ])
    const store = useStore()
    console.log('user', store.state.user)

    return {
      blogs,
    }
  },
}
</script>
