import { createStore, storeKey } from 'vuex'
import { auth } from '../firebase/config'
import { db } from '../firebase/config'
import router from '../router'
import {
  addDays,
  getTime,
  endOfWeek,
  startOfISOWeek,
  endOfISOWeek,
  getWeek,
  formatISO,
} from 'date-fns'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
} from 'firebase/auth'
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

export default createStore({
  state: {
    sprints: [],
    sprintById: {
      objectives: [
        // {
        //   id: 'o-tso',
        //   name: 'Tareas sin objetivo',
        //   todo: [],
        //   progress: [],
        //   state: 'todo',
        //   blocked: [],
        //   completed: [],
        // },
      ],
    },
    currentSprint: [],
    authUser: null,
    user: null,
    userId: null,
    userIdToken: null,
    authIsReady: false,
    objectives: [],
    accountId: null,
  },
  getters: {},
  mutations: {
    setSprints(state, payload) {
      state.sprints = payload
    },
    setSprintById(state, payload) {
      state.sprintById = payload
      console.log('setSprintById', payload)
    },
    setCurrentSprint(state, payload) {
      state.currentSprint = payload
    },
    setAccountId(state, payload) {
      state.accountId = payload
    },
    setObjectives(state, payload) {
      state.objectives = payload
    },
    setAuthUser(state, payload) {
      state.authUser = payload
    },
    setUser(state, payload) {
      state.user = payload
    },
    setUserId(state, payload) {
      state.userId = payload
    },
    setUserIdToken(state, payload) {
      state.userIdToken = payload
    },
    setAuthIsready(state, payload) {
      state.authIsReady = payload
    },
    clearUser(state) {
      state.user = null
    },
    clearAuthUser(state) {
      state.authUser = null
    },
  },
  actions: {
    async createNewUser(context, userInfo) {
      try {
        await setDoc(doc(db, 'users', context.state.user.userId), userInfo)
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    },

    async createNewAccount(context, accountInfo) {
      try {
        // const docRef = await setDoc(collection(db, 'users'), {
        // await setDoc(doc(db, 'accounts', newAccount))
        const docRef = await addDoc(collection(db, 'accounts'), accountInfo)
        context.commit('setaccountId', docRef.id)
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    },
    async getAppUsers() {
      const querySnapshot = await getDocs(collection(db, 'users'))
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`)
      })
    },
    async createSprint(context, data) {
      const accountId = await context.state.user.accountId
      if (accountId) {
        try {
          const docRef = await setDoc(
            doc(
              db,
              'accounts',
              accountId.replace(/ /g, ''),
              'sprints',
              data.id
            ),
            data
          )
          context.commit('setSprintById', data)
        } catch (error) {
          console.log('Create Sprint Error: ', error)
        }
      }
    },
    async updateSprint(context, data) {
      const accountId = await context.state.user.accountId
      if (accountId) {
        const q = doc(
          db,
          'accounts',
          accountId.replace(/ /g, ''),
          'sprints',
          '2022-41'
        )
        await updateDoc(q, { objectives: data })
      }
    },
    async getSprints(context) {
      const accountId = await context.state.user.accountId
      // const accountId = 'Ilfq5q1BKhUTou0F5ec4'

      if (accountId) {
        const q = query(
          collection(db, 'accounts', accountId.replace(/ /g, ''), 'sprints')
        )
        const unsubscribe = onSnapshot(
          q,
          async (querySnapshot) => {
            const sprints = []
            querySnapshot.forEach((doc) => {
              const oneSprint = doc.data()
              oneSprint.id = doc.id
              sprints.push(oneSprint)
            })
            context.commit('setSprints', sprints)
          },
          (error) => {
            console.log('error ', error)
          }
        )
      }
    },
    async getSprintById(context, sprintId) {
      const accountId = await context.state.user.accountId
      // const accountId = 'Ilfq5q1BKhUTou0F5ec4'

      if (accountId) {
        const docRef = doc(
          db,
          'accounts',
          accountId.replace(/ /g, ''),
          'sprints',
          sprintId
        )
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data())
          context.commit('setSprintById', docSnap.data())
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      }
    },

    async signup(context, userInfo) {
      // async code
      const { displayName, email, password, name, surname, role } = userInfo
      const res = await createUserWithEmailAndPassword(auth, email, password)
      if (res) {
        const userId = auth.currentUser.uid
        context.commit('setAuthUser', auth.currentUser)
        // context.commit('setUserId', auth.currentUser.uid)
        context.commit('setUser', {
          userId,
          displayName,
          name,
          surname,
          email,
          password,
          role,
        })
        const newAccountInfo = {
          admin: {
            userName: email,
            uid: userId,
          },
          users: [],
        }
        try {
          const docRef = await addDoc(
            collection(db, 'accounts'),
            newAccountInfo
          )
          if (docRef.id) {
            try {
              await context.dispatch('createNewUser', {
                displayName,
                email,
                name,
                surname,
                role,
                accountId: docRef.id,
              })
            } catch (error) {
              console.log('ERROR', error)
            }
          }
          // await context.dispatch('createNewAccount', newAccountInfo)
        } catch (error) {}
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
        context.commit('setAuthUser', auth.currentUser)
      } else {
        throw new Error('could not complete upDateUserInfooo')
      }
    },
    async login(context, { email, password }) {
      const res = await signInWithEmailAndPassword(auth, email, password)
      if (res) {
        // context.commit('setUser', res.user)
        context.commit('setAuthUser', auth.currentUser)
        await context.dispatch('fetchUserById', auth.currentUser.uid)
      } else {
        throw new Error('could not complete login')
      }
    },
    async logout(context) {
      console.log('logout action')
      const res = await signOut(auth)
      context.commit('setAuthUser', null)
      context.commit('setUser', null)
      // window.localStorage.clear()
      router.push('/ExternalHomeView')
    },
    async fetchUserById(context, uid) {
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        context.commit('setUser', docSnap.data())
        // localStorage.clear()
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    },
    async fetchAuthUser(context) {
      onAuthStateChanged(auth, async (user) => {
        if (user === null) {
          context.commit('clearUser')
          context.commit('clearAuthUser')
        } else {
          context.commit('setAuthUser', user)
          await context.dispatch('fetchUserById', user.uid)
          if (
            router.isReady() &&
            router.currentRoute.value.path === '/ExternalHomeView'
          ) {
            const token = await auth.currentUser.getIdToken(true)
            context.commit('setUserIdToken', token)
            context.commit('setAuthUser', user)
            router.push('/')
          }
        }
      })
    },
  },
  getters: {
    getterSprints(state) {
      return state.sprints
    },
  },
  modules: {},
})
