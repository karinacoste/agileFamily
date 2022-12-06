import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import UsersView from '../views/UsersView.vue'
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
    path: '/SignupView/',
    name: 'SignupView',
    component: () => import('../views/SignupView.vue'),
  },
  {
    path: '/UsersView',
    name: 'UsersView',
    component: UsersView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/SprintsStatsView',
    name: 'SprintsStatsView',
    component: () => import('../views/SprintsStatsView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.path === '/ExternalHomeView' && auth.currentUser) {
    next('/')
    return
  }

  if (to.path === '/LoginView' && auth.currentUser) {
    next('/')
    return
  }

  if (to.path === '/SignupView' && auth.currentUser) {
    next('/')
    return
  }

  if (
    to.matched.some((record) => record.meta.requiresAuth && !auth.currentUser)
  ) {
    // onAuthStateChanged(auth, (user) => {
    //   if (!user) {
    //     //   // User is signed in, see docs for a list of available properties
    //     //   // https://firebase.google.com/docs/reference/js/firebase.User
    //     next('/ExternalHomeView')
    //     return
    //   }
    // })

    // })

    // console.log('1', auth.currentUser)
    // onAuthStateChanged(auth, (user) => {
    //   if (!user) {
    //     next('/ExternalHomeView')
    //     return
    //   }
    // })

    next('/ExternalHomeView')
    return
  }

  next()
})

export default router
