<template>
  <div class="m-4">
    <!-- <p class="font-bold">showedUser {{ showedUser.email }}</p> -->
    <NavBar></NavBar>
    <h1 class="text-5xl">Estoy logueada!!!!</h1>
    <button @click="addUser">Crear user</button>
    <button @click="showUsers">Show user</button>
    <div v-for="blog in blogs" :key="blog.id">
      <div class="blog">
        <h3>{{ blog.title }}</h3>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          aspernatur consectetur doloremque sunt ducimus enim iure animi fugit
          nulla et! Perferendis autem deleniti quo eum corrupti reiciendis
          voluptatem ab ducimus?
        </p>
        <div class="icons">
          <span>upvote or downvote this article: </span>
          <span class="material-icons">thumb_up</span>
          <span class="material-icons">thumb_down</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import { useStore } from 'vuex'
import NavBar from '../components/nav/NavBar.vue'

export default {
  components: { NavBar },

  setup() {
    const blogs = ref([
      { title: 'Why Coffee is Better than Tea', id: 1 },
      { title: '...Then I Took an Arrow in the Knee', id: 2 },
      { title: 'Mario vs Luigi, Ultimate Showdown', id: 3 },
    ])
    const store = useStore()
    const showedUser = ref(store.state.user)
    const addUser = async () => {
      try {
        store.dispatch('addAppUser')
      } catch (e) {
        console.error('ErrorRRRRR ', e)
      }
    }
    const showUsers = async () => {
      try {
        store.dispatch('getAppUsers')
      } catch (e) {
        console.error('Error getAppUsers', e)
      }
    }
    console.log('user', store.state.user)
    console.log('blogs', blogs.value)

    return {
      blogs,
      showedUser,
      addUser,
      showUsers,
    }
  },
}
</script>
