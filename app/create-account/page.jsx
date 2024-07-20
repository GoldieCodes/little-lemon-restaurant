import FormFramework from "@/components/FormFramework"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
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

export const handleCreateUser = async (
  name,
  email,
  password,
  router,
  setErrors,
  setSuccess
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      setSuccess("Account created")
      setTimeout(() => {
        router.push("/menu")
      }, 500)
      // ...
      const userRef = userCredential.user.uid
      await setDoc(doc(db, "users", userRef), { username: name, email: email })
    })
    .catch((error) => {
      setErrors(error.message)
    })
}
