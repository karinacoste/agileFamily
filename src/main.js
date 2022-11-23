import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/tailwind.css'
import 'vue-universal-modal/dist/index.css'
import FloatingVue from 'floating-vue'
import VueUniversalModal from 'vue-universal-modal'
import 'floating-vue/dist/style.css'
createApp(App)
  .use(store)
  .use(router)
  .use(VueUniversalModal, {
    teleportTarget: '#modals',
  })
  .use(FloatingVue)
  .mount('#app')
