"use client"
import FormFramework from "@/components/FormFramework"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import { db } from "@/app/firebase"
import { app, auth } from "@/app/firebase"

export default function CreateAccount() {
  return (
    <FormFramework
      heading="Join the Little Lemon Family"
      subheading="Create an account to enjoy personalized dining experiences, special
        offers, and easy reservations."
      buttonText="Create account"
      alternative=" Already have an account?"
      redirectText="Log in."
      redirectLink="/login"
    />
  )
}

export const router = () => useRouter()

export const handleCreateUser = async (
  name,
  email,
  password,
  router,
  setErrors,
  setSuccess
) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      firstName: name,
      email: email,
    })
    console.log("Document written with ID: ", docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e)
  }

  const createUser = () =>
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        setSuccess("Account created")
        setTimeout(() => {
          router.push("/menu")
        }, 500)
        // ...
      })
      .catch((error) => {
        setErrors(error.message)
      })
}
