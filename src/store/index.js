import { createStore, storeKey } from 'vuex'
import { auth } from '../firebase/config'
import { sendSignInLinkToEmail } from 'firebase/auth'
import { db } from '../firebase/config'
import router from '../router'
import UsersTransformer from '@/transformers/UsersTransformer'
import SprintsTransformer from '@/transformers/SprintsTransformer'
import {
  reauthenticateWithCredential,
  updatePassword,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  EmailAuthProvider,
} from 'firebase/auth'
import {
  arrayUnion,
  collection,
  onSnapshot,
  query,
  doc,
  addDoc,
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
      state.sprints = payload.reverse()
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
    async changePassword(context, { oldPassword, newPassword }) {
      try {
        const user = auth.currentUser
        const credential = EmailAuthProvider.credential(user.email, oldPassword)
        await reauthenticateWithCredential(user, credential)

        try {
          await updatePassword(user, newPassword)
          console.log('update password from store')
        } catch (error) {}
      } catch (error) {
        console.log('newPasswordError', error)
      }
    },
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

    async createNewAccount(context, accountInfo) {
      try {
        // const docRef = await setDoc(collection(db, 'users'), {
        // await setDoc(doc(db, 'accounts', newAccount))
        const newAccountDocRef = await addDoc(
          collection(db, 'accounts'),
          accountInfo
        )
        context.commit('setaccountId', newAccountDocRef.id)
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
      const accountId = context.state.accountId || context.state.user.accountId
      const docRef = doc(db, 'accounts', accountId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        context.commit('setAccount', docSnap.data())
      } else {
        console.log('No exite esa cuenta!')
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
          console.log('No existe ese sprint!')
        }
      }
    },

    async updateAccoutUsers(contex, infoUser) {
      const { accountId, uid, role } = infoUser
      const AccountDocRef = doc(db, 'accounts', accountId)
      try {
        await updateDoc(AccountDocRef, {
          users: arrayUnion({ uid, role }),
        })
        console.log('llega')
      } catch (error) {
        console.log('accountId', accountId)
        console.error('Error adding user to account: ', error)
      }
    },
    async createNewAdmin(context, userInfo) {
      try {
        await setDoc(doc(db, 'users', context.state.user.userId), userInfo)
        // await context.dispatch('updateAccoutUsers', userInfo)
      } catch (e) {
        console.error('Error adding user: ', e)
      }
    },

    async sendAnEmail(context, email) {
      console.log('email', email)
      const actionCodeSettings = {
        url:
          // 'https://karinacoste.github.io/kc-project/#/SignupView?accountId=' +
          `http://localhost:8080/#/SignupView?accountId=${context.state.user.accountId}`,

        // This must be true.
        handleCodeInApp: true,
      }
      try {
        sendSignInLinkToEmail(auth, email, actionCodeSettings)
        console.log('sendEmail', email)
      } catch (error) {
        console.log('sendEmail', error)
      }
    },

    async signup(context, userInfo) {
      // async code
      const {
        displayName,
        email,
        password,
        name,
        surname,
        role,
        img,
        userAccountId,
      } = userInfo
      // Se crea un nuevo usurio en auth de firebase
      const res = await createUserWithEmailAndPassword(auth, email, password)
      // Si no ha habido error se mutan (actualizan) los estados de authUser y currentUser para
      // tener a mano la información del nuevo usuario
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
          img,
        })
        if (userAccountId !== '') {
          const uid = userId
          const accountId = userAccountId
          console.log('user', { accountId, uid, role })
          context.dispatch('updateAccoutUsers', { accountId, uid, role })
          context.commit('setAccountId', userAccountId)
        } else {
          const newAccountInfo = {
            users: [{ uid: userId, role: role }],
            creationDate: new Date(),
          }
          try {
            // se crea una nueva cuenta con usurio administrador
            const docRef = await addDoc(
              collection(db, 'accounts'),
              newAccountInfo
            )
            if (docRef.id) {
              // si se ha creado una nueva cuenta, se setea el accountId
              context.commit('setAccountId', docRef.id)
              // Se crea un nuevo usurio en la colección users para tener más datos
            }
            // await context.dispatch('createNewAccount', newAccountInfo)
          } catch (error) {
            console.log('Error creando cuenta', error)
          }
        }

        // Se crea un documento en la collección users con todos los datos del nuevo usurio
        await context.dispatch('createNewAdmin', {
          accountId: context.state.accountId,
          displayName,
          name,
          surname,
          email,
          img,
        })
        await context.dispatch('fetchAuthUser')
      } else {
        throw new Error('could not complete sigup')
      }
    },

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
      context.commit('setAllUsersInformation', null)
      context.commit('setSprints', [])
      context.commit('setUserId', null)
      // window.localStorage.clear()
      router.push('/ExternalHomeView')
    },
    async updateUserProfile(context, userInfo) {
      const userRef = doc(db, 'users', context.state.userId)
      try {
        await updateDoc(userRef, {
          displayName: userInfo.displayName,
          name: userInfo.name,
          surname: userInfo.surname,
          img: userInfo.img,
        })
        await context.dispatch('fetchUserById', context.state.userId)
        await context.dispatch('fetchUsersInformation')
      } catch (error) {}
    },
    async fetchUserById(context, uid) {
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        context.commit('setUser', docSnap.data())
        context.commit('setUserId', uid)
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
    getterSprintsTable(state) {
      return SprintsTransformer.sprintsStatsTable(state.sprints)
    },
    getterSprintsAverage(state) {
      return SprintsTransformer.sprintsStatsAverages(state.sprints)
    },
    getterUsersInfo(state) {
      return UsersTransformer.usersInformationById(state.allUsersInformations)
    },
  },
  modules: {},
})
