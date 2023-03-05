import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { env } from '../env/env.mjs'

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDERID,
  appId: env.NEXT_PUBLIC_FIREBASE_APPID,
  measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
}

export const vapidKey = env.NEXT_PUBLIC_FIREBASE_VAPIDKEY

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
