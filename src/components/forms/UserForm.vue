<template>
  <div class="text-left mt-8">
    <div class="mb-3 flex">
      <VDropdown placement="bottom-start">
        <!-- This will be the popover target (for the events and position) -->
        <button class="flex ml-4">
          <img :src="userImage(img)" alt="" />
          <span class="ml-2 mt-4">Selecciona un avatar</span>
        </button>
        <!-- This will be the content of the popover -->
        <template #popper="{ hide }">
          <div class="flex left-0">
            <ul class="px-2" @click="hide()">
              <li
                class="my-2 hover:bg-slate-200 cursor-pointer px-2 py-1"
                v-for="index in 7"
                :key="index"
                @click="changeuserImage('user' + (index - 1))"
              >
                <img :src="userImage('user' + (index - 1))" alt="" />
              </li>
            </ul>
          </div>
        </template>
      </VDropdown>
    </div>
    <label class="ml-1 font-semibold">Nombre de usuario</label>
    <input
      type="text"
      class="border w-full p-2 pl-3 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"
      :inputValue="displayName"
      v-model="displayName"
      placeholder="Escribe el nombre de usuario"
    />
    <!-- // ///////////////////////////////// -->
    <label class="ml-1 font-semibold">Nombre</label>
    <input
      type="text"
      class="border w-full p-2 pl-3 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"
      v-model="name"
      placeholder="Escribe los apellidos"
    />
    <!-- // ///////////////////////////////// -->
    <label class="ml-1 font-semibold">Apellidos</label>
    <input
      type="text"
      class="border w-full p-2 pl-3 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"
      v-model="surname"
      placeholder="Escribe los apellidos"
    />
    <!-- // ///////////////////////////////// -->

    <div class="py-4">
      <CustomButton @onEvent="saveEditedProfile" />
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
    // const dataImages = [
    //   {
    //     id: '1',
    //     src: 'https://unsplash.it/200?random',
    //     alt: 'Alt Image 1',
    //   },
    //   {
    //     id: '2',
    //     src: 'https://unsplash.it/200?random',
    //     alt: 'Alt Image 2',
    //   },
    //   {
    //     id: '2',
    //     src: 'https://unsplash.it/200?random',
    //     alt: 'Alt Image 2',
    //     disabled: true,
    //   },
    // ]

    const store = useStore()
    const accountId = ref(store.state.user.accountId)
    const userId = ref(store.state.userId)
    const displayName = ref(store.state.user.displayName)
    const email = ref(store.state.user.email)
    const img = ref(store.state.user.img)
    const name = ref(store.state.user.name)
    const surname = ref(store.state.user.surname)
    const error = ref(null)
    function changeuserImage(imgSelected) {
      img.value = imgSelected
    }
    const saveEditedProfile = () => {
      let userProfile = {
        uid: email.value,
        accountId: accountId.value,
        displayName: displayName.value,
        name: name.value,
        surname: surname.value,
        email: email.value,
        img: img.value,
      }
      context.emit('onSaveEditedProfile', userProfile)
    }
    function userImage(userName) {
      let imageName = userName || 'user0'
      let image = require(`@/assets/images/users/${imageName}.png`)
      // if (userAssigned.value !== '') {
      //   let userObject = allUsers.value[userAssigned.value]
      //   image = require('@/assets/images/users/' + userObject.img + '.png')
      // }
      return image
    }
    return {
      changeuserImage,
      userId,
      userImage,
      // dataImages,
      saveEditedProfile,
      accountId,
      displayName,
      name,
      surname,
      email,
      error,
      img,
    }
  },
}
</script>

<style>
.v-popper__arrow-container {
  display: none;
}
</style>
