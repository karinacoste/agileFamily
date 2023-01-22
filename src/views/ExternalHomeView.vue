<template>
  <div class="overflow-y-hidden min-h-screen">
    <external-nav-bar>
      <span
        class="border border-primary w-24 h-9 rounded-md text-center pt-1 hover:text-primary"
        ><router-link to="/LoginView">Login</router-link></span
      >
      <span
        class="border hidden md:block border-primary ml-4 text-white h-9 w-24 rounded-md text-center pt-1 bg-primary hover:bg-primaryDark"
        ><router-link to="/SignupView">Signup</router-link></span
      >
    </external-nav-bar>
    <main-banner
      bannerImage="familyImage"
      :bannerText="mainBannerText"
      :backgroundImage="true"
      :withButton="true"
    ></main-banner>

    <secondary-banner
      v-for="(banner, index) in secondaryBannersContent"
      :key="index"
      :bannerImage="banner.bannerImage"
      :bannerTextTitle="banner.bannerTextTitle"
      :bannerText="banner.bannerText"
      :backgroundGray="banner.backgroundGray"
      :textOnRight="banner.textOnRight"
    ></secondary-banner>

    <div class="flex relative w-full items-center">
      <div
        class="flex w-full bottom-0 shadow-md items-center py-5 justify-center bg-slate-300"
      >
        <figure class="opacity-60">
          <img src="@/assets/images/logo-gray.png" />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import MainBanner from '../components/banners/MainBanner.vue'
import SecondaryBanner from '../components/banners/SecondaryBanner.vue'
import ExternalNavBar from '../components/nav/ExternalNavBar.vue'
import { onBeforeMount, onBeforeUnmount, onMounted } from '@vue/runtime-core'
export default {
  components: {
    MainBanner,
    ExternalNavBar,
    SecondaryBanner,
  },
  setup() {
    const store = useStore()
    const mainBannerText =
      '¡Organiza y gestiona los proyectos y tareas de tu familia!'
    const secondaryBannersContent = reactive([
      {
        bannerTextTitle: 'Comparte objetivos y tareas',
        bannerText:
          'Gestiona el avance y consecución de los proyectos de tu familia de una forma divertida con nuestro tablero Kanban.',
        bannerImage: 'app1',
        backgroundGray: false,
        textOnRight: false,
      },
      {
        bannerTextTitle: 'Forma tu equipo',
        bannerText:
          'Añade fácilmente  a los miembros de tu familia para que puedan ser parte del equipo.',
        bannerImage: 'app2',
        backgroundGray: true,
        textOnRight: true,
      },
      {
        bannerTextTitle: 'Visualiza los logros de tu familia',
        bannerText:
          'Haz seguimiento de los objetivos alcanzados y tareas realizadas en la sección de estadísticas.',
        bannerImage: 'app3',
        backgroundGray: false,
        textOnRight: false,
      },
    ])
    return { mainBannerText, secondaryBannersContent }
  },
}
</script>
