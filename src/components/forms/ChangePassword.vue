<template>
  <div class="text-left mt-8">
    <label class="ml-1 font-semibold">Contraseña actual</label>
    <input
      type="text"
      class="border w-full mb-6 p-2 pl-3 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"
      v-model="oldPassword"
      placeholder="Escribe tu contraseña actual"
    />
    <label class="ml-1 font-semibold">Nueva contraseña</label>
    <input
      type="text"
      class="border w-full p-2 pl-3 mt-4 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"
      v-model="newPassword1"
      placeholder="Escribe tu nueva contraseña"
    />
    <!-- <input
      type="text"
      class="border w-full p-2 pl-3 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"
      v-model="newPassword2"
      placeholder="Escribe nuevamente tu nueva contraseña"
    /> -->
    <div v-if="error !== ''"></div>
    <div class="py-4">
      <CustomButton @onEvent="saveNewPassword" />
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import {
  ref,
  computed,
  watchEffect,
  watch,
  defineComponent,
  defineAsyncComponent,
} from 'vue'
import CustomButton from '@/components/buttons/CustomButton.vue'
import { useStore } from 'vuex'
export default {
  components: { CustomButton },
  props: {
    modalData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const store = useStore()
    const oldPassword = ref('')
    const newPassword1 = ref('')
    const newPassword2 = ref('')
    const email = ref(store.state.user.email)
    const error = ref('')

    const saveNewPassword = async () => {
      try {
        store.dispatch('changePassword', {
          oldPassword: oldPassword.value,
          newPassword: newPassword1.value,
        })
        context.emit('onSavePassword')
      } catch (error) {
        error.value = 'error' + error
        console.log('Errore', error)
      }
    }
    // const accountId = ref(store.state.user.accountId)
    // const userId = ref(store.state.userId)
    // const displayName = ref(store.state.user.displayName)
    // const email = ref(store.state.user.email)
    // const img = ref(store.state.user.img)
    // const name = ref(store.state.user.name)
    // const surname = ref(store.state.user.surname)
    // const error = ref(null)

    return {
      oldPassword,
      newPassword1,
      newPassword2,
      saveNewPassword,
      error,
    }
  },
}
</script>

<style>
.v-popper__arrow-container {
  display: none;
}
</style>
