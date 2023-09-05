// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB7FJevlRQs3kH-AxDY5Asi_BRp122bFUI',

  authDomain: 'movieseries-5d72f.firebaseapp.com',

  projectId: 'movieseries-5d72f',

  storageBucket: 'movieseries-5d72f.appspot.com',

  messagingSenderId: '186522637052',

  appId: '1:186522637052:web:4c7246445c686f92343d79',

  measurementId: 'G-MPZNMDP2MR',
}

// Initialize Firebase

export const FirebaseApp = initializeApp(firebaseConfig)

export const FirebaseAuth = getAuth(FirebaseApp)

export const FirebaseDB = getFirestore(FirebaseApp)
