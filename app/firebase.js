// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtjkgBD0IqAXWLERk6rAwPbsLRtu1eqXE",
  authDomain: "little-lemon-capstone-project.firebaseapp.com",
  projectId: "little-lemon-capstone-project",
  storageBucket: "little-lemon-capstone-project.appspot.com",
  messagingSenderId: "1063525124710",
  appId: "1:1063525124710:web:41577f94616f88ff957ba7",
}

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app)
export const db = getFirestore(app)
