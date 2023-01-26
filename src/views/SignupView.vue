<template>
  <div
    class="min-h-screen relative justify-center items-center flex flex-wrap-reverse"
  >
    <div class="w-full md:w-3/5 flex justify-center items-center">
      <img
        src="../assets/images/familyImage-WhiteBg.png"
        alt="agileFamily Logo"
      />
    </div>
    <!-- <p>accountId: {{ accountIdFromFirebase }}</p> -->

    <div
      class="w-full md:w-2/5 flex justify-center md:justify-start md:pl-12 items-center mt-14 md:mt-0"
    >
      <form @submit.prevent="handleSubmit">
        <div class="md:w-96 w-80">
          <div class="flex justify-center items-center mb-4">
            <img alt="Vue logo" src="@/assets/images/logo.png" />
          </div>
          <input-field
            type="text"
            inputName="displayName"
            inputLabel="Nombre de usurio"
            placeholder="Introduce tu nombre de usuario"
            :inputValue="displayName"
            v-model:inputValue="displayName"
          >
          </input-field>
          <input-field
            type="text"
            inputName="name"
            placeholder="Introduce tu nombre"
            inputLabel="Nombre"
            :inputValue="name"
            v-model:inputValue="name"
          >
          </input-field>
          <input-field
            type="text"
            placeholder="Introduce tu apellido"
            inputName="surname"
            inputLabel="Apellidos"
            :inputValue="surname"
            v-model:inputValue="surname"
          >
          </input-field>
          <label class="ml-1" for="email">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Introduce tu email"
            v-model="email"
            required
            class="border w-full p-2 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"
          />
          <label class="ml-1" for="password">Contraseña:</label>
          <input
            type="password"
            name="password"
            placeholder="Introduce una contraseña"
            v-model="password"
            required
            class="border w-full p-2 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"
          />
        </div>
        <div v-if="error" class="text-red-700 font-semibold flex items-center">
          <error-icon class="text-red-700 font-semibold w-6"></error-icon>
          <span class="ml-2">{{ error }}</span>
        </div>
        <!-- <label for="email">Password:</label>
      <input type="password" name="password" v-model="password" required /> -->
        <div class="py-4">
          <button
            type="submit"
            class="h-full w-full px-2 py-3 flex items-center justify-center rounded-md bg-primary hover:bg-primaryDark text-white focus:outline-none"
          >
            Crear cuenta
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import InputField from '@/components/forms/commons/InputField.vue'
import ErrorIcon from '@/components/icons/ErrorIcon.vue'

export default {
  components: {
    InputField,
    ErrorIcon,
  },
  data() {
    return {}
  },
  setup() {
    const accountIdFromFirebase = computed(() => {
      const continueUrl = new URL(window.location.href).searchParams.get(
        'continueUrl'
      )
      return continueUrl ? continueUrl.split('accountId=')[1] : ''
    })

    const email = ref('')
    const password = ref('')
    const displayName = ref('')
    const name = ref('')
    const surname = ref('')
    // const nombre = ref('')
    const error = ref(null)
    const store = useStore()
    const router = useRouter()
    const handleSubmit = async () => {
      const role = accountIdFromFirebase.value ? 'user' : 'admin'
      const userAccountId = accountIdFromFirebase.value || ''
      try {
        await store.dispatch('signup', {
          displayName: displayName.value,
          name: name.value,
          surname: surname.value,
          email: email.value,
          password: password.value,
          userAccountId,
          role,
          img: 'user0',
        })
        router.push('/')
      } catch (err) {
        error.value = err.message
      }
    }
    return {
      accountIdFromFirebase,
      handleSubmit,
      email,
      password,
      displayName,
      name,
      surname,
      error,
    }
  },
}
</script>
