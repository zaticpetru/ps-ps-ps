import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
}

console.log("process.env.REACT_APP_apiKey")
console.log(process.env)


const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
const functions = getFunctions(app)
const auth = getAuth()

console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV !== 'production'){
  connectFirestoreEmulator(firestore, 'localhost', 8080)
  connectFunctionsEmulator(functions, 'localhost', 5001)
}

export { app, firestore, functions, auth }