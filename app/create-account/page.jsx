import LoginOrCreateAccountTemplate from "@/components/LoginOrCreateAccountTemplate"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/app/firebase"
import { app, auth } from "@/app/firebase"

export default function CreateAccount() {
  return (
    <LoginOrCreateAccountTemplate
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
  setSuccess,
  setSubmitting
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      setSuccess("Account created")
      setTimeout(() => {
        router.push("/menu")
      }, 500)
      setSubmitting(false)
      // these lines below, save the user's entered details to Firebase Firestore db
      const userRef = userCredential.user.uid
      await setDoc(doc(db, "users", userRef), { username: name, email: email })
    })
    .catch((error) => {
      setErrors(error.message)
      setTimeout(() => setErrors(null), 8000)
      setSubmitting(false)
    })
}
