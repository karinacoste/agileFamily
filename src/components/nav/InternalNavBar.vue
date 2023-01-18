<template>
  <div class="relative h-16 w-full bg-white">
    <Modal v-model="isShow" :close="closeModal">
      <div class="modal w-3/6 p-12">
        <generic-modal
          :modalTitle="modalTitle"
          :componentName="modalComponent"
          :modalData="modalData"
          @onSaveEditedProfile="saveEditedProfile"
          @onSavePassword="savePassword"
        ></generic-modal>
      </div>
    </Modal>
    <div
      class="absolute flex inset-x-0 top-0 px-4 py-2 shadow-md items-center justify-center"
    >
      <div class="flex w-full">
        <nav class="w-full relative flex items-center mx-2">
          <router-link to="/">
            <figure>
              <img
                src="../../assets/images/navBarLogo.png"
                alt="agileFamily Logo"
              />
            </figure>
          </router-link>
          <div class="flex ml-auto mt-2 items-center">
            <nav class="mr-12">
              <router-link to="/">Home</router-link> |
              <router-link to="/SprintsStatsView">Estadísticas</router-link> |
              <router-link to="/UsersView">Usuarios</router-link>
              <!-- <router-link to="/LoginView">Login karina</router-link> |
              <router-link to="/SignupView">Signup karina</router-link> | -->
            </nav>

            <!-- /////////////////////// -->
            <VDropdown placement="bottom-end">
              <!-- This will be the popover target (for the events and position) -->
              <button class="flex ml-4">
                <figure class="w-10">
                  <img :src="userImage" />
                </figure>
              </button>
              <!-- This will be the content of the popover -->
              <template #popper="{ hide }">
                <div class="flex py-4 left-0">
                  <ul class="px-2 w-full" @click="hide()">
                    <li
                      class="my-1 flex items-center w-full hover:bg-slate-200 cursor-pointer px-4 py-2"
                      @click="editProfile"
                    >
                      <user-icon class="w-5 mr-2" />
                      Editar perfil
                    </li>
                    <li
                      class="my-1 flex items-center w-full hover:bg-slate-200 cursor-pointer px-4 py-2"
                      @click="changePassword"
                    >
                      <span><lock-icon class="w-5 mr-2" /></span>
                      <span> Cambiar contraseña</span>
                    </li>
                    <li
                      class="my-1 flex items-center w-full hover:bg-slate-200 cursor-pointer px-4 py-2"
                      @click="handleClick"
                    >
                      <span><off-icon class="w-5 mr-2" /></span>
                      <span>Cerrar sesión</span>
                    </li>
                  </ul>
                </div>
              </template>
            </VDropdown>
            <!-- ////////////////////////////////// -->
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import UserIcon from '@/components/icons/UserIcon.vue'
import LockIcon from '@/components/icons/LockIcon.vue'
import OffIcon from '@/components/icons/OffIcon.vue'
import GenericModal from '@/components/modals/GenericModal.vue'
import {
  ref,
  computed,
  watchEffect,
  watch,
  defineComponent,
  defineAsyncComponent,
} from 'vue'
export default {
  components: { UserIcon, LockIcon, OffIcon, GenericModal },
  props: {},
  setup() {
    const store = useStore()
    const user = computed(() => store.state.user)
    const userImage = computed(() =>
      require(`@/assets/images/users/${user.value?.img || 'user0'}.png`)
    )
    const handleClick = () => {
      store.dispatch('logout')
    }
    const isShow = ref(false)
    function showModal() {
      isShow.value = true
    }
    function closeModal() {
      isShow.value = false
    }
    const editProfile = () => {
      showGenericModal('Editar perfil', 'userForm', user).value
      //  context.emit('onEditProfile')
    }
    const changePassword = () => {
      showGenericModal('Cambiar contraseña', 'changePassword', user).value
      //  context.emit('onEditProfile')
    }
    let modalTitle = ref('')
    let modalComponent = ref('')
    let modalData = ref({})
    async function saveEditedProfile(userData) {
      await store.dispatch('updateUserProfile', userData)
      closeModal()
    }
    function savePassword() {
      console.log('Save Password')
      closeModal()
    }
    async function showGenericModal(title, component, data) {
      modalTitle.value = title
      modalComponent.value = component
      modalData.value = data
      showModal()
    }

    return {
      store,
      saveEditedProfile,
      savePassword,
      handleClick,
      userImage,
      editProfile,
      changePassword,
      showGenericModal,
      isShow,
      showModal,
      closeModal,
      modalTitle,
      modalComponent,
      modalData,
      user,
    }
  },
}
</script>

<style></style>
