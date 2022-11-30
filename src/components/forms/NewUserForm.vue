<template>
  <div class="text-left mt-8">
    <!-- // ///////////////////////////////// -->
    <label class="ml-1 font-semibold">Email</label>
    <input
      type="email"
      class="border w-full p-2 pl-3 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"
      v-model="email"
      placeholder="Escribe el mail"
    />

    <div class="py-4">
      <CustomButton @onEvent="sendEmailToUser" text="Enviar invitación" />
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
    const accountId = ref(store.state.user.accountId)
    const displayName = ref('')
    const name = ref('')
    const surname = ref('')
    const email = ref('')
    const img = ref('')
    const error = ref(null)
    function changeuserImage(imgSelected) {
      img.value = imgSelected
    }
    const sendEmailToUser = () => {
      // let newUser = {
      //   email: email.value,
      // }

      context.emit('onSaveUser', email.value)
    }

    return {
      sendEmailToUser,
      email,
    }
  },
}
</script>

<style>
.v-popper__arrow-container {
  display: none;
}
</style>
