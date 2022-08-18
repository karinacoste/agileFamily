import { createStore, storeKey } from 'vuex'
import { auth } from '../firebase/config'
import router from '../router'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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
  },
  actions: {
    async signup(context, { email, password }) {
      console.log('signup action')
      // async code
      const res = await createUserWithEmailAndPassword(auth, email, password)
      if (res) {
        // context.commit('setUser', res.user)
        context.commit('setUser', auth.currentUser)
      } else {
        throw new Error('could not complete sigup')
      }
    },
    async login(context, { email, password }) {
      console.log('login action')
      const res = await signInWithEmailAndPassword(auth, email, password)
      if (res) {
        // context.commit('setUser', res.user)
        context.commit('setUser', auth.currentUser)
      } else {
        throw new Error('could not complete login')
      }
    },
    async logout(context) {
      console.log('logout action')
      const res = await signOut(auth)
      context.commit('setUser', null)
      router.push('/ExternalHomeView')
    },
  },
  modules: {},
})

// const unsub = onAuthStateChanged(auth, (user) => {
//   store.commit('setAuthIsready', true), store.commit('setUser', user)
//   unsub()
// })
