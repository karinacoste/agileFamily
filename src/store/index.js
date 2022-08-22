import { createStore, storeKey } from 'vuex'
import { auth } from '../firebase/config'
import router from '../router'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'

export default createStore({
  state: {
    user: null,
    authIsReady: false,
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload
      console.log('User', state.user)
    },
    setAuthIsready(state, payload) {
      state.authIsReady = payload
    },
    clearUser(state) {
      state.user = null
    },
  },
  actions: {
    async signup(context, { email, password }) {
      console.log('signup action')
      // async code
      const res = await createUserWithEmailAndPassword(auth, email, password)
      if (res) {
        context.commit('setUser', auth.currentUser)
      } else {
        throw new Error('could not complete sigup')
      }
    },
    // async upDateUserInfo(context, { userInfo }) {
    async upDateUserInfo(context) {
      const res = await updateProfile(auth.currentUser, {
        displayName: 'Karina Coste',
        // photoURL: 'https://example.com/jane-q-user/profile.jpg',
      })
      if (res) {
        // context.commit('setUser', res.user)
        context.commit('setUser', auth.currentUser)
      } else {
        throw new Error('could not complete upDateUserInfooo')
      }
    },
    async login(context, { email, password }) {
      console.log('login action')
      const res = await signInWithEmailAndPassword(auth, email, password)
      if (res) {
        // context.commit('setUser', res.user)
        context.commit('setUser', auth.currentUser)
        window.localStorage.setItem('token', auth.currentUser.email)
        router.push('/')
      } else {
        throw new Error('could not complete login')
      }
    },
    async logout(context) {
      console.log('logout action')
      const res = await signOut(auth)
      context.commit('setUser', null)
      window.localStorage.clear()
      router.push('/ExternalHomeView')
    },
    async fetchUser(context) {
      onAuthStateChanged(auth, async (user) => {
        if (user === null) {
          context.commit('clearUser')
        } else {
          context.commit('setUser', user)
          console.log('fetchUser', user)
          if (
            router.isReady() &&
            router.currentRoute.value.path === '/ExternalHomeView'
          ) {
            router.push('/')
          }
        }
      })
    },
  },
  modules: {},
})

// const unsub = onAuthStateChanged(auth, (user) => {
//   store.commit('setAuthIsready', true), store.commit('setUser', user)
//   unsub()
// })
