<template>
  <div class="h-screen relative justify-center items-center flex">
    <div v-if="error">{{ error }}</div>
    <form @submit.prevent="handleSubmit">
      <div class="md:w-96 w-80">
        <div class="flex justify-center items-center mb-4">
          <img alt="Vue logo" src="@/assets/images/logo.png" />
        </div>
        <label class="ml-1" for="email">Email:</label>
        <input
          type="email"
          name="email"
          v-model="email"
          required
          class="border w-full p-2 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"
        />
        <label class="ml-1" for="email">Password:</label>
        <input
          type="password"
          name="password"
          v-model="password"
          required
          class="border w-full p-2 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"
        />
      </div>
      <!-- <label for="email">Password:</label>
      <input type="password" name="password" v-model="password" required /> -->
      <div class="py-4">
        <button
          type="submit"
          class="h-full w-full px-2 py-3 flex items-center justify-center rounded-md bg-primary text-white focus:outline-none"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ExternalNavBar from '../components/nav/ExternalNavBar.vue'

export default {
  components: {
    // LoginForm,
  },
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)
    const store = useStore()
    const router = useRouter()
    const handleSubmit = async () => {
      try {
        await store.dispatch('login', {
          email: email.value,
          password: password.value,
        })
        router.push('/')
      } catch (err) {
        error.value = err.message
      }
    }
    return { handleSubmit, email, password, error }
  },
}
</script>
