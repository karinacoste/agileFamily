<template>
  <div class="w-full flex flex-col items-center min-h-max h-full">
    <Modal v-model="isShow" :close="closeModal">
      <div class="modal w-3/6 p-12">
        <generic-modal
          :modalTitle="modalTitle"
          :componentName="modalComponent"
          :modalData="modalData"
          @onSaveUser="saveUser"
          @onCancelModal="closeModal"
        ></generic-modal>
      </div>
    </Modal>
    <internal-nav-bar :user="user"></internal-nav-bar>
    <div class="flex md:w-7/12 border-b border-gray-300">
      <h1 class="text-2xl font-semibold ml-7 mt-5 mb-2">Usuarios</h1>
    </div>

    <div class="w-7/12 flex justify-center flex-col">
      <CustomButton
        v-if="isCurrentUserAdmin"
        text="Añadir usuario"
        icon="PlusIcon"
        buttonClass="h-full flex ml-auto mt-4 px-6 py-2 flex items-center justify-center rounded-md bg-primary hover:bg-primaryDark text-white focus:outline-none"
        @onEvent="showGenericModal('Nuevo usuario', 'NewUserForm', {})"
      />
      <!-- // ///////////////////////// -->
      <div class="flex flex-col items-center">
        <div
          v-for="user in allUsersInformations"
          :key="user"
          class="w-3/6 flex shadow-md mt-12 p-4"
        >
          <div class="mr-4">
            <img :src="userImage(user)" alt="user image" />
          </div>
          <div class="mt-2">
            <span class="font-semibold text-xl">{{ user.name }}</span>
            <span class="block">{{ user.email }}</span>
          </div>
        </div>
      </div>
      <!-- // ///////////////////////// -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GenericModal from '@/components/modals/GenericModal.vue'
import CustomButton from '@/components/buttons/CustomButton.vue'
import {
  data,
  ref,
  computed,
  watchEffect,
  watch,
  defineComponent,
  defineAsyncComponent,
  reactive,
} from 'vue'
import { useStore } from 'vuex'
import InternalNavBar from '@/components/nav/InternalNavBar.vue'
const store = useStore()
// import NavBar from '../components/nav/NavBar.vue'

let count = 0
export default defineComponent({
  // components: { InternalNavBar, draggable },
  components: {
    InternalNavBar,
    GenericModal,
    CustomButton,
  },

  setup() {
    const store = useStore()
    const account = computed(() => store.state.account)
    let modalTitle = ref('')
    let modalComponent = ref('')
    let modalData = ref({})
    fetchUserInformation()
    async function fetchUserInformation() {
      try {
        await store.dispatch('fetchUsersInformation')
      } catch (error) {
        console.log('usersInf Error', error)
      }
    }
    const isCurrentUserAdmin = computed(() => {
      const currentUser = allUsersInformations.value.filter(
        (user) => user.uid === authUser.value.uid
      )
      return currentUser[0].role === 'admin' || false
    })
    function saveUser(userEmail) {
      console.log('payload', userEmail)
      try {
        store.dispatch('sendAnEmail', userEmail)
        closeModal()
      } catch (error) {
        console.log('Error saveUser', error)
      }
    }
    let allUsersInformations = computed(() => store.state.allUsersInformations)
    function userImage(userInfo) {
      return userInfo !== ''
        ? require('@/assets/images/users/' + userInfo.img + '.png')
        : require('@/assets/images/users/user0.png')
    }
    async function showGenericModal(title, component, data) {
      modalTitle.value = title
      modalComponent.value = component
      modalData.value = data
      showModal()
    }

    const isShow = ref(false)
    function showModal() {
      isShow.value = true
    }
    function closeModal() {
      isShow.value = false
    }
    const user = ref(store.state.user)
    const userAccountId = ref(store.state.user.accountId)
    const authUser = ref(store.state.authUser)
    const userIdToken = ref(store.state.userIdToken)
    const showUsers = async () => {
      try {
        store.dispatch('getAppUsers')
      } catch (e) {
        console.error('Error getAppUsers', e)
      }
    }

    return {
      isCurrentUserAdmin,
      saveUser,
      userImage,
      allUsersInformations,
      modalTitle,
      modalComponent,
      modalData,
      showGenericModal,
      isShow,
      showModal,
      closeModal,
      account,
      userAccountId,
      showUsers,
      user,
      authUser,
      userIdToken,
    }
  },
})
</script>
<style scoped>
.modal h1 {
  font-size: 30px;
}
.vue-universal-modal {
  /* Change dimmed color */
  background-color: rgba(255, 255, 0, 0.3) !important;
}
.vue-universal-modal-content {
  /* Align to top (flex-direction property value is set to column) */
  background-color: rgba(255, 255, 0, 0.3) !important;
}
</style>
