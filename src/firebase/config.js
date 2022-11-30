import { initializeApp } from 'firebase/app'
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA7SnAdcJnEIiNaT7CR7yUAoE0abAZ84Z0',
  authDomain: 'kc-project-f6b6f.firebaseapp.com',
  projectId: 'kc-project-f6b6f',
  storageBucket: 'kc-project-f6b6f.appspot.com',
  messagingSenderId: '178004775203',
  appId: '1:178004775203:web:81fd00c7f227153040bc96',
  measurementId: 'G-HH4KMZ62WH',
}
const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://karinacoste.github.io/kc-project/#/SignupView',
  // This must be true.
  handleCodeInApp: true,
}
// init firebase
initializeApp(firebaseConfig)

// init firebase auth
const auth = getAuth()
const db = getFirestore()

export { auth, db, actionCodeSettings }
// export { auth, db }
