<template>
  <div class="w-full flex flex-col items-center min-h-max h-full">
    <Modal v-model="isShow" :close="closeModal">
      <div class="modal w-3/6 p-12">
        <generic-modal
          :modalTitle="modalTitle"
          :componentName="modalComponent"
          :modalData="modalData"
          @onSaveObjective="saveObjective"
          @onCancelModal="closeModal"
        ></generic-modal>
      </div>
    </Modal>
    <internal-nav-bar :user="userDisplayName"></internal-nav-bar>
    <div class="flex md:w-8/12">
      <h1 class="text-3xl font-bold ml-7 my-5">Usuarios</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GenericModal from '@/components/modals/GenericModal.vue'
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
import OptionsIcon from '@/components/icons/OptionsIcon.vue'
// import DynamicIcons from '@/components/icons/DynamicIcons.vue'
import draggable from 'vuedraggable'
import { getWeekStart } from '@/assets/js/utils.js'
import {
  addDays,
  getTime,
  endOfWeek,
  startOfISOWeek,
  endOfISOWeek,
  getWeek,
  getISOWeek,
  formatISO,
} from 'date-fns'
const store = useStore()
// import NavBar from '../components/nav/NavBar.vue'

let count = 0
export default defineComponent({
  // components: { InternalNavBar, draggable },
  components: {
    InternalNavBar,
    GenericModal,
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

    let allUsersInformations = ref(store.state.allUsersInformations)
    // const showGenericModal = (
    //   modalTitle,
    //   componentName,
    //   componentPath,
    //   modalData
    // ) => {
    //   return { modalTitle, componentName, componentPath, modalData }
    // }

    async function showGenericModal(title, component, data) {
      try {
        await store.dispatch('getPriorities')
      } catch (error) {
        console.log('Error priorities:', error)
      }
      console.log('component')
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

    store.dispatch('getSprints')
    const sprints = computed(() => store.state.sprints)
    const objectives = computed(() => store.state.sprints[0].objectives)

    // const objectives = ref(store.state.sprints[0].objectives)

    const states = ['todo', 'progress', 'blocked', 'completed']
    const userDisplayName = ref(store.state.user.displayName)
    // const sprints = ref(store.getters['getterSprints'])
    // const sprints = ref(store.state.sprints)
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
      allUsersInformations,
      modalTitle,
      modalComponent,
      modalData,
      showGenericModal,
      isShow,
      showModal,
      closeModal,
      account,
      watchEffect,
      objectives,
      states,
      sprints,
      // sprints: computed(() => store.state.sprints),
      userAccountId,
      showUsers,
      userDisplayName,
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
