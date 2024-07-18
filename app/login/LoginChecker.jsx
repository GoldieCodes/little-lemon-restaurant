"use client"
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect, createContext, useContext } from "react"

const UserManager = createContext({})

export default function UserLoginWatcher({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      console.log(user)
    })
  }, [])

  return (
    <UserManager.Provider value={currentUser}>{children}</UserManager.Provider>
  )
}
export const userManagerParams = () => useContext(UserManager)
