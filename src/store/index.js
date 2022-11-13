import { createStore, storeKey } from 'vuex'
import { auth } from '../firebase/config'
import { db } from '../firebase/config'
import router from '../router'
import UsersTransformer from '@/transformers/UsersTransformer'
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
    allUsersInformations: [],
    sprints: [],
    sprintById: {
      objectives: [],
    },
    currentSprint: [],
    authUser: null,
    user: null,
    userId: null,
    userIdToken: null,
    authIsReady: false,
    objectives: [],
    accountId: null,
    account: {},
    priorities: [],
    waiting: false,
  },
  getters: {},
  mutations: {
    setAllUsersInformation(state, payload) {
      state.allUsersInformations = payload
    },
    setIsWaiting(state, payload) {
      state.waiting = payload
    },
    setSprints(state, payload) {
      state.sprints = payload
    },
    setAccount(state, payload) {
      state.account = payload
    },
    setSprintById(state, payload) {
      state.sprintById = payload
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
    setPriorities(state, payload) {
      state.priorities = payload
    },
  },
  actions: {
    async getPriorities(context) {
      try {
        const docRef = doc(db, 'sprintFeatures', 'priorities')
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          console.log('allPriorities', docSnap.data())
          context.commit('setPriorities', docSnap.data().priorities)
        } else {
          console.log('No existe')
        }
      } catch (error) {
        console.log('Error priorities:', error)
      }
    },
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
    async fetchOneUserInformation(context, id) {
      let oneUser
      const docRef = doc(db, 'users', id)
      try {
        const docSnap = await getDoc(docRef)
        // oneUser = docSnap.data()
        if (docSnap.exists()) {
          oneUser = docSnap.data()
        } else {
          // doc.data() will be undefined in this case
          console.log('No such user!')
        }
      } catch (error) {
        console.log('One User Error: ', error)
      }
      oneUser.uid = id
      return oneUser
      // console.log('oneUser', oneUser)
      // return oneUser
    },
    async fetchUsersInformation(context) {
      const allUsersAccount = context.state.account.users
      const usersInformation = []
      for (const user in allUsersAccount) {
        const oneUserInf = await context.dispatch(
          'fetchOneUserInformation',
          allUsersAccount[user].uid
        )
        oneUserInf['role'] = allUsersAccount[user].role
        usersInformation.push(oneUserInf)
      }

      context.commit('setAllUsersInformation', usersInformation)
    },
    async fetchAccountById(context) {
      const docRef = doc(db, 'accounts', context.state.user.accountId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        context.commit('setAccount', docSnap.data())
        console.log('Account', docSnap.data())
        console.log('Account', context.state.accountId)
      } else {
        // doc.data() will be undefined in this case
        console.log('No such account!')
      }
    },
    async fetchAllAccountInformation(context) {
      // context.commit.setIsWaiting(state, true)
      await context.dispatch('fetchAccountById')
      await context.dispatch('fetchUsersInformation')
      // context.commit.setIsWaiting(state, false)
      console.log('fetchAll')
      console.log('Users from store', context.state.allUsersInformations)
    },
    async createSprint(context, data) {
      try {
        const accountId = await context.state.user.accountId
        try {
          const docRef = doc(
            db,
            'accounts',
            accountId.replace(/ /g, ''),
            'sprints',
            data.id
          )
          setDoc(docRef, data)
          context.commit('setSprintById', data)
        } catch (error) {
          console.log('Create Sprint Error: ', error)
        }
      } catch (error) {
        console.log('Error create Sprint: ', error)
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
          context.state.sprintById.id
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
          context.commit('setSprintById', docSnap.data())
        } else {
          context.commit('setSprintById', { objectives: [] })
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
          users: [{ uid: userId, role: role }],
        }
        try {
          const docRef = await addDoc(
            collection(db, 'accounts'),
            newAccountInfo
          )
          if (docRef.id) {
            // si se ha creado una nueva cuenta, se actualiza el estado accountId
            context.commit('setAccountId', docRef.id)
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
    // async upDateUserInfo(context) {
    //   const res = await updateProfile(auth.currentUser, {
    //     displayName: 'Karina Coste',
    //     // photoURL: 'https://example.com/jane-q-user/profile.jpg',
    //   })
    //   if (res) {
    //     context.commit('setAuthUser', auth.currentUser)
    //   } else {
    //     throw new Error('could not complete upDateUserInfooo')
    //   }
    // },
    async login(context, { email, password }) {
      context.commit('setSprintById', { objectives: [] })
      const res = await signInWithEmailAndPassword(auth, email, password)
      if (res) {
        // context.commit('setUser', res.user)
        context.commit('setAuthUser', auth.currentUser)
        await context.dispatch('fetchUserById', auth.currentUser.uid)
        console.log(auth.currentUser.uid)
      } else {
        throw new Error('could not complete login')
      }
    },
    async logout(context) {
      const res = await signOut(auth)
      context.commit('setAccountId', null)
      context.commit('setAuthUser', null)
      context.commit('setUser', null)
      context.commit('setSprintById', { objectives: [] })
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
          context.commit('setUser', null)
          context.commit('setAuthUser', null)
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
    getterIsWaiting(state) {
      return state.waiting
    },
    getterSprints(state) {
      return state.sprints
    },
    getterUsersInfo(state) {
      return UsersTransformer.usersInformationById(state.allUsersInformations)
    },
  },
  modules: {},
})
