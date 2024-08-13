import LoginOrCreateAccountTemplate from "@/components/LoginOrCreateAccountTemplate"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/app/firebase"
import { app, auth } from "@/app/firebase"
import { toast } from "react-toastify"

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
  setSubmitting
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      toast.success("Account created")
      router.push("/menu")
      setSubmitting(false)
      // these lines below, save the user's entered details to Firebase Firestore db
      const userRef = userCredential.user.uid
      await setDoc(doc(db, "users", userRef), { username: name, email: email })
    })
    .catch((error) => {
      toast.error(error.message)
      setSubmitting(false)
    })
}
