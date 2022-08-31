import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { auth } from '../firebase/config'
import store from '@/store'
import { onAuthStateChanged } from 'firebase/auth'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/ExternalHomeView',
    name: 'ExternalHomeView',
    component: () => import('../views/ExternalHomeView.vue'),
  },
  {
    path: '/LoginView/',
    name: 'LoginView',
    component: LoginView,
  },
  {
    path: '/SignupView',
    name: 'SignupView',
    component: () => import('../views/SignupView.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.path === '/ExternalHomeView' && auth.currentUser) {
    console.log('ExternalHomeView', auth.currentUser)
    next('/')
    return
  }

  if (to.path === '/LoginView' && auth.currentUser) {
    console.log('LoginView', auth.currentUser)
    next('/')
    return
  }

  if (to.path === '/SignupView' && auth.currentUser) {
    console.log('signupView', auth.currentUser)
    next('/')
    return
  }

  if (
    to.matched.some((record) => record.meta.requiresAuth && !auth.currentUser)
  ) {
    console.log('Entra', auth.currentUser)
    // onAuthStateChanged(auth, (user) => {
    //   if (!user) {
    //     //   // User is signed in, see docs for a list of available properties
    //     //   // https://firebase.google.com/docs/reference/js/firebase.User
    //     next('/ExternalHomeView')
    //     console.log('1', user)
    //     return
    //   }
    // })

    // })

    // console.log('1', auth.currentUser)
    // onAuthStateChanged(auth, (user) => {
    //   if (!user) {
    //     next('/ExternalHomeView')
    //     console.log('1', auth.currentUser)
    //     return
    //   }
    // })

    next('/ExternalHomeView')
    //     console.log('1', user)
    return
  }

  next()
})

export default router
