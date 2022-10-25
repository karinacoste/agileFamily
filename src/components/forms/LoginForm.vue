<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="md:w-96 w-80">
        <p>email{{ email }}</p>
        <p>password{{ password }}</p>
        <div class="flex justify-center items-center mb-4">
          <img alt="Vue logo" src="../../assets/images/logo.png" />
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
export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const handleSubmit = () => {}
    return { handleSubmit, email, password }
  },
}
</script>
