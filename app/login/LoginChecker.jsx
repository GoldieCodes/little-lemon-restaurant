"use client"
import { db, auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect, createContext, useContext } from "react"
import { doc, getDoc } from "firebase/firestore"

const UserManager = createContext({})

export default function LoginChecker({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user.uid)

      if (user !== null) {
        const docSnap = await getDoc(doc(db, "users", user.uid))
        const userProfileData = docSnap.data()
        userProfileData.username
          ? setUsername(userProfileData.username)
          : setUsername("Friend")
      }
    })
  }, [])

  return (
    <UserManager.Provider value={{ currentUser, username }}>
      {children}
    </UserManager.Provider>
  )
}
export const loggedinUserParams = () => useContext(UserManager)
