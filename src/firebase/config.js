import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
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
// init firebase
initializeApp(firebaseConfig)

// init firebase auth
const auth = getAuth()
export { auth }
