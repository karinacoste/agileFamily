<template>
  <div class="h-screen relative justify-center items-center flex">
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
        <label class="ml-1" for="password">Password:</label>
        <div
          class="border p-2 flex border-gray-600 text-gray-500 rounded-md mb-4"
        >
          <input
            :type="inputTypePassword"
            name="password"
            v-model="password"
            required
            class="w-full bg-white outline-none"
          />
          <div
            class="text-primary font-semibold flex items-center"
            @click="showPassword"
          >
            <component
              :is="passwordIcon"
              class="font-semibold w-7 mr-0.5 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <!-- <label for="email">Password:</label>
      <input type="password" name="password" v-model="password" required /> -->
      <div v-if="error" class="text-red-700 font-semibold flex items-center">
        <error-icon class="text-red-700 font-semibold w-6"></error-icon>
        <span class="ml-2">{{ error }}</span>
      </div>
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
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ErrorIcon from '@/components/icons/ErrorIcon.vue'
import OpenEyeIcon from '@/components/icons/OpenEyeIcon.vue'
import CloseEyeIcon from '@/components/icons/CloseEyeIcon.vue'

export default {
  components: {
    // LoginForm,
    ErrorIcon,
    OpenEyeIcon,
    CloseEyeIcon,
  },
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref('')
    const inputTypePassword = computed(() => {
      return passwordHidden.value === true ? 'password' : 'text'
    })
    const passwordIcon = computed(() => {
      return passwordHidden.value ? 'OpenEyeIcon' : 'CloseEyeIcon'
    })
    const passwordHidden = ref(true)
    async function showPassword() {
      passwordHidden.value = !passwordHidden.value
    }
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
        error.value = 'Email o contraseña incorrectos.'
      }
    }
    return {
      handleSubmit,
      email,
      password,
      error,
      passwordHidden,
      passwordIcon,
      inputTypePassword,
      showPassword,
    }
  },
}
</script>
