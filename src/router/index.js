import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { auth } from '../firebase/config'

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
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
})
gi
router.beforeEach((to, from, next) => {
  if (to.path === '/LoginView' && auth.currentUser) {
    next('/')
    return
  }
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !auth.currentUser
  ) {
    next('/ExternalHomeView')
    return
  }

  next()
})

export default router
