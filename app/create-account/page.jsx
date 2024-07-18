import FormFramework from "@/components/FormFramework"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { app, auth, db } from "@/app/firebase"
import { collection, addDoc } from "firebase/firestore"

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

export async function handleCreateUser(
  name,
  email,
  password,
  router,
  setSuccess,
  setErrors
) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      firstName: name,
      email: email,
    })
    console.log("Document written with ID: ", docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e)
  }

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
