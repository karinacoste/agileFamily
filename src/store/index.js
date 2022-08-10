import { createStore } from 'vuex'
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
export default createStore({
  state: {
    user: null,
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload
      console.log('User', state.user)
    },
  },
  actions: {
    async signup(context, { email, password }) {
      console.log('signup action')
      // async code
      const res = await createUserWithEmailAndPassword(auth, email, password)
      if (res) {
        console.log('usurio  creado')
        context.commit('setUser', res.user)
      } else {
        throw new Error('could not complete sigup')
      }
    },
  },
  modules: {},
})
